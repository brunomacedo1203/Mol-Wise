import { usePeriodicTable } from "../../hooks/usePeriodicTable";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

/**
 * Cabeçalho da tabela periódica com controles de configuração
 */
export function PeriodicTableHeader() {
  const { config, setConfig } = usePeriodicTable();

  const handleCheckedChange =
    (key: keyof typeof config) => (checked: boolean) => {
      setConfig({ [key]: checked });
    };

  return (
    <div className="flex flex-wrap gap-4 p-4 border-b">
      <div className="flex items-center space-x-2">
        <Checkbox
          id="showAtomicNumber"
          checked={config.showAtomicNumber}
          onCheckedChange={handleCheckedChange("showAtomicNumber")}
        />
        <Label htmlFor="showAtomicNumber">Número Atômico</Label>
      </div>

      <div className="flex items-center space-x-2">
        <Checkbox
          id="showAtomicMass"
          checked={config.showAtomicMass}
          onCheckedChange={handleCheckedChange("showAtomicMass")}
        />
        <Label htmlFor="showAtomicMass">Massa Atômica</Label>
      </div>

      <div className="flex items-center space-x-2">
        <Checkbox
          id="showElementName"
          checked={config.showElementName}
          onCheckedChange={handleCheckedChange("showElementName")}
        />
        <Label htmlFor="showElementName">Nome do Elemento</Label>
      </div>

      <div className="flex items-center space-x-2">
        <Checkbox
          id="showElementSymbol"
          checked={config.showElementSymbol}
          onCheckedChange={handleCheckedChange("showElementSymbol")}
        />
        <Label htmlFor="showElementSymbol">Símbolo do Elemento</Label>
      </div>
    </div>
  );
}
