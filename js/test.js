async function getProducts() {
  try {
    const response = await fetch(apiURL);
    const data = await response.json();

    // Går gjennom alle produktene og lager en HTML-string for hver
    const productsHtml = data
      .map((product) => {
        return `
          <div class="card">
              <div class="img" style="background-image: url(${product.image})">
              </div>
          </div>
          <div class="content">
            <div class="review-container">
              <span>${product.genre}</span>
              <h5 class="price">$${product.price}</h5>
            </div>
            <h4 class="name">${product.title}</h4>
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
    console.log(
      "Error fetching data from API(feil av innhenting av data fra API.):",
      error
    );
  }
}
