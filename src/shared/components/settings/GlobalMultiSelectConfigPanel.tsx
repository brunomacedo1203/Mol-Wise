"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useMultiSelectGlobalStore } from "../../store/multiSelectGlobalStore";

type VariantType =
  | "default"
  | "secondary"
  | "destructive"
  | "success"
  | "warning";
type SizeType = "sm" | "md" | "lg";

export function GlobalMultiSelectConfigPanel() {
  const { globalConfig, updateGlobalConfig, resetToDefaults } =
    useMultiSelectGlobalStore();

  const [localConfig, setLocalConfig] = useState(globalConfig);

  const handleSave = () => {
    updateGlobalConfig(localConfig);
  };

  const handleReset = () => {
    resetToDefaults();
    setLocalConfig(globalConfig);
  };

  return (
    <div className="w-full max-w-2xl p-6 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-background dark:bg-zinc-900">
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-2">
          Configuração Global MultiSelect
        </h2>
        <p className="text-sm text-muted-foreground">
          Configure as propriedades globais para todos os multiselect dropdowns
          da aplicação
        </p>
      </div>

      <div className="space-y-6">
        {/* Variant */}
        <div className="space-y-2">
          <Label>Variante Padrão</Label>
          <select
            value={localConfig.variant || "default"}
            onChange={(e) =>
              setLocalConfig((prev) => ({
                ...prev,
                variant: e.target.value as VariantType,
              }))
            }
            className="w-full p-2 border border-zinc-300 dark:border-zinc-600 rounded-md bg-background"
          >
            <option value="default">Padrão (Azul)</option>
            <option value="secondary">Secundário (Cinza)</option>
            <option value="destructive">Destrutivo (Vermelho)</option>
            <option value="success">Sucesso (Verde)</option>
            <option value="warning">Aviso (Amarelo)</option>
          </select>
        </div>

        {/* Size */}
        <div className="space-y-2">
          <Label>Tamanho Padrão</Label>
          <select
            value={localConfig.size || "md"}
            onChange={(e) =>
              setLocalConfig((prev) => ({
                ...prev,
                size: e.target.value as SizeType,
              }))
            }
            className="w-full p-2 border border-zinc-300 dark:border-zinc-600 rounded-md bg-background"
          >
            <option value="sm">Pequeno</option>
            <option value="md">Médio</option>
            <option value="lg">Grande</option>
          </select>
        </div>

        {/* Max Display Count */}
        <div className="space-y-2">
          <Label>Máximo de Itens Exibidos</Label>
          <Input
            type="number"
            min="1"
            max="10"
            value={localConfig.maxDisplayCount}
            onChange={(e) =>
              setLocalConfig((prev) => ({
                ...prev,
                maxDisplayCount: parseInt(e.target.value) || 3,
              }))
            }
          />
        </div>

        {/* Behavior Switches */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label>Mostrar Contador</Label>
            <input
              type="checkbox"
              checked={localConfig.showCount}
              onChange={(e) =>
                setLocalConfig((prev) => ({
                  ...prev,
                  showCount: e.target.checked,
                }))
              }
              className="w-4 h-4"
            />
          </div>

          <div className="flex items-center justify-between">
            <Label>Permitir Limpar</Label>
            <input
              type="checkbox"
              checked={localConfig.allowClear}
              onChange={(e) =>
                setLocalConfig((prev) => ({
                  ...prev,
                  allowClear: e.target.checked,
                }))
              }
              className="w-4 h-4"
            />
          </div>

          <div className="flex items-center justify-between">
            <Label>Permitir Selecionar Tudo</Label>
            <input
              type="checkbox"
              checked={localConfig.allowSelectAll}
              onChange={(e) =>
                setLocalConfig((prev) => ({
                  ...prev,
                  allowSelectAll: e.target.checked,
                }))
              }
              className="w-4 h-4"
            />
          </div>

          <div className="flex items-center justify-between">
            <Label>Pesquisável</Label>
            <input
              type="checkbox"
              checked={localConfig.searchable}
              onChange={(e) =>
                setLocalConfig((prev) => ({
                  ...prev,
                  searchable: e.target.checked,
                }))
              }
              className="w-4 h-4"
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2 pt-4">
          <Button onClick={handleSave} className="flex-1">
            Salvar Configuração
          </Button>
          <Button variant="outline" onClick={handleReset}>
            Restaurar Padrões
          </Button>
        </div>
      </div>
    </div>
  );
}
