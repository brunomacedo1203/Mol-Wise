import { NextResponse } from "next/server";

type TranslateResponse = {
  translatedText: string;
  [key: string]: unknown;
};

export async function POST(req: Request) {
  try {
    const { q, source = "auto", target = "en" } = await req.json();

    if (!q || typeof q !== "string") {
      return NextResponse.json({ error: "Missing text to translate" }, { status: 400 });
    }

    // Mirrors livres e estáveis
    const endpoints = [
      "https://translate.astian.org/translate",
      "https://libretranslate.de/translate",
    ];

    let result: TranslateResponse | null = null;

    for (const endpoint of endpoints) {
      try {
        const res = await fetch(endpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ q, source, target, format: "text" }),
        });

        if (res.ok) {
          result = (await res.json()) as TranslateResponse;
          break;
        } else {
          console.warn(`[Proxy] Falha ${res.status} em ${endpoint}`);
        }
      } catch (err) {
        console.warn(`[Proxy] Erro ao tentar ${endpoint}:`, err);
      }
    }

    // Se nenhuma tradução deu certo → devolve o texto original
    if (!result) {
      return NextResponse.json({ translatedText: q, note: "fallback" });
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error("[API Translate] Erro interno:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
