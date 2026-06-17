import { NextRequest, NextResponse } from "next/server";
import { getAuthUser, unauthorized } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  const payload = getAuthUser(req);
  if (!payload) return unauthorized();

  const projects = await prisma.project.findMany({
    where: payload.role === "admin" ? {} : { userId: payload.userId },
    include: { caseStudy: true },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json({ projects });
}
