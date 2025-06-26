"use client";
import { TablePagination } from "@/features/catalog/components/common/TablePagination";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { useCompoundData } from "@/features/catalog/hooks/common/useCompoundData";
import { useCompoundTable } from "@/features/catalog/hooks/common/useCompoundTable";

export function CompoundTable() {
  const { compounds, isLoading, error } = useCompoundData();

  const {
    searchTerm,
    setSearchTerm,
    currentPage,
    setCurrentPage,
    rowsPerPage,
    setRowsPerPage,
    totalPages,
    paginatedData,
    visibleColumns,
    setVisibleColumns,
  } = useCompoundTable({ data: compounds });

  const allColumns = [
    "No.",
    "Name",
    "Synonym",
    "Molecular Formula",
    "CAS Number",
    "Molar Mass",
    "Physical Form",
    "Melting Point (°C)",
    "Boiling Point (°C)",
    "Density (g/cm³)",
    "Refractive Index",
    "Solubility",
  ] as const;

  const toggleColumn = (col: string) => {
    setVisibleColumns((prev) =>
      prev[col] ? { ...prev, [col]: false } : { ...prev, [col]: true }
    );
  };

  if (isLoading) return <div className="text-center">Loading...</div>;
  if (error)
    return <div className="text-center text-red-500">Error loading data.</div>;

  return (
    <div className="container my-10 space-y-4 p-4 border border-border rounded-lg bg-background shadow-sm overflow-x-auto">
      {/* Toolbar */}
      <div className="flex flex-wrap gap-4 items-center justify-between mb-6">
        <div className="flex gap-2 flex-wrap">
          <Input
            placeholder="Search compounds..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-72"
          />
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm">
              Columns
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-48">
            {allColumns.map((col) => (
              <DropdownMenuCheckboxItem
                key={col}
                checked={visibleColumns[col]}
                onCheckedChange={() => toggleColumn(col)}
              >
                {col}
              </DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Tabela */}
      <Table className="w-full">
        <TableHeader>
          <TableRow>
            {visibleColumns["No."] && <TableHead>No.</TableHead>}
            {visibleColumns["Name"] && <TableHead>Name</TableHead>}
            {visibleColumns["Synonym"] && <TableHead>Synonym</TableHead>}
            {visibleColumns["Molecular Formula"] && (
              <TableHead>Formula</TableHead>
            )}
            {visibleColumns["CAS Number"] && <TableHead>CAS</TableHead>}
            {visibleColumns["Molar Mass"] && <TableHead>Molar Mass</TableHead>}
            {visibleColumns["Physical Form"] && (
              <TableHead>Physical Form</TableHead>
            )}
            {visibleColumns["Melting Point (°C)"] && (
              <TableHead>mp (°C)</TableHead>
            )}
            {visibleColumns["Boiling Point (°C)"] && (
              <TableHead>bp (°C)</TableHead>
            )}
            {visibleColumns["Density (g/cm³)"] && (
              <TableHead>Density</TableHead>
            )}
            {visibleColumns["Refractive Index"] && <TableHead>nD</TableHead>}
            {visibleColumns["Solubility"] && <TableHead>Solubility</TableHead>}
          </TableRow>
        </TableHeader>
        <TableBody>
          {paginatedData.length ? (
            paginatedData.map((compound) => (
              <TableRow key={compound.id}>
                {visibleColumns["No."] && <TableCell>{compound.id}</TableCell>}
                {visibleColumns["Name"] && (
                  <TableCell>{compound.name}</TableCell>
                )}
                {visibleColumns["Synonym"] && (
                  <TableCell>{compound.synonym}</TableCell>
                )}
                {visibleColumns["Molecular Formula"] && (
                  <TableCell>{compound.formula}</TableCell>
                )}
                {visibleColumns["CAS Number"] && (
                  <TableCell>{compound.casNumber}</TableCell>
                )}
                {visibleColumns["Molar Mass"] && (
                  <TableCell>{compound.molarMass}</TableCell>
                )}
                {visibleColumns["Physical Form"] && (
                  <TableCell>{compound.physicalForm}</TableCell>
                )}
                {visibleColumns["Melting Point (°C)"] && (
                  <TableCell>{compound.meltingPoint}</TableCell>
                )}
                {visibleColumns["Boiling Point (°C)"] && (
                  <TableCell>{compound.boilingPoint}</TableCell>
                )}
                {visibleColumns["Density (g/cm³)"] && (
                  <TableCell>{compound.density}</TableCell>
                )}
                {visibleColumns["Refractive Index"] && (
                  <TableCell>{compound.refractiveIndex}</TableCell>
                )}
                {visibleColumns["Solubility"] && (
                  <TableCell>{compound.solubility}</TableCell>
                )}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={allColumns.length}
                className="text-center py-6"
              >
                No results found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      {/* Footer - Paginação e Rows per page */}
      <div className="flex items-center justify-between mt-4">
        {/* Rows per page */}
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Rows per page:</span>
          <select
            value={rowsPerPage}
            onChange={(e) => setRowsPerPage(Number(e.target.value))}
            className="border rounded px-2 py-1 text-sm bg-background"
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
          </select>
        </div>

        {/* Paginação */}
        <TablePagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
}
