# 🍪 Sistema de Consentimento de Cookies - Documentação Completa

## 📋 Visão Geral

O Mol Class implementa um sistema completo de consentimento de cookies em conformidade com **LGPD** e **GDPR**, oferecendo controle granular sobre diferentes tipos de cookies e persistência robusta das preferências do usuário.

## 🎯 Como Funciona

### **Primeiro Acesso**

1. ✅ Banner de cookies aparece automaticamente
2. ✅ Usuário pode **Aceitar** ou **Recusar**
3. ✅ Se recusar: site funciona normalmente, **nenhum dado é enviado** para GA/Clarity
4. ✅ Se aceitar: dados são enviados para Google Analytics e Microsoft Clarity

### **Controle Granular**

```typescript
interface CookieConsentState {
  hasConsented: boolean | null; // null = não decidiu ainda
  analyticsEnabled: boolean; // controla GA e Clarity
}
```

## 🔧 Implementação Técnica

### **Arquivos Principais**

- `src/shared/hooks/useCookieConsent.ts` - Hook principal
- `src/shared/components/cookies/CookieConsentBanner.tsx` - Banner UI
- `src/shared/components/analytics/AnalyticsManager.tsx` - Controle de analytics
- `src/lib/gtag.ts` - Funções de tracking condicionais

### **AnalyticsManager**

```typescript
// Só carrega scripts se analyticsEnabled === true
if (!analyticsEnabled) {
  return null; // ❌ Não carrega GA nem Clarity
}

// ✅ Carrega Google Analytics e Microsoft Clarity
```

### **Controle de Consentimento**

```typescript
const canSend = () => enabled && hasGtag() && isConsentGranted();

export const event = (name: string, params: Gtag.EventParams = {}) => {
  if (!canSend()) return; // ❌ Não envia se não há consentimento
  // ✅ Envia dados
};
```

## 💾 Persistência de Dados

### **1. Cookie HTTP (Principal)**

- **Nome**: `molclass-cookie-consent`
- **Duração**: 365 dias
- **Localização**: Browser do usuário
- **Conteúdo**:

```json
{
  "hasConsented": true,
  "analyticsEnabled": true,
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

### **2. localStorage (Backup)**

- **Chave**: `molclass-cookie-consent`
- **Localização**: Browser do usuário
- **Conteúdo**: Mesmo formato do cookie

## 🔍 Como Verificar o Consentimento

### **No Browser (DevTools)**:

1. **F12** → **Application** → **Cookies** → `molclass-cookie-consent`
2. **F12** → **Application** → **Local Storage** → `molclass-cookie-consent`

### **Exemplo de Dados Salvos**:

```json
{
  "hasConsented": true, // ✅ Usuário deu consentimento
  "analyticsEnabled": true, // ✅ Permite GA e Clarity
  "timestamp": "2024-01-15T10:30:00.000Z" // 📅 Data/hora exata
}
```

## ⚖️ Valor Legal do Respaldo

### **✅ Conformidade LGPD/GDPR**:

- **Timestamp preciso**: Data e hora exata do consentimento
- **Persistência**: Salvo por 365 dias
- **Dupla segurança**: Cookie + localStorage
- **Rastreabilidade**: Identifica exatamente quando consentiu

### **📊 Dados para Auditoria**:

- **Data/Hora**: `timestamp` em ISO 8601
- **Escolha**: `hasConsented` (true/false)
- **Granularidade**: `analyticsEnabled` (controle específico)
- **Identificação**: Cookie único por usuário

## 🛡️ Proteção Legal

### **Se o usuário aceitar**:

```json
{
  "hasConsented": true,
  "analyticsEnabled": true,
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

→ **Você tem respaldo** para coletar dados via GA/Clarity

### **Se o usuário recusar**:

```json
{
  "hasConsented": true,
  "analyticsEnabled": false,
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

→ **Você tem respaldo** de que respeitou a escolha (não coleta dados)

## 🌍 Traduções

### **Banner traduzido em 9 idiomas**:

- 🇧🇷 Português (pt)
- 🇺🇸 Inglês (en)
- 🇫🇷 Francês (fr)
- 🇩🇪 Alemão (de)
- 🇪🇸 Espanhol (es)
- 🇸🇦 Árabe (ar)
- 🇮🇳 Hindi (hi)
- 🇷🇺 Russo (ru)
- 🇨🇳 Chinês (zh)

### **Páginas Legais Completas**:

- `/privacy-policy` - Política de Privacidade
- `/terms-of-use` - Termos de Uso
- Ambas totalmente traduzidas e responsivas

## 🔧 Configuração

### **Variáveis de Ambiente Necessárias**:

```env
# .env.local
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
NEXT_PUBLIC_CLARITY_ID=XXXXXXXXXX
```

### **Como Usar o Hook**:

```tsx
import { useCookieConsent } from "@/shared/hooks/useCookieConsent";

function MyComponent() {
  const { consentState, showBanner, acceptAll, declineAll } =
    useCookieConsent();

  // Verificar se analytics está habilitado
  if (consentState.analyticsEnabled) {
    // Inicializar Google Analytics
  }

  return (
    <div>
      {showBanner && <CookieConsentBanner />}
      <p>Analytics: {consentState.analyticsEnabled ? "Ativo" : "Inativo"}</p>
    </div>
  );
}
```

## 📝 Para Fins Legais

1. **Auditoria**: Timestamp prova quando consentiu
2. **Conformidade**: Dados estruturados e persistentes
3. **Transparência**: Usuário pode verificar suas escolhas
4. **Respeito**: Sistema não coleta se `analyticsEnabled: false`

## 🏆 Conclusão

O sistema está **100% implementado** e funciona exatamente como esperado:

- ✅ Banner no primeiro acesso
- ✅ Controle total sobre GA e Clarity
- ✅ Conformidade com LGPD/GDPR
- ✅ Persistência robusta das preferências
- ✅ Site funciona independente da escolha
- ✅ Respaldo legal completo

**Está pronto para produção!** 🎉
