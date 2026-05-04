import { BrasaPointsCustomer, City, Country, ValidationResult } from "../types/models";

export function isValidFullName(fullName: string): boolean {
  return fullName.trim().split(/\s+/).filter(Boolean).length >= 2;
}

export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

export function isValidPhone(phone: string, country: Country): boolean {
  const cleanPhone = phone.trim();

  if (country === "Colombia") {
    return cleanPhone.startsWith("+57");
  }

  return cleanPhone.startsWith("+1");
}

export function isCityValidForCountry(city: City, country: Country): boolean {
  const citiesByCountry: Record<Country, City[]> = {
    Colombia: ["Medellín", "Bogotá", "Cali"],
    "Estados Unidos": ["Miami", "Orlando"],
  };

  return citiesByCountry[country].includes(city);
}

export function isAdult(birthDate: string): boolean {
  const today = new Date();
  const birth = new Date(birthDate);

  let age = today.getFullYear() - birth.getFullYear();
  const monthDifference = today.getMonth() - birth.getMonth();

  if (
    monthDifference < 0 ||
    (monthDifference === 0 && today.getDate() < birth.getDate())
  ) {
    age--;
  }

  return age >= 18;
}

export function validateCustomer(customer: BrasaPointsCustomer): ValidationResult {
  const errors: string[] = [];

  if (!isValidFullName(customer.fullName)) {
    errors.push("Ingresa tu nombre completo (nombre y apellido)");
  }

  if (!isValidEmail(customer.email)) {
    errors.push("Ingresa un email válido (ejemplo: nombre@correo.com)");
  }

  if (!isValidPhone(customer.phone, customer.country)) {
    errors.push(
      "El teléfono debe incluir código de país (ejemplo: +57 300 123 4567 o +1 305 123 4567)"
    );
  }

  if (!isCityValidForCountry(customer.city, customer.country)) {
    errors.push("Selecciona tu ciudad");
  }

  if (!customer.discoverySource) {
    errors.push("Cuéntanos cómo conociste Brasaland");
  }

  if (!isAdult(customer.birthDate)) {
    errors.push("Debes ser mayor de 18 años para registrarte en Brasa Points");
  }

  if (!customer.acceptedTerms) {
    errors.push("Debes aceptar los términos del programa Brasa Points para continuar");
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}