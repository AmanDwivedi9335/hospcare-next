import { Prisma } from "@prisma/client";
import { NextResponse } from "next/server";
import { ZodError } from "zod";
import { prisma } from "@/lib/prisma";
import { updateTenantSchema } from "@/lib/validators/tenant";

type Params = {
  params: {
    tenantId: string;
  };
};

export async function PATCH(request: Request, { params }: Params) {
  const { tenantId } = params;

  if (!tenantId) {
    return NextResponse.json({ error: "Tenant id is required" }, { status: 400 });
  }

  try {
    const payload = updateTenantSchema.parse(await request.json());

    const updatedTenant = await prisma.tenant.update({
      where: { id: tenantId },
      data: {
        ...payload,
        address: payload.address ?? undefined,
      },
      include: {
        subscription: { include: { plan: true } },
        modules: { include: { module: true } },
      },
    });

    return NextResponse.json({ data: updatedTenant });
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json({ error: error.flatten() }, { status: 422 });
    }

    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2025") {
      return NextResponse.json({ error: "Tenant not found" }, { status: 404 });
    }

    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002") {
      return NextResponse.json({ error: "Tenant slug already exists" }, { status: 409 });
    }

    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ error: "Unable to update tenant" }, { status: 500 });
  }
}
