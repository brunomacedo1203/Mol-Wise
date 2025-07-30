"use client";
import useGoogleAnalytics from "@/shared/hooks/useGoogleAnalytics";

export default function GoogleAnalytics() {
  useGoogleAnalytics();
  return null;
}

// Exemplo de como usar o Google Analytics em outros componentes:
/*
import { event, pageview, conversion, exception } from "@/lib/gtag";

// Enviar evento personalizado
event({
  action: "button_click",
  category: "engagement",
  label: "calculate_button",
  value: 1
});

// Enviar evento de conversão
conversion("AW-CONVERSION_ID", "CONVERSION_LABEL");

// Enviar evento de exceção
exception("Erro no cálculo", false);
*/
