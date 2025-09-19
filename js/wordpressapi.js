// Fetch all (5) products from WordPress API:
const productGrid = document.getElementById('product-grid');

async function fetchProducts() {
    try {
        const response = await fetch('https://www.cmsprojectgamehub.no/wp-json/wc/v3/products?consumer_key=ck_c899182a386d5b2d5b09fadcf4f18343618bdc4d&consumer_secret=cs_309703001c8403e91243408accacf2aed3edf522');
        const data = await response.json();
        console.log(data);
        renderProducts(data);
    } catch (error) {
        if (productGrid) {
            productGrid.innerHTML = `<p>Failed to load products.</p>`;
        }
    }
}

// Creating a block of HTML for each products. Description, image, title. Link to view product.  
function renderProducts(products) {
    if (!productGrid) return;
    productGrid.innerHTML = products.map(product => {
       
        let imageUrl = product.images && product.images.length > 0 ? product.images[0].src : 'https://via.placeholder.com/300x180?text=No+Image';
        return `
            <div class="product-card">
                <img src="${imageUrl}" alt="${product.name}">
                <h3>${product.name}</h3>
                <p class="product-price">${product.price ? 'Price: ' + product.price + ' kr' : ''}</p>
                <p>${product.short_description || ''}</p>
                <a href="productdetails.html?id=${product.id}" class="details-btn">View Details</a>
            </div>
        `;
    }).join('');
}

fetchProducts();

// Getting the product when the user clicks "View details", and returns the products data as JavaScript object, from WooCommerce store using WordPress: 
async function fetchProductById(id) {
    try {
        const response = await fetch(`https://www.cmsprojectgamehub.no/wp-json/wc/v3/products/${id}?consumer_key=ck_c899182a386d5b2d5b09fadcf4f18343618bdc4d&consumer_secret=cs_309703001c8403e91243408accacf2aed3edf522`);
        return await response.json();
    } catch (error) {
        return null;
    }
}

// Getting product ID form the URL, fetches that products info from our API, and displays all the details on the page (productdetails.html):
async function renderProductDetail() {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get("id");
    if (!productId) {
        document.querySelector("#product-detail").innerHTML = "<p>No product ID provided.</p>";
        return;
    }
    const product = await fetchProductById(productId);
    const container = document.querySelector("#product-detail");
    if (!product || product.data?.status === 404) {
        container.innerHTML = "<p>Product not found.</p>";
        return;
    }
    let imageUrl = product.images && product.images.length > 0 ? product.images[0].src : 'https://via.placeholder.com/300x180?text=No+Image';
    container.innerHTML = `
        <h2>${product.name}</h2>
        <img src="${imageUrl}" alt="${product.name}" width="300">
        <p class="product-price">${product.price ? 'Price: ' + product.price + ' kr' : ''}</p>
        <div>${product.description || ''}</div>
        <a href="gamelist.html" class="back-btn">Back to GameList</a>
        <a href="" class="back-btn">Add to cart</a>
    `;
}

// The function only runs on the product details page: 
if (window.location.pathname.includes("productdetails.html")) {
    renderProductDetail();
}