export type Country = "Colombia" | "Estados Unidos";

export type City = "Medellín" | "Bogotá" | "Cali" | "Miami" | "Orlando";

export type FoodPreference =
  | "Sin restricciones"
  | "Vegetariano"
  | "Sin gluten"
  | "Otro";

export type DiscoverySource =
  | "Redes sociales"
  | "Recomendación"
  | "Pasando por el local"
  | "Búsqueda en internet"
  | "Otro";

export interface RestaurantLocation {
  id: number;
  name: string;
  country: Country;
  city: City;
}

export interface BrasaPointsCustomer {
  id: number;
  fullName: string;
  email: string;
  phone: string;
  country: Country;
  city: City;
  favoriteLocation?: string;
  foodPreferences: FoodPreference[];
  discoverySource: DiscoverySource;
  birthDate: string;
  acceptedTerms: boolean;
  wantsEmailOffers: boolean;
  points: number;
  totalSpent: number;
}

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

export interface CustomerFilters {
  country?: Country;
  city?: City;
  favoriteLocation?: string;
  minimumPoints?: number;
  wantsEmailOffers?: boolean;
}

export type SortDirection = "asc" | "desc";