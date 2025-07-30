"use client";

import { Button } from "@/components/ui/button";
import { useMultiSelectGlobalStore } from "../../store/multiSelectGlobalStore";

export function MultiSelectDebugPanel() {
  const {
    globalConfig,
    componentConfigs,
    clearAllComponentConfigs,
    resetToDefaults,
  } = useMultiSelectGlobalStore();

  return (
    <div className="w-full max-w-2xl p-6 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-background dark:bg-zinc-900">
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-2">Debug MultiSelect</h2>
        <p className="text-sm text-muted-foreground">
          Verificar e limpar configurações específicas
        </p>
      </div>

      <div className="space-y-4">
        {/* Configuração Global */}
        <div className="space-y-2">
          <h3 className="font-semibold">Configuração Global</h3>
          <div className="text-sm bg-gray-100 dark:bg-gray-800 p-3 rounded">
            <pre>{JSON.stringify(globalConfig, null, 2)}</pre>
          </div>
        </div>

        {/* Configurações Específicas */}
        <div className="space-y-2">
          <h3 className="font-semibold">Configurações Específicas</h3>
          <div className="text-sm bg-gray-100 dark:bg-gray-800 p-3 rounded">
            <pre>{JSON.stringify(componentConfigs, null, 2)}</pre>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2 pt-4">
          <Button
            onClick={clearAllComponentConfigs}
            variant="outline"
            className="flex-1"
          >
            Limpar Configurações Específicas
          </Button>
          <Button
            onClick={resetToDefaults}
            variant="destructive"
            className="flex-1"
          >
            Resetar Tudo
          </Button>
        </div>
      </div>
    </div>
  );
}
