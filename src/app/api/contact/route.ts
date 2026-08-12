import { NextRequest, NextResponse } from "next/server";
import { contactSchema } from "@/lib/validations";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const data = contactSchema.parse(body);

    if (data.honeypot) {
      return NextResponse.json({ success: true });
    }

    console.info("[CONTACT]", { name: data.name, email: data.email });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Données invalides" }, { status: 400 });
  }
}
