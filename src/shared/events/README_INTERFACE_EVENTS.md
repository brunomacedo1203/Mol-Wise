# 🎨 Eventos de Interface - Guia de Implementação

## 📋 Eventos Disponíveis

Os seguintes eventos de interface foram implementados para rastrear interações do usuário com elementos da UI:

### 1. **trackThemeChange** - Mudanças de Tema
```typescript
trackThemeChange({
  from_theme: "light" | "dark" | "system",
  to_theme: "light" | "dark" | "system",
  trigger_method?: "manual" | "system" | "auto",
  section?: string
});
```

### 2. **trackLanguageChange** - Mudanças de Idioma
```typescript
trackLanguageChange({
  from_language: string, // ex: "pt-BR", "en-US"
  to_language: string,
  trigger_method?: "manual" | "auto" | "browser_detection",
  section?: string
});
```

### 3. **trackMenuInteraction** - Interações com Menu
```typescript
trackMenuInteraction({
  menu_item: string, // ex: "calculators", "periodic-table"
  action_type: "click" | "hover" | "open" | "close" | "toggle",
  menu_section?: "main_menu" | "sidebar" | "dropdown" | "context_menu" | "mobile_menu",
  section?: string
});
```

### 4. **trackInterfaceToggle** - Toggle de Elementos da Interface
```typescript
trackInterfaceToggle({
  toggle_type: "sidebar" | "panel" | "modal" | "dropdown" | "accordion",
  toggle_state: "open" | "close" | "expand" | "collapse",
  element_name: string,
  section?: string
});
```

### 5. **trackSettingsChange** - Mudanças de Configurações
```typescript
trackSettingsChange({
  setting_name: string,
  setting_value: string | number | boolean,
  setting_category?: "display" | "accessibility" | "performance" | "privacy",
  section?: string
});
```

## 🚀 Como Usar

### **Opção 1: Importação Direta**
```typescript
import { trackThemeChange } from "@/shared/events/interfaceEvents";

const handleThemeToggle = (newTheme: "light" | "dark") => {
  const currentTheme = getCurrentTheme(); // sua lógica atual
  
  // Aplicar mudança de tema
  setTheme(newTheme);
  
  // Rastrear evento
  trackThemeChange({
    from_theme: currentTheme,
    to_theme: newTheme,
    trigger_method: "manual"
  });
};
```

### **Opção 2: Hook Centralizado**
```typescript
import { useEventTrackers } from "@/shared/hooks/useEventTrackers";

const MyComponent = () => {
  const { trackLanguageChange, trackMenuInteraction } = useEventTrackers();
  
  const handleLanguageChange = (newLang: string) => {
    const currentLang = getCurrentLanguage();
    
    // Aplicar mudança
    changeLanguage(newLang);
    
    // Rastrear evento
    trackLanguageChange({
      from_language: currentLang,
      to_language: newLang
    });
  };
  
  const handleMenuClick = (menuItem: string) => {
    trackMenuInteraction({
      menu_item: menuItem,
      action_type: "click",
      menu_section: "main_menu"
    });
  };
};
```

## 📊 Exemplos Práticos

### **Exemplo 1: Componente de Tema**
```typescript
// src/shared/components/theme/ThemeToggle.tsx
import { trackThemeChange } from "@/shared/events/interfaceEvents";

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();
  
  const handleToggle = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    
    setTheme(newTheme);
    
    trackThemeChange({
      from_theme: theme,
      to_theme: newTheme,
      trigger_method: "manual"
    });
  };
  
  return <button onClick={handleToggle}>Toggle Theme</button>;
};
```

### **Exemplo 2: Seletor de Idioma**
```typescript
// src/shared/components/language/LanguageSelector.tsx
import { trackLanguageChange } from "@/shared/events/interfaceEvents";

const LanguageSelector = () => {
  const { locale, setLocale } = useLocale();
  
  const handleLanguageChange = (newLocale: string) => {
    setLocale(newLocale);
    
    trackLanguageChange({
      from_language: locale,
      to_language: newLocale,
      trigger_method: "manual"
    });
  };
  
  return (
    <select onChange={(e) => handleLanguageChange(e.target.value)}>
      <option value="pt-BR">Português</option>
      <option value="en-US">English</option>
    </select>
  );
};
```

### **Exemplo 3: Menu de Navegação**
```typescript
// src/shared/components/menu/NavigationMenu.tsx
import { trackMenuInteraction } from "@/shared/events/interfaceEvents";

const NavigationMenu = () => {
  const handleMenuClick = (menuItem: string) => {
    trackMenuInteraction({
      menu_item: menuItem,
      action_type: "click",
      menu_section: "main_menu"
    });
  };
  
  return (
    <nav>
      <Link href="/calculators" onClick={() => handleMenuClick("calculators")}>
        Calculadoras
      </Link>
      <Link href="/periodic-table" onClick={() => handleMenuClick("periodic-table")}>
        Tabela Periódica
      </Link>
    </nav>
  );
};
```

## 🔍 Verificação

### **Console do Navegador**
Você verá logs como:
```
[INTERFACE_EVENTS] Disparando trackThemeChange: {
  from_theme: "light",
  to_theme: "dark",
  trigger_method: "manual",
  section: "interface"
}
```

### **Google Analytics**
Os eventos aparecerão no GA4 como:
- **theme_changed**
- **language_changed** 
- **menu_interaction**
- **interface_toggle**
- **settings_changed**

## ✅ Benefícios

- 📊 **Análise de UX**: Entenda como usuários interagem com a interface
- 🎨 **Preferências de Tema**: Veja qual tema é mais popular
- 🌍 **Uso de Idiomas**: Analise distribuição geográfica dos usuários
- 🧭 **Navegação**: Identifique seções mais acessadas
- ⚙️ **Configurações**: Monitore mudanças de settings

Todos os eventos seguem o padrão estabelecido no projeto e aparecem automaticamente no Google Analytics!