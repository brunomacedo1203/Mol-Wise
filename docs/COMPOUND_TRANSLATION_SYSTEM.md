# Sistema de Tradução de Nomes de Compostos Químicos

## Visão Geral

O MolWise utiliza um sistema de tradução dinâmica para converter nomes de compostos químicos do inglês (idioma original dos dados) para múltiplos idiomas suportados. Este documento explica como o sistema funciona e como adicionar novas traduções.

## Arquitetura do Sistema

### 1. Fonte de Dados Original
- **Arquivo**: `public/data/inorganic-compounds.json`
- **Formato**: Dados estruturados com nomes em inglês
- **Exemplo**:
```json
{
  "Name": "Sodium Chloride",
  "Formula": "NaCl",
  "CAS Reg No.": "471-34-1"
}
```

### 2. Arquivos de Tradução
- **Localização**: `src/i18n/messages/[locale]/pages/catalog.json`
- **Função**: Dicionário de traduções usando fórmulas químicas como chaves
- **Idiomas suportados**: pt, es, fr, de, ru, zh, hi, ar, bn, id, en

### 3. Sistema de Internacionalização
- **Biblioteca**: next-intl
- **Configuração**: 
  - `src/i18n/routing.ts` - Configuração de rotas
  - `src/i18n/request.ts` - Carregamento de mensagens
  - `middleware.ts` - Roteamento automático por idioma

## Fluxo de Tradução

### Processo Completo

1. **Carregamento dos Dados**
   ```typescript
   // Dados originais em inglês do JSON
   const compound = {
     "Name": "Sodium Chloride",
     "Formula": "NaCl"
   }
   ```

2. **Tradução Dinâmica**
   ```typescript
   // Função getTranslatedValue em useCatalogData.ts
   const translated = compound.formula
     ? t(`catalog.compoundNames.${compound.formula}`, { fallback: '' })
     : '';
   return translated || compound.name || '';
   
   // Para sinônimos, usa commonName como chave
   const synonym = compound.commonName
     ? t(`catalog.CommonName.${compound.commonName}`, { fallback: '' })
     : '';
   return synonym || compound.synonym || '';
   ```

3. **Busca por Fórmula**
   - Usa a fórmula química como chave: `catalog.compoundNames.NaCl`
   - Busca nos arquivos de tradução do idioma atual

4. **Resultado Final**
   - **Português**: "Cloreto de Sódio"
   - **Espanhol**: "Cloruro de Sodio"
   - **Francês**: "Chlorure de Sodium"
   - **Fallback**: "Sodium Chloride" (original em inglês)

### Exemplo Prático

Para o composto com fórmula `CaCO3`:

**Dados originais (inorganic-compounds.json)**:
```json
{
  "Name": "Calcium Carbonate",
  "Formula": "CaCO3"
}
```

**Arquivo de tradução PT (pt/pages/catalog.json)**:
```json
{
  "catalog": {
    "compoundNames": {
      "CaCO3": "Carbonato de Cálcio"
    }
  }
}
```

**Resultado renderizado**: "Carbonato de Cálcio"

## Estrutura dos Arquivos de Tradução

### Formato Padrão
```json
{
  "catalog": {
    "compoundNames": {
      "H2O": "Água",
      "NaCl": "Cloreto de Sódio",
      "CaCO3": "Carbonato de Cálcio",
      "H2SO4": "Ácido Sulfúrico"
    },
    "CommonName": {
      "Water": "Água destilada",
      "Salt": "Sal de cozinha"
    },
    "tableHeaderDescriptions": {
      "meltingPoint": "Temperatura na qual a substância muda do estado sólido para líquido",
      "boilingPoint": "Temperatura na qual a substância muda do estado líquido para gasoso",
      "density": "Massa por unidade de volume da substância"
    }
  }
}
```

### Campos Traduzíveis
- **compoundNames**: Nomes principais dos compostos
- **CommonName**: Sinônimos e nomes alternativos (baseado no campo commonName dos dados)
- **tableHeaderDescriptions**: Descrições para tooltips dos cabeçalhos da tabela

## Como Adicionar Novas Traduções

### 1. Identificar a Fórmula
Encontre a fórmula química exata no arquivo `inorganic-compounds.json`:
```json
{
  "Name": "Hydrogen Peroxide",
  "Formula": "H2O2"
}
```

