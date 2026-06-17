import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAuthUser } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    const { name, phone, email, message } = await req.json();

    if (!name || name.length < 2) {
      return NextResponse.json({ error: "الاسم قصير جدًا" }, { status: 400 });
    }
    if (!phone || phone.length < 6) {
      return NextResponse.json({ error: "رقم الهاتف غير صحيح" }, { status: 400 });
    }

    // لو المستخدم مسجل، بنربط الرسالة بحسابه
    const payload = getAuthUser(req);

    await prisma.message.create({
      data: {
        name,
        phone,
        email: email || "",
        message: message || "",
        userId: payload?.userId || null,
      },
    });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "خطأ في السيرفر" }, { status: 500 });
  }
}
