"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ChemicalCompound } from "@/features/catalog/domain/types/ChemicalCompound";
import { useTranslations } from "next-intl";

export function useCompoundColumns(): ColumnDef<ChemicalCompound>[] {
  const t = useTranslations("catalog.tableHeaders");

  return [
    {
      accessorKey: "id",
      header: () => t("no"),
      enableSorting: true,
    },
    {
      accessorKey: "name",
      header: () => t("name"),
      enableSorting: true,
      cell: ({ row }) => row.getValue("name") || "-",
    },
    {
      accessorKey: "synonym",
      header: () => t("synonym"),
      enableSorting: true,
      cell: ({ row }) => row.getValue("synonym") || "-",
    },
    {
      accessorKey: "formula",
      header: () => t("formula"),
      enableSorting: true,
    },
    {
      accessorKey: "casNumber",
      header: () => t("casNumber"),
      enableSorting: true,
    },
    {
      accessorKey: "molarMass",
      header: () => t("molarMass"),
      enableSorting: true,
      cell: ({ row }) => row.getValue("molarMass") + " g/mol",
    },
    {
      accessorKey: "physicalForm",
      header: () => t("physicalForm"),
      enableSorting: true,
    },
    {
      accessorKey: "meltingPoint",
      header: () => t("meltingPoint"),
      enableSorting: true,
      cell: ({ row }) => row.getValue("meltingPoint") + " °C",
    },
    {
      accessorKey: "boilingPoint",
      header: () => t("boilingPoint"),
      enableSorting: true,
      cell: ({ row }) => row.getValue("boilingPoint") + " °C",
    },
    {
      accessorKey: "density",
      header: () => t("density"),
      enableSorting: true,
      cell: ({ row }) => row.getValue("density") + " g/cm³",
    },
    {
      accessorKey: "refractiveIndex",
      header: () => t("refractiveIndex"),
      enableSorting: true,
    },
    {
      accessorKey: "solubility",
      header: () => t("solubility"),
      enableSorting: true,
    },
  ];
}
