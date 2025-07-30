# Google Analytics - Guia de Uso

## Configuração

O Google Analytics já está configurado no projeto com o ID de rastreamento `G-P4NHF7L5NV`.

## Funções Disponíveis

### 1. Pageview

```typescript
import { pageview } from "@/lib/gtag";

// Enviar pageview
pageview("/catalog");
```

### 2. Eventos Personalizados

```typescript
import { event } from "@/lib/gtag";

// Enviar evento
event({
  action: "button_click",
  category: "engagement",
  label: "calculate_button",
  value: 1,
});
```

### 3. Conversões

```typescript
import { conversion } from "@/lib/gtag";

// Enviar conversão
conversion("AW-CONVERSION_ID", "CONVERSION_LABEL");
```

### 4. Exceções

```typescript
import { exception } from "@/lib/gtag";

// Enviar exceção
exception("Erro no cálculo", false);
```

## Exemplos de Uso

### Em Componentes React

```typescript
import { event } from "@/lib/gtag";

function CalculateButton() {
  const handleClick = () => {
    // Lógica do botão
    event({
      action: "calculate",
      category: "calculator",
      label: "molar_mass",
      value: 1,
    });
  };

  return <button onClick={handleClick}>Calcular</button>;
}
```

### Tracking de Erros

```typescript
import { exception } from "@/lib/gtag";

try {
  // Código que pode gerar erro
} catch (error) {
  exception(error.message, false);
}
```

## Configurações de Privacidade

O Google Analytics está configurado com:

- `anonymize_ip: true` - Anonimiza IPs
- `cookie_flags: 'SameSite=None;Secure'` - Configuração segura de cookies

## Estrutura de Arquivos

- `src/lib/gtag.ts` - Funções principais do Google Analytics
- `src/types/gtag.d.ts` - Tipos TypeScript
- `src/shared/components/GoogleAnalytics.tsx` - Componente de inicialização
- `src/shared/hooks/useGoogleAnalytics.ts` - Hook para tracking de páginas
