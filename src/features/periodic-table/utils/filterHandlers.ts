import { RARE_EARTHS_LABEL } from "../domain/types/elementCategories";

export function handleFilterChangeFactory(filterOptions: { value: string }[], setFilters: (values: string[]) => void, filters: string[]) {
  return function handleFilterChange(values: string[]) {
    if (values.includes("ALL") && filters.length !== filterOptions.length - 1) {
      setFilters(
        filterOptions
          .filter((opt) => opt.value !== "ALL" && opt.value !== RARE_EARTHS_LABEL)
          .map((opt) => opt.value)
      );
    } else if (
      filters.length === filterOptions.length - 1 &&
      !values.includes("ALL") &&
      values.length === filterOptions.length - 1
    ) {
      setFilters([]);
    } else {
      setFilters(values.filter((v) => v !== "ALL"));
    }
  };
} 