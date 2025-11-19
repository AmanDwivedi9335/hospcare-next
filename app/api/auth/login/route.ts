import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";
import { ZodError } from "zod";
import { prisma } from "@/lib/prisma";
import { tenantLoginSchema } from "@/lib/validators/tenant";

const jwtSecret = process.env.JWT_SECRET ?? "dev-secret";

export async function POST(request: Request) {
  try {
    const { email, password } = tenantLoginSchema.parse(await request.json());

    const user = await prisma.user.findUnique({
      where: { email },
      include: { tenant: true },
    });

    if (!user || !user.isActive) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    const isValidPassword = await bcrypt.compare(password, user.passwordHash);

    if (!isValidPassword) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    const token = jwt.sign(
      {
        sub: user.id,
        role: user.role,
        tenantId: user.tenantId,
      },
      jwtSecret,
      { expiresIn: "1h" },
    );

    return NextResponse.json({
      data: {
        token,
        user: {
          id: user.id,
          email: user.email,
          role: user.role,
          tenantId: user.tenantId,
          tenantName: user.tenant?.name ?? null,
        },
      },
    });
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json({ error: error.flatten() }, { status: 422 });
    }

    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ error: "Unable to login" }, { status: 500 });
  }
}
