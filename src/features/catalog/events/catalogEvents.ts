// src/features/catalog/events/catalogEvents.ts

import { event } from "@/lib/gtag";

export const trackCatalogSearch = ({
  search_term,
  result_count,
  search_type,
  section = "catalog",
}: {
  search_term: string;
  result_count?: number;
  search_type?: "name" | "formula" | "cas" | "synonym" | "common_name" | "solubility" | "mixed";
  section?: string;
}): void => {
  console.log("[CATALOG_EVENTS] Disparando trackCatalogSearch:", {
    search_term,
    result_count,
    search_type,
    section,
  });

  event("search", {
    search_term,
    result_count,
    search_type,
    section,
  });
};

export const trackCompoundView = ({
  compound_id,
  compound_name,
  compound_formula,
  compound_category,
  section = "catalog",
}: {
  compound_id: string;
  compound_name: string;
  compound_formula?: string;
  compound_category?: string;
  section?: string;
}): void => {
  console.log("[CATALOG_EVENTS] Disparando trackCompoundView:", {
    compound_id,
    compound_name,
    compound_formula,
    compound_category,
    section,
  });

  event("view_item", {
    item_id: compound_id,
    item_name: compound_name,
    item_category: compound_category,
    item_type: "compound",
    formula: compound_formula,
    section,
  });
};

export const trackCatalogFilter = ({
  filter_type,
  filter_value,
  result_count,
  section = "catalog",
}: {
  filter_type: "category" | "physical_form" | "melting_point" | "boiling_point" | "density" | "solubility";
  filter_value: string;
  result_count?: number;
  section?: string;
}): void => {
  console.log("[CATALOG_EVENTS] Disparando trackCatalogFilter:", {
    filter_type,
    filter_value,
    result_count,
    section,
  });

  event("filter_applied", {
    filter_type,
    filter_value,
    result_count,
    section,
  });
};

export const trackCatalogSort = ({
  sort_column,
  sort_order,
  section = "catalog",
}: {
  sort_column: string;
  sort_order: "asc" | "desc";
  section?: string;
}): void => {
  console.log("[CATALOG_EVENTS] Disparando trackCatalogSort:", {
    sort_column,
    sort_order,
    section,
  });

  event("sort_applied", {
    sort_column,
    sort_order,
    section,
  });
};

export const trackCatalogPagination = ({
  page_number,
  items_per_page,
  total_items,
  section = "catalog",
}: {
  page_number: number;
  items_per_page: number;
  total_items: number;
  section?: string;
}): void => {
  console.log("[CATALOG_EVENTS] Disparando trackCatalogPagination:", {
    page_number,
    items_per_page,
    total_items,
    section,
  });

  event("pagination_used", {
    page_number,
    items_per_page,
    total_items,
    section,
  });
};

export const trackCatalogColumnToggle = ({
  column_name,
  column_visible,
  section = "catalog",
}: {
  column_name: string;
  column_visible: boolean;
  section?: string;
}): void => {
  console.log("[CATALOG_EVENTS] Disparando trackCatalogColumnToggle:", {
    column_name,
    column_visible,
    section,
  });

  event("column_toggled", {
    column_name,
    column_visible,
    section,
  });
};
