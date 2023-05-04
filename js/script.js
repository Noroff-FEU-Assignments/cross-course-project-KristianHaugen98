const apiURL = "https://api.noroff.dev/api/v1/gamehub";

const fetchProducts = () => {
  fetch(apiURL)
    .then((data) => data.json())
    .then((data) => console.log(data));
};

fetchProducts();

async function getProducts() {
  const response = await fetch("https://api.noroff.dev/gamehub/products");
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  const products = await response.json();
  return products;
}

getProducts()
  .then(displayProducts)
  .catch((error) => console.error("Error:", error));
