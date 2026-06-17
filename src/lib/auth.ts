import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const JWT_SECRET = process.env.JWT_SECRET || "teknova-dev-secret-change-in-production";

export interface JwtPayload {
  userId: string;
  email: string;
  role: string;
}

// تشفير الباسورد
export async function hashPassword(password: string) {
  return bcrypt.hash(password, 12);
}

// مقارنة الباسورد
export async function comparePassword(password: string, hash: string) {
  return bcrypt.compare(password, hash);
}

// إنشاء توكن
export function signToken(payload: JwtPayload) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "7d" });
}

// التحقق من التوكن
export function verifyToken(token: string): JwtPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET) as JwtPayload;
  } catch {
    return null;
  }
}

// ميدل وير لحماية الـ API routes
export function getAuthUser(req: NextRequest): JwtPayload | null {
  const auth = req.headers.get("authorization");
  if (!auth?.startsWith("Bearer ")) return null;
  return verifyToken(auth.slice(7));
}

// رد خطأ موحد
export function unauthorized() {
  return NextResponse.json({ error: "غير مصرح" }, { status: 401 });
}
