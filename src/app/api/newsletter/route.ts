import { NextRequest, NextResponse } from "next/server";
import { newsletterSchema } from "@/lib/validations";
import { nanoid } from "nanoid";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email } = newsletterSchema.parse(body);

    const confirmToken = nanoid(32);

    console.info("[NEWSLETTER]", { email, confirmToken });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Email invalide" }, { status: 400 });
  }
}
