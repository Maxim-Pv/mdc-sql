import { NextResponse } from "next/server";

export async function GET() {
  try {
    const token = process.env.API_TOKEN;

    if (!token) {
      return NextResponse.json({ error: "Нет токена" }, { status: 500 });
    }

    const res = await fetch(
      "https://clients.anykey.pro/mdcards/forms/resource/list",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token }),
      }
    );

    if (!res.ok) {
      return NextResponse.json(
        { error: "Ошибка при получении офисов" },
        { status: 500 }
      );
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (e) {
    return NextResponse.json({ error: "Серверная ошибка" }, { status: 500 });
  }
}
