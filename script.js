const productCategories = {
  breads: {
    title: "Breads",
    description: "Sourdough, country loaves, and sandwich bread.",
    price: "$6–$12 per loaf"
  },
  pastries: {
    title: "Pastries",
    description: "Croissants, muffins, rolls, and cookies.",
    price: "$3–$7 each"
  },
  cakes: {
    title: "Cakes",
    description: "Small celebration cakes made to order.",
    price: "$32–$95"
  }
};

const validationMessages = {
  name: "Please enter your name.",
  email: "Please enter a valid email address.",
  details: "Please provide at least 5 characters about your request."
};

function showProductCategory(category) {
  const results = document.querySelector("#product-results");
  const product = productCategories[category];

  results.innerHTML = `
    <h3>${product.title}</h3>
    <p>${product.description}</p>
    <p><strong>${product.price}</strong></p>
  `;
}

function initializeProductFilter() {
  const filter = document.querySelector("#product-filter");
  if (!filter) return;

  const savedCategory = localStorage.getItem("bakeryProductCategory");
  if (savedCategory && productCategories[savedCategory]) {
    filter.value = savedCategory;
  }

  showProductCategory(filter.value);

  filter.addEventListener("change", () => {
    localStorage.setItem("bakeryProductCategory", filter.value);
    showProductCategory(filter.value);
  });
}

function setFieldError(fieldId, message) {
  const error = document.querySelector(`#${fieldId}-error`);
  error.textContent = message;
}

function validateContactForm(event) {
  const name = document.querySelector("#name");
  const email = document.querySelector("#email");
  const details = document.querySelector("#details");
  const message = document.querySelector("#form-message");
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  let formIsValid = true;

  setFieldError("name", "");
  setFieldError("email", "");
  setFieldError("details", "");
  message.textContent = "";

  if (!name.value.trim()) {
    setFieldError("name", validationMessages.name);
    formIsValid = false;
  }

  if (!emailPattern.test(email.value.trim())) {
    setFieldError("email", validationMessages.email);
    formIsValid = false;
  }

  if (details.value.trim().length < 5) {
    setFieldError("details", validationMessages.details);
    formIsValid = false;
  }

  if (!formIsValid) {
    event.preventDefault();
    return;
  }

  event.preventDefault();
  localStorage.setItem("bakeryCustomerName", name.value.trim());
  message.textContent = "Thanks! Your request details are ready to send.";
}

function initializeContactForm() {
  const form = document.querySelector("form");
  if (!form) return;

  const name = document.querySelector("#name");
  const savedName = localStorage.getItem("bakeryCustomerName");
  if (savedName) name.value = savedName;

  form.addEventListener("submit", validateContactForm);
}

initializeProductFilter();
initializeContactForm();
