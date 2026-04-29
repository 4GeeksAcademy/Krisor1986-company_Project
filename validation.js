const form = document.getElementById("brasaForm");
const successMessage = document.getElementById("successMessage");

const fields = {
  fullName: document.getElementById("fullName"),
  email: document.getElementById("email"),
  phone: document.getElementById("phone"),
  country: document.getElementById("country"),
  city: document.getElementById("city"),
  favoriteLocation: document.getElementById("favoriteLocation"),
  referralSource: document.getElementById("referralSource"),
  birthDate: document.getElementById("birthDate"),
  terms: document.getElementById("terms"),
};

const errors = {
  fullName: document.getElementById("fullNameError"),
  email: document.getElementById("emailError"),
  phone: document.getElementById("phoneError"),
  country: document.getElementById("countryError"),
  city: document.getElementById("cityError"),
  referralSource: document.getElementById("referralSourceError"),
  birthDate: document.getElementById("birthDateError"),
  terms: document.getElementById("termsError"),
};

const citiesByCountry = {
  Colombia: ["Medellín", "Bogotá", "Cali"],
  "Estados Unidos": ["Miami", "Orlando"],
};

const locationsByCity = {
  Medellín: [
    "Brasaland El Poblado",
    "Brasaland Laureles",
    "Brasaland Envigado",
    "Brasaland Sabaneta",
  ],
  Bogotá: [
    "Brasaland Usaquén",
    "Brasaland Chapinero",
    "Brasaland Zona Rosa",
  ],
  Cali: [
    "Brasaland Granada",
    "Brasaland Ciudad Jardín",
    "Brasaland Unicentro",
  ],
  Miami: ["Brasaland Brickell", "Brasaland Coral Gables"],
  Orlando: ["Brasaland Downtown", "Brasaland International Drive"],
};

function showError(fieldName, message) {
  errors[fieldName].textContent = message;
  errors[fieldName].classList.remove("hidden");

  if (fields[fieldName]) {
    fields[fieldName].classList.add("border-red-600", "ring-2", "ring-red-100");
  }
}

function clearError(fieldName) {
  errors[fieldName].textContent = "";
  errors[fieldName].classList.add("hidden");

  if (fields[fieldName]) {
    fields[fieldName].classList.remove("border-red-600", "ring-2", "ring-red-100");
  }
}

function isValidFullName() {
  const words = fields.fullName.value.trim().split(/\s+/);
  return words.length >= 2 && words.every((word) => word.length >= 2);
}

function isValidEmail() {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email.value.trim());
}

function isValidPhone() {
  return /^(\+57|\+1)\s?[0-9\s]{7,15}$/.test(fields.phone.value.trim());
}

function isAdult() {
  if (!fields.birthDate.value) return false;

  const birthDate = new Date(fields.birthDate.value);
  const today = new Date();

  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDifference = today.getMonth() - birthDate.getMonth();
  const dayDifference = today.getDate() - birthDate.getDate();

  if (monthDifference < 0 || (monthDifference === 0 && dayDifference < 0)) {
    age--;
  }

  return age >= 18;
}

function updateCities() {
  const selectedCountry = fields.country.value;

  fields.city.innerHTML = '<option value="">Selecciona tu ciudad</option>';
  fields.favoriteLocation.innerHTML =
    '<option value="">Selecciona país y ciudad primero</option>';

  if (!selectedCountry || !citiesByCountry[selectedCountry]) return;

  citiesByCountry[selectedCountry].forEach((city) => {
    const option = document.createElement("option");
    option.value = city;
    option.textContent = city;
    fields.city.appendChild(option);
  });
}

function updateLocations() {
  const selectedCity = fields.city.value;

  fields.favoriteLocation.innerHTML =
    '<option value="">Selecciona tu ubicación favorita</option>';

  if (!selectedCity || !locationsByCity[selectedCity]) return;

  locationsByCity[selectedCity].forEach((location) => {
    const option = document.createElement("option");
    option.value = location;
    option.textContent = location;
    fields.favoriteLocation.appendChild(option);
  });
}

function validateField(fieldName) {
  switch (fieldName) {
    case "fullName":
      if (!isValidFullName()) {
        showError("fullName", "Ingresa tu nombre completo (nombre y apellido)");
        return false;
      }
      clearError("fullName");
      return true;

    case "email":
      if (!isValidEmail()) {
        showError("email", "Ingresa un email válido (ejemplo: nombre@correo.com)");
        return false;
      }
      clearError("email");
      return true;

    case "phone":
      if (!isValidPhone()) {
        showError(
          "phone",
          "El teléfono debe incluir código de país (ejemplo: +57 300 123 4567 o +1 305 123 4567)"
        );
        return false;
      }
      clearError("phone");
      return true;

    case "country":
      if (!fields.country.value) {
        showError("country", "Selecciona tu país");
        return false;
      }
      clearError("country");
      return true;

    case "city":
      if (!fields.city.value) {
        showError("city", "Selecciona tu ciudad");
        return false;
      }
      clearError("city");
      return true;

    case "referralSource":
      if (!fields.referralSource.value) {
        showError("referralSource", "Cuéntanos cómo conociste Brasaland");
        return false;
      }
      clearError("referralSource");
      return true;

    case "birthDate":
      if (!isAdult()) {
        showError(
          "birthDate",
          "Debes ser mayor de 18 años para registrarte en Brasa Points"
        );
        return false;
      }
      clearError("birthDate");
      return true;

    case "terms":
      if (!fields.terms.checked) {
        showError(
          "terms",
          "Debes aceptar los términos del programa Brasa Points para continuar"
        );
        return false;
      }
      clearError("terms");
      return true;

    default:
      return true;
  }
}

function validateForm() {
  const validations = [
    validateField("fullName"),
    validateField("email"),
    validateField("phone"),
    validateField("country"),
    validateField("city"),
    validateField("referralSource"),
    validateField("birthDate"),
    validateField("terms"),
  ];

  return validations.every((isValid) => isValid);
}

fields.country.addEventListener("change", () => {
  updateCities();
  validateField("country");
});

fields.city.addEventListener("change", () => {
  updateLocations();
  validateField("city");
});

fields.fullName.addEventListener("blur", () => validateField("fullName"));
fields.email.addEventListener("blur", () => validateField("email"));
fields.phone.addEventListener("blur", () => validateField("phone"));
fields.birthDate.addEventListener("change", () => validateField("birthDate"));
fields.referralSource.addEventListener("change", () => validateField("referralSource"));
fields.terms.addEventListener("change", () => validateField("terms"));

fields.fullName.addEventListener("input", () => clearError("fullName"));
fields.email.addEventListener("input", () => clearError("email"));
fields.phone.addEventListener("input", () => clearError("phone"));

form.addEventListener("submit", (event) => {
  event.preventDefault();

  if (!validateForm()) {
    successMessage.classList.add("hidden");
    return;
  }

  successMessage.classList.remove("hidden");
  successMessage.scrollIntoView({ behavior: "smooth", block: "start" });
});

form.addEventListener("reset", () => {
  successMessage.classList.add("hidden");

  Object.keys(errors).forEach((fieldName) => {
    clearError(fieldName);
  });

  setTimeout(() => {
    fields.city.innerHTML = '<option value="">Selecciona primero tu país</option>';
    fields.favoriteLocation.innerHTML =
      '<option value="">Selecciona país y ciudad primero</option>';
  }, 0);
});