import { BrasaPointsCustomer, CustomerFilters, SortDirection } from "../types/models";

// FILTRAR CLIENTES
export function filterCustomers(
  customers: BrasaPointsCustomer[],
  filters: CustomerFilters
): BrasaPointsCustomer[] {
  return customers.filter((customer) => {
    if (filters.country && customer.country !== filters.country) return false;

    if (filters.city && customer.city !== filters.city) return false;

    if (
      filters.favoriteLocation &&
      customer.favoriteLocation !== filters.favoriteLocation
    )
      return false;

    if (
      filters.minimumPoints !== undefined &&
      customer.points < filters.minimumPoints
    )
      return false;

    if (
      filters.wantsEmailOffers !== undefined &&
      customer.wantsEmailOffers !== filters.wantsEmailOffers
    )
      return false;

    return true;
  });
}

// ORDENAR CLIENTES
export function sortCustomers(
  customers: BrasaPointsCustomer[],
  field: keyof BrasaPointsCustomer,
  direction: SortDirection = "asc"
): BrasaPointsCustomer[] {
  const sorted = [...customers];

  sorted.sort((a, b) => {
    const valueA = a[field];
    const valueB = b[field];

    if (valueA === undefined || valueB === undefined) {
      return 0;
    }

    if (valueA < valueB) return direction === "asc" ? -1 : 1;
    if (valueA > valueB) return direction === "asc" ? 1 : -1;

    return 0;
  });

  return sorted;
}

// AGRUPAR CLIENTES POR CAMPO
export function groupCustomersBy(
  customers: BrasaPointsCustomer[],
  field: keyof BrasaPointsCustomer
): Record<string, BrasaPointsCustomer[]> {
  return customers.reduce((acc, customer) => {
    const key = String(customer[field]);

    if (!acc[key]) {
      acc[key] = [];
    }

    acc[key].push(customer);

    return acc;
  }, {} as Record<string, BrasaPointsCustomer[]>);
}