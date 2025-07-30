# Filtros Avançados - Catálogo de Compostos

## Visão Geral

Os filtros avançados permitem uma busca mais refinada e específica no catálogo de compostos químicos, oferecendo controle granular sobre as propriedades físicas e químicas dos compostos.

## Funcionalidades Implementadas (Fase 1)

### 🎯 **Faixas de Valores Numéricos**

#### **Ponto de Fusão (°C)**

- **Descrição**: Temperatura na qual o composto passa do estado sólido para líquido
- **Uso**: Filtrar compostos com pontos de fusão em faixas específicas
- **Exemplo**: Compostos que fundem entre 0°C e 100°C

#### **Ponto de Ebulição (°C)**

- **Descrição**: Temperatura na qual o composto passa do estado líquido para gasoso
- **Uso**: Filtrar compostos com pontos de ebulição em faixas específicas
- **Exemplo**: Compostos que fervem entre 50°C e 200°C

#### **Densidade (g/cm³)**

- **Descrição**: Massa por unidade de volume do composto
- **Uso**: Filtrar compostos por densidade
- **Exemplo**: Compostos com densidade entre 1.0 e 2.0 g/cm³

#### **Massa Molar (g/mol)**

- **Descrição**: Massa molecular do composto
- **Uso**: Filtrar compostos por tamanho molecular
- **Exemplo**: Compostos com massa molar entre 50 e 200 g/mol

### 🏷️ **Seleções Múltiplas**

#### **Formas Físicas**

- **Sólido**: Compostos no estado sólido à temperatura ambiente
- **Líquido**: Compostos no estado líquido à temperatura ambiente
- **Gasoso**: Compostos no estado gasoso à temperatura ambiente
- **Aquoso**: Compostos em solução aquosa

#### **Tipos de Solubilidade**

- **Solúvel em água**: Compostos que se dissolvem bem em água
- **Insolúvel em água**: Compostos que não se dissolvem em água
- **Pouco solúvel**: Compostos com solubilidade limitada
- **Miscível**: Compostos que se misturam completamente

## Interface do Usuário

### **Painel Expansível**

- **Localização**: Acima da tabela principal
- **Estado**: Pode ser expandido/recolhido
- **Indicador**: Badge mostrando número de filtros ativos

### **Controles Visuais**

- **Inputs de faixa**: Campos numéricos para valores mínimo e máximo
- **Checkboxes**: Seleção múltipla para categorias
- **Botões**: Aplicar, Limpar, Expandir/Recolher

### **Feedback Visual**

- **Badge ativo**: Mostra quantos filtros estão aplicados
- **Valores em tempo real**: Atualização instantânea dos resultados
- **Estado persistente**: Filtros são salvos automaticamente

## Implementação Técnica

### **Tipos TypeScript**

```typescript
interface ValueRange {
  min: number | null;
  max: number | null;
}

interface BasicAdvancedFilters {
  meltingPoint: ValueRange;
  boilingPoint: ValueRange;
  density: ValueRange;
  molarMass: ValueRange;
  physicalForms: string[];
  solubilityTypes: string[];
}

interface AdvancedFilterState {
  isOpen: boolean;
  filters: BasicAdvancedFilters;
  isActive: boolean;
}
```

### **Zustand Store**

```typescript
// catalogStore.ts
interface CatalogState {
  // ... outros estados
  advancedFilters: AdvancedFilterState;

  // Actions
  setAdvancedFiltersOpen: (isOpen: boolean) => void;
  setAdvancedFilters: (filters: BasicAdvancedFilters) => void;
  resetAdvancedFilters: () => void;
}
```

### **Lógica de Filtragem**

