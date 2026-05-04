import { BrasaPointsCustomer } from "../types/models";

export function countCustomersByCountry(
  customers: BrasaPointsCustomer[]
): Record<string, number> {
  return customers.reduce((acc, customer) => {
    acc[customer.country] = (acc[customer.country] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
}

export function countCustomersByCity(
  customers: BrasaPointsCustomer[]
): Record<string, number> {
  return customers.reduce((acc, customer) => {
    acc[customer.city] = (acc[customer.city] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
}

export function calculateTotalPoints(customers: BrasaPointsCustomer[]): number {
  return customers.reduce((total, customer) => total + customer.points, 0);
}

export function calculateAveragePoints(customers: BrasaPointsCustomer[]): number {
  if (customers.length === 0) return 0;

  return calculateTotalPoints(customers) / customers.length;
}

export function calculateTotalSpent(customers: BrasaPointsCustomer[]): number {
  return customers.reduce((total, customer) => total + customer.totalSpent, 0);
}

export function findCustomerWithMostPoints(
  customers: BrasaPointsCustomer[]
): BrasaPointsCustomer | null {
  if (customers.length === 0) return null;

  return customers.reduce((maxCustomer, currentCustomer) => {
    return currentCustomer.points > maxCustomer.points
      ? currentCustomer
      : maxCustomer;
  });
}

export function findCustomerWithLeastPoints(
  customers: BrasaPointsCustomer[]
): BrasaPointsCustomer | null {
  if (customers.length === 0) return null;

  return customers.reduce((minCustomer, currentCustomer) => {
    return currentCustomer.points < minCustomer.points
      ? currentCustomer
      : minCustomer;
  });
}