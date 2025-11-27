import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";
import { prisma } from "@/lib/prisma";
import { updateTenantSchema } from "@/lib/validators/tenant";

// Narrow shape for Prisma errors we care about
type PrismaError = {
  code?: string;
};

// Generic helper to check Prisma error codes (P2002, P2025, etc.)
function isPrismaErrorWithCode(error: unknown, code: string): error is PrismaError {
  return (
    typeof error === "object" &&
    error !== null &&
    "code" in error &&
    (error as { code?: string }).code === code
  );
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ tenantId: string }> },
) {
  const { tenantId } = await params;

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
  } catch (error: unknown) {
    if (error instanceof ZodError) {
      return NextResponse.json({ error: error.flatten() }, { status: 422 });
    }

    // Tenant not found (P2025)
    if (isPrismaErrorWithCode(error, "P2025")) {
      return NextResponse.json({ error: "Tenant not found" }, { status: 404 });
    }

    // Unique constraint violation (e.g. slug) (P2002)
    if (isPrismaErrorWithCode(error, "P2002")) {
      return NextResponse.json({ error: "Tenant slug already exists" }, { status: 409 });
    }

    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ error: "Unable to update tenant" }, { status: 500 });
  }
}
