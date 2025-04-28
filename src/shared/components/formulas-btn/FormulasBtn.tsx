import KeyboardBtn from "@/shared/components/KeyboardBtn";

const formulas = [
  { label: "H₂O", value: "H2O", result: "18" },
  { label: "CO₂", value: "CO2", result: "44" },
  { label: "NaCl", value: "NaCl", result: "58.5" },
];

export default function FormulasBtn({ onFormulaClick }: { onFormulaClick?: (value: string) => void }) {
  return (
    <div className="flex gap-2 mb-1 bg-zinc-100 rounded-lg px-3 py-2 shadow-inner justify-center">
      {formulas.map(f => (
        <KeyboardBtn key={f.label} onClick={() => onFormulaClick?.(f.value)} className="w-15">
          {f.label}
        </KeyboardBtn>
      ))}
    </div>
  );
}
