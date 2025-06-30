"use client";

import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";

interface TablePaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function TablePagination({
  currentPage,
  totalPages,
  onPageChange,
}: TablePaginationProps) {
  const t = useTranslations("compoundTable");
  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === totalPages;

  return (
    <div className="flex items-center justify-between mt-4">
      {/* Indicador de Página */}
      <div className="text-sm px-2 text-muted-foreground">
        {t("pageOf", { current: currentPage, total: totalPages })}
      </div>

      {/* Botões de Navegação */}
      <div className="flex gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={isFirstPage}
        >
          {t("previous")}
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={isLastPage}
        >
          {t("next")}
        </Button>
      </div>
    </div>
  );
}
