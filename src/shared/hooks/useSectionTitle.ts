import { usePathname } from "next/navigation";

export function useSectionTitle() {
  const pathname = usePathname();

  if (pathname.startsWith("/PeriodicTable")) return "Periodic Table of Elements";
  if (
    pathname.startsWith("/MolarMassCalculator") ||
    pathname.startsWith("/StandardCalculator")
  ) return "Calculators";
  return "Mol Class";
}