```typescript
// useCatalogData.ts
const applyAdvancedFilters = useCallback(
  (compounds: ExtendedCompound[], filters: BasicAdvancedFilters) => {
    return compounds.filter((compound) => {
      // Filtros de faixa de valores
      if (
        filters.meltingPoint.min !== null &&
        compound.meltingPoint < filters.meltingPoint.min
      )
        return false;
      if (
        filters.meltingPoint.max !== null &&
        compound.meltingPoint > filters.meltingPoint.max
      )
        return false;

      // Filtros de seleção múltipla
      if (
        filters.physicalForms.length > 0 &&
        !filters.physicalForms.includes(compound.physicalForm)
      )
        return false;

      return true;
    });
  },
  []
);
```

## Como Usar

### **1. Acessar os Filtros**

- Clique no botão "Filtros Avançados" acima da tabela
- O painel se expandirá mostrando todas as opções

### **2. Definir Faixas de Valores**

- Digite valores mínimo e máximo nos campos numéricos
- Deixe em branco para não aplicar limite
- Os filtros são aplicados automaticamente

### **3. Selecionar Categorias**

- Marque as checkboxes das categorias desejadas
- Pode selecionar múltiplas opções
- Desmarque para remover o filtro

### **4. Aplicar Filtros**

- Clique em "Aplicar" para confirmar as mudanças
- Ou use "Limpar" para remover todos os filtros
- O badge mostra quantos filtros estão ativos

### **5. Persistência**

- Os filtros são salvos automaticamente
- Reaparecem ao recarregar a página
- Podem ser limpos individualmente ou todos de uma vez

## Exemplos de Uso

### **Exemplo 1: Compostos Sólidos com Baixo Ponto de Fusão**

```
Ponto de Fusão: 0°C - 100°C
Formas Físicas: [✓] Sólido
```

### **Exemplo 2: Compostos Líquidos Solúveis em Água**

```
Formas Físicas: [✓] Líquido
Tipos de Solubilidade: [✓] Solúvel em água
```

### **Exemplo 3: Compostos com Alta Densidade**

```
Densidade: 2.0 g/cm³ - 10.0 g/cm³
```

### **Exemplo 4: Compostos Orgânicos Pequenos**

```
Massa Molar: 50 g/mol - 200 g/mol
Formas Físicas: [✓] Sólido [✓] Líquido
```

## Performance e Otimização

### **Memoização**

- Filtros são memoizados para evitar recálculos desnecessários
- Dependências são monitoradas para atualizações eficientes

### **Lazy Loading**

- Filtros são aplicados apenas quando necessário
- Estado é persistido para melhor UX

### **Validação**

- Valores numéricos são validados automaticamente
- Faixas inválidas são ignoradas
- Feedback visual para erros

## Próximas Fases

### **Fase 2: Agrupamento**

- [ ] Agrupar por categoria química
- [ ] Agrupar por faixas de valores
- [ ] Agrupar por solubilidade

### **Fase 3: Exportação**

- [ ] Exportar dados filtrados para PDF
- [ ] Exportar dados filtrados para Excel
- [ ] Exportar dados filtrados para CSV

### **Fase 4: Filtros Específicos para Orgânicos**

- [ ] Filtros por grupos funcionais
- [ ] Filtros por cadeias de carbono
- [ ] Filtros por reatividade

## Troubleshooting

### **Filtros não funcionam**

1. Verifique se os valores estão dentro das faixas válidas
2. Certifique-se de que pelo menos um filtro está ativo
3. Tente limpar e reaplicar os filtros

### **Performance lenta**

1. Reduza o número de filtros simultâneos
2. Use faixas mais específicas
3. Verifique se há muitos dados sendo processados

### **Estado não persiste**

1. Verifique se o localStorage está habilitado
2. Tente recarregar a página
3. Limpe o cache do navegador se necessário

## Contribuição

Para adicionar novos filtros:

1. **Defina os tipos** em `ChemicalCompound.ts`
2. **Atualize o store** em `catalogStore.ts`
3. **Implemente a lógica** em `useCatalogData.ts`
4. **Crie a interface** em `AdvancedFiltersPanel.tsx`
5. **Adicione traduções** nos arquivos de i18n

## Dúvidas ou Sugestões?

Abra uma issue ou contribua com melhorias!
