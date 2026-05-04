import { BrasaPointsCustomer } from "./types/models";
import { filterCustomers, sortCustomers } from "./utils/collections";
import { linearSearchCustomerByEmail, binarySearchCustomerById } from "./utils/search";
import {
  countCustomersByCountry,
  calculateAveragePoints,
} from "./utils/transformations";
import { validateCustomer } from "./utils/validations";

// DATA MOCK (simulação)
const customers: BrasaPointsCustomer[] = [
  {
    id: 1,
    fullName: "Carlos Santos",
    email: "carlos@email.com",
    phone: "+57 300 123 4567",
    country: "Colombia",
    city: "Medellín",
    favoriteLocation: "Brasaland El Poblado",
    foodPreferences: ["Sin restricciones"],
    discoverySource: "Redes sociales",
    birthDate: "1990-05-10",
    acceptedTerms: true,
    wantsEmailOffers: true,
    points: 120,
    totalSpent: 600000,
  },
  {
    id: 2,
    fullName: "Ana Gómez",
    email: "ana@email.com",
    phone: "+1 305 123 4567",
    country: "Estados Unidos",
    city: "Miami",
    favoriteLocation: "Brasaland Brickell",
    foodPreferences: ["Vegetariano"],
    discoverySource: "Recomendación",
    birthDate: "2002-08-20",
    acceptedTerms: true,
    wantsEmailOffers: false,
    points: 80,
    totalSpent: 400,
  },
];

// VALIDACIÓN
console.log("VALIDACIÓN:");
console.log(validateCustomer(customers[0]));

// FILTRADO
console.log("\nFILTRADO (Colombia):");
console.log(filterCustomers(customers, { country: "Colombia" }));

// ORDENACIÓN
console.log("\nORDENADOS POR PUNTOS DESC:");
console.log(sortCustomers(customers, "points", "desc"));

// BÚSQUEDA LINEAL
console.log("\nBÚSQUEDA POR EMAIL:");
console.log(linearSearchCustomerByEmail(customers, "ana@email.com"));

// BÚSQUEDA BINARIA (IMPORTANTE: array debe estar ordenado por id)
const sortedById = sortCustomers(customers, "id", "asc");

console.log("\nBÚSQUEDA BINARIA POR ID:");
console.log(binarySearchCustomerById(sortedById, 2));

// REPORTES
console.log("\nREPORTE POR PAÍS:");
console.log(countCustomersByCountry(customers));

console.log("\nPROMEDIO DE PUNTOS:");
console.log(calculateAveragePoints(customers));