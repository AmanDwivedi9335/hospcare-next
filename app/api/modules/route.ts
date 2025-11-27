import { NextResponse } from "next/server";
import { ZodError } from "zod";
import { prisma } from "@/lib/prisma";
import { createModuleSchema } from "@/lib/validators/module";

export async function GET() {
  const modules = await prisma.module.findMany({
    orderBy: [{ isCore: "desc" }, { name: "asc" }],
  });

  return NextResponse.json({ data: modules });
}

// Narrow type for the P2002 unique constraint error
type PrismaP2002Error = {
  code: string;
  meta?: {
    target?: string | string[];
    [key: string]: unknown;
  };
};

// Type guard to detect Prisma unique constraint error (P2002)
function isPrismaP2002Error(error: unknown): error is PrismaP2002Error {
  return (
    typeof error === "object" &&
    error !== null &&
    "code" in error &&
    (error as { code?: string }).code === "P2002"
  );
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
  } catch (error: unknown) {
    if (error instanceof ZodError) {
      return NextResponse.json({ error: error.flatten() }, { status: 422 });
    }

    // Handle unique constraint violation (P2002) without using Prisma.PrismaClientKnownRequestError
    if (isPrismaP2002Error(error)) {
      return NextResponse.json(
        { error: "Module with the provided code already exists" },
        { status: 409 }
      );
    }

    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json(
      { error: "Unable to create module" },
      { status: 500 }
    );
  }
}
