const API_URL = "http://localhost:5287/api/products"; // backend API URL

// Load all products on page load
window.onload = loadProducts;

// Add a new product
document.getElementById("productForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const product = {
    name: document.getElementById("name").value,
    price: parseFloat(document.getElementById("price").value),
    stock: parseInt(document.getElementById("stock").value)
  };

  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(product)
  });

  if (res.ok) {
    alert("✅ Product added successfully!");
    document.getElementById("productForm").reset();
    loadProducts();
  } else {
    alert("❌ Failed to add product.");
  }
});

// Load all products and show them in the table
async function loadProducts() {
  const res = await fetch(API_URL);
  const products = await res.json();

  const list = document.getElementById("productList");
  list.innerHTML = "";

  if (products.length === 0) {
    list.innerHTML = `<tr><td colspan="4" class="text-center text-muted">No products yet...</td></tr>`;
    return;
  }

  products.forEach(p => {
    list.innerHTML += `
      <tr>
        <td>${p.id}</td>
        <td>${p.name}</td>
        <td>₹${p.price}</td>
        <td>${p.stock}</td>
      </tr>`;
  });
}