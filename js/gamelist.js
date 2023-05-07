const apiURL = "https://api.noroff.dev/api/v1/gamehub";

const fetchProducts = () => {
  fetch(apiURL)
    .then((data) => data.json())
    .then((data) => console.log(data));
};

fetchProducts();

// Henter HTML-elementet som skal inneholde produktene
const productContainer = document.querySelector(".container");

// Henter produkter fra APIen og viser dem på nettsiden
async function getProducts() {
  try {
    const response = await fetch(apiURL);
    const data = await response.json();

    // Går gjennom alle produktene og lager en HTML-string for hver
    const productsHtml = data
      .map((product) => {
        return `
        <div class="card">
          <div class="img">${product.imges}</div>
          <div class="content">
            <div class="review-container">
              <span>Reviews: ${product.rating}</span>
              <h5 class="price">$${product.price}</h5>
            </div>
            <h4 class="name">${product.name}</h4>
            <div class="description">
              <p>${product.description}</p>
            </div>
            <div class="button-container">
              <div class="card-button">
                <p>Add to cart</p>
              </div>
            </div>
          </div>
        </div>
      `;
      })
      .join("");

    // Setter HTML-innholdet til produktcontaineren til å være produkter HTML-stringen
    productContainer.innerHTML = productsHtml;
  } catch (error) {
    console.log("Error fetching data from API:", error);
  }
}

// Kaller getProducts funksjonen for å hente og vise produkter på nettsiden
getProducts();
