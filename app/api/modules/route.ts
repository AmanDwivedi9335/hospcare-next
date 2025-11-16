import { NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import { ZodError } from "zod";
import { prisma } from "@/lib/prisma";
import { createModuleSchema } from "@/lib/validators/module";

export async function GET() {
  const modules = await prisma.module.findMany({
    orderBy: [{ isCore: "desc" }, { name: "asc" }],
  });

  return NextResponse.json({ data: modules });
}

export async function POST(request: Request) {
  try {
    const payload = createModuleSchema.parse(await request.json());

    const createdModule = await prisma.module.create({
      data: {
        name: payload.name,
        code: payload.code,
        description: payload.description,
        category: payload.category,
        baseMonthlyPrice: payload.baseMonthlyPrice,
        isCore: payload.isCore,
      },
    });

    return NextResponse.json({ data: createdModule }, { status: 201 });
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json({ error: error.flatten() }, { status: 422 });
    }

    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002") {
      return NextResponse.json(
        { error: "Module with the provided code already exists" },
        { status: 409 },
      );
    }

    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ error: "Unable to create module" }, { status: 500 });
  }
}
