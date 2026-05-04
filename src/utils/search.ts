import { BrasaPointsCustomer } from "../types/models";

export function linearSearchCustomerByEmail(
  customers: BrasaPointsCustomer[],
  email: string
): BrasaPointsCustomer | null {
  return customers.find(
    (customer) => customer.email.toLowerCase() === email.toLowerCase()
  ) ?? null;
}

export function linearSearchCustomerById(
  customers: BrasaPointsCustomer[],
  id: number
): BrasaPointsCustomer | null {
  return customers.find((customer) => customer.id === id) ?? null;
}

export function binarySearchCustomerById(
  sortedCustomers: BrasaPointsCustomer[],
  id: number
): number {
  let left = 0;
  let right = sortedCustomers.length - 1;

  while (left <= right) {
    const middle = Math.floor((left + right) / 2);
    const currentCustomer = sortedCustomers[middle];

    if (currentCustomer.id === id) {
      return middle;
    }

    if (currentCustomer.id < id) {
      left = middle + 1;
    } else {
      right = middle - 1;
    }
  }

  return -1;
}