### 2. Adicionar Tradução
Para cada idioma desejado, edite o arquivo correspondente:

**Português** (`pt/pages/catalog.json`):
```json
{
  "catalog": {
    "compoundNames": {
      "H2O2": "Peróxido de Hidrogênio"
    }
  }
}
```

**Espanhol** (`es/pages/catalog.json`):
```json
{
  "catalog": {
    "compoundNames": {
      "H2O2": "Peróxido de Hidrógeno"
    }
  }
}
```

### 3. Verificar Resultado
A tradução será aplicada automaticamente quando o usuário selecionar o idioma correspondente.

## Tradução de Tooltips dos Cabeçalhos da Tabela

### Funcionalidade
O sistema também suporta tradução de tooltips que aparecem nos cabeçalhos da tabela do catálogo, fornecendo descrições detalhadas das propriedades químicas.

### Configuração
As traduções dos tooltips são armazenadas na seção `tableHeaderDescriptions`:

```json
{
  "catalog": {
    "tableHeaderDescriptions": {
      "meltingPoint": "Temperatura na qual a substância muda do estado sólido para líquido",
      "boilingPoint": "Temperatura na qual a substância muda do estado líquido para gasoso", 
      "density": "Massa por unidade de volume da substância"
    }
  }
}
```

### Uso no Código
```typescript
// Em CompoundTableHeader.tsx
const description = t(`catalog.tableHeaderDescriptions.${columnKey}`, { fallback: '' });
```

## Tratamento de Erros e Fallbacks

### Hierarquia de Fallback
1. **Tradução específica**: `catalog.compoundNames.{formula}` ou `catalog.CommonName.{commonName}`
2. **Nome original**: Valor do campo "Name" ou "commonName" em inglês
3. **String vazia**: Se nenhum dos anteriores estiver disponível

### Exemplo de Fallback
```typescript
// Para nomes de compostos usando fórmula
const translated = t('catalog.compoundNames.MgSO4', { fallback: '' }); // ""
return translated || "Magnesium Sulfate" || ''; // Retorna o nome original

// Para sinônimos usando commonName
const synonym = t('catalog.CommonName.Epsom Salt', { fallback: '' }); // ""
return synonym || compound.synonym || ''; // Retorna o sinônimo original
```

## Manutenção e Boas Práticas

### 1. Consistência de Nomenclatura
- Use nomenclatura IUPAC quando possível
- Mantenha consistência entre idiomas similares
- Verifique traduções com especialistas em química

### 2. Validação de Fórmulas
- As chaves devem corresponder exatamente às fórmulas no JSON
- Considere variações de escrita (maiúsculas/minúsculas)
- Teste com dados reais

### 3. Cobertura de Idiomas
- Priorize idiomas com maior base de usuários
- Mantenha paridade entre idiomas quando possível
- Documente idiomas com traduções incompletas

## Arquivos Relacionados

- `src/features/catalog/hooks/common/useCatalogData.ts` - Lógica de tradução principal
- `src/features/catalog/hooks/common/useCompoundTable.ts` - Lógica de tradução para tabela
- `src/features/catalog/utils/compoundFormatters.ts` - Funções de formatação e tradução
- `src/features/catalog/utils/getCellValue.ts` - Obtenção de valores traduzidos para células
- `src/features/catalog/components/CompoundTableHeader.tsx` - Tooltips dos cabeçalhos
- `src/i18n/messages/[locale]/pages/catalog.json` - Arquivos de tradução
- `public/data/inorganic-compounds.json` - Dados originais
- `src/i18n/request.ts` - Configuração do next-intl
- `middleware.ts` - Roteamento de idiomas

## Troubleshooting

### Tradução não aparece
1. Verifique se a fórmula está correta no arquivo de tradução
2. Confirme se o arquivo JSON está bem formatado
3. Verifique se o idioma está configurado corretamente

### Caracteres especiais
- Use escape adequado para caracteres especiais em JSON
- Teste com caracteres Unicode (chinês, árabe, etc.)
- Valide encoding UTF-8

### Performance
- O sistema carrega traduções sob demanda
- Traduções são cacheadas pelo next-intl
- Considere lazy loading para grandes volumes de dados