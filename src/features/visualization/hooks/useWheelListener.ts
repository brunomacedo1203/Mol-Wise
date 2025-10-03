import { useEffect } from "react";

export function useWheelListener(
  svgHostRef: React.RefObject<HTMLDivElement | null>,
  onWheel: (e: React.WheelEvent<HTMLDivElement>) => void
) {
  useEffect(() => {
    const el = svgHostRef.current;
    if (!el || !onWheel) return;

    const handleWheel = (e: WheelEvent) => {
      // Mantém a mesma lógica: prevenir scroll padrão e delegar
      e.preventDefault();
      onWheel(e as unknown as React.WheelEvent<HTMLDivElement>);
    };

    el.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      el.removeEventListener("wheel", handleWheel);
    };
  }, [svgHostRef, onWheel]);
}