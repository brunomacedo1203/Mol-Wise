/**
 * Legenda da tabela periódica mostrando as categorias dos elementos
 */
export function PeriodicTableLegend() {
  return (
    <div className="w-full p-4 bg-background border-t">
      <div className="flex items-center justify-center gap-6">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-metal rounded" />
          <span>Metal</span>
        </div>

        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-nonmetal rounded" />
          <span>Não Metal</span>
        </div>

        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-metalloid rounded" />
          <span>Semimetal</span>
        </div>

        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-gas rounded" />
          <span>Gasoso</span>
        </div>

        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-liquid rounded" />
          <span>Líquido</span>
        </div>

        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-solid rounded" />
          <span>Sólido</span>
        </div>
      </div>
    </div>
  );
}
