import { NextRequest, NextResponse } from "next/server";
import { quoteRequestSchema } from "@/lib/validations";

const rateLimit = new Map<string, { count: number; reset: number }>();

function checkRateLimit(ip: string, limit = 5, windowMs = 60000): boolean {
  const now = Date.now();
  const entry = rateLimit.get(ip);
  if (!entry || now > entry.reset) {
    rateLimit.set(ip, { count: 1, reset: now + windowMs });
    return true;
  }
  if (entry.count >= limit) return false;
  entry.count++;
  return true;
}

export async function POST(request: NextRequest) {
  const ip = request.headers.get("x-forwarded-for") ?? "unknown";
  if (!checkRateLimit(ip)) {
    return NextResponse.json({ error: "Trop de requêtes" }, { status: 429 });
  }

  try {
    const body = await request.json();
    const data = quoteRequestSchema.parse(body);

    if (data.honeypot) {
      return NextResponse.json({ success: true });
    }

    // TODO: persist to PostgreSQL via Prisma when DATABASE_URL is configured
    console.info("[DEVIS]", {
      name: `${data.firstName} ${data.lastName}`,
      email: data.email,
      service: data.service,
    });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Données invalides" }, { status: 400 });
  }
}
