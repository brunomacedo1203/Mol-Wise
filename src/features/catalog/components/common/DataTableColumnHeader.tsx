import { Column } from "@tanstack/react-table";
import { ChevronsUpDown, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface DataTableColumnHeaderProps<TData, TValue> {
  column: Column<TData, TValue>;
  title: string;
}

export function DataTableColumnHeader<TData, TValue>({
  column,
  title,
}: DataTableColumnHeaderProps<TData, TValue>) {
  const isSorted = column.getIsSorted();

  return (
    <Button
      variant="ghost"
      className={cn("group flex items-center gap-1 px-0 hover:bg-transparent")}
      onClick={() => column.toggleSorting(isSorted === "asc")}
    >
      {title}
      {isSorted === "asc" && <ChevronUp className="h-4 w-4" />}
      {isSorted === "desc" && <ChevronDown className="h-4 w-4" />}
      {!isSorted && (
        <ChevronsUpDown className="h-4 w-4 text-muted-foreground" />
      )}
    </Button>
  );
}
