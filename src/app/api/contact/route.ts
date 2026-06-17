import { NextResponse } from "next/server";

interface ContactBody {
  name: string;
  phone: string;
  email: string;
  message: string;
}

export async function POST(req: Request) {
  try {
    const body: ContactBody = await req.json();
    const { name, phone, email, message } = body;

    // validation بسيط
    if (!name || name.length < 2) {
      return NextResponse.json({ error: "الاسم قصير جدًا" }, { status: 400 });
    }
    if (!phone || phone.length < 6) {
      return NextResponse.json({ error: "رقم الهاتف غير صحيح" }, { status: 400 });
    }
    if (email && !email.includes("@")) {
      return NextResponse.json({ error: "البريد الإلكتروني غير صحيح" }, { status: 400 });
    }

    // هنا هنضيف الإيميل أو تخزين في الداتابيز بعدين
    console.log("New contact:", { name, phone, email, message });

    return NextResponse.json({ success: true, message: "تم استلام طلبك بنجاح" });
  } catch {
    return NextResponse.json({ error: "خطأ في السيرفر" }, { status: 500 });
  }
}
