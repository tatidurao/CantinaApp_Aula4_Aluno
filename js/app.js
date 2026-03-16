const screens = {
  menuScreen: document.getElementById("menuScreen"),
  favoritesScreen: document.getElementById("favoritesScreen"),
  cartScreen: document.getElementById("cartScreen"),
  
};

const todayLabel = document.getElementById("todayLabel");

const menuGrid = document.getElementById("menuGrid");

const favoritesGrid = document.getElementById("favoritesGrid");
const favoritesEmpty = document.getElementById("favoritesEmpty");

const cartList = document.getElementById("");
const cartEmpty = document.getElementById("");

const cartBadge = document.getElementById("");
const cartTotal = document.getElementById("");
const confirmOrderBtn = document.getElementById("");




let favorites = new Set();

//criar json cart

function showScreen(screenId) {
  // Esconde todas
  Object.values(screens).forEach((s) => s.classList.remove("active"));

  // Mostra a escolhida
  screens[screenId].classList.add("active");

  // Atualiza botões ativos
  document.querySelectorAll(".tab-btn").forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.screen === screenId);
  });

  // Renderiza a tela certa quando abrir
  if (screenId === "favoritesScreen") renderFavorites();
  //add tela cart

}

document.querySelectorAll(".tab-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    showScreen(btn.dataset.screen);
  });
});

// Botões que mandam pra outra tela (ex: "Ver cardápio")
document.querySelectorAll("[data-go]").forEach((btn) => {
  btn.addEventListener("click", () => {
    showScreen(btn.dataset.go);
  });
});

function renderMenu() {
  menuGrid.innerHTML = "";

  MENU_ITEMS.forEach((item) => {
    const isFav = favorites.has(item.id);

    const card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
      <img src="${item.image}" alt="${item.name}" />
      <div class="card-info">
        <h3>${item.name}</h3>
        <p class="muted">${item.description}</p>
        <p class="price">${formatMoney(item.price)}</p>
      </div>

      <div class="card-actions">
        <button class="icon-btn fav ${isFav ? "active" : ""}" title="Favoritar">
          ❤️
        </button>
        <button class="icon-btn add" title="Adicionar ao carrinho">
          ➕
        </button>
      </div>
    `;

    // 📌 Eventos do card
    // Ensina: selecionar elementos dentro de um componente
    const favBtn = card.querySelector(".fav");
    const addBtn = card.querySelector(".add");

    favBtn.addEventListener("click", () => toggleFavorite(item.id));
    //add ao carrinho

    menuGrid.appendChild(card);
  });
}

function toggleFavorite(itemId) {
  // Ensina: Set (estrutura de dados simples e eficiente)
  if (favorites.has(itemId)) {
    favorites.delete(itemId);
  } else {
    favorites.add(itemId);
  }

  // Atualiza cardápio (pra refletir o coração ativo)
  renderMenu();

  // Se estiver na tela de favoritos, atualiza também
  if (screens.favoritesScreen.classList.contains("active")) {
    renderFavorites();
  }
}



function renderFavorites() {
  favoritesGrid.innerHTML = "";

  const favItems = MENU_ITEMS.filter((item) => favorites.has(item.id));

  if (favItems.length === 0) {
    favoritesEmpty.style.display = "block";
    favoritesGrid.style.display = "none";
    return;
  }

  favoritesEmpty.style.display = "none";
  favoritesGrid.style.display = "grid";

  favItems.forEach((item) => {
    const card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
      <img src="${item.image}" alt="${item.name}" />
      <div class="card-info">
        <h3>${item.name}</h3>
        <p class="muted">${item.description}</p>
        <p class="price">${formatMoney(item.price)}</p>
      </div>

      <div class="card-actions">
        <button class="icon-btn fav active" title="Remover dos favoritos">
          ❤️
        </button>
        <button class="icon-btn add" title="Adicionar ao carrinho">
          ➕
        </button>
      </div>
    `;

    card.querySelector(".fav").addEventListener("click", () => toggleFavorite(item.id));
    //add to cart

    favoritesGrid.appendChild(card);
  });
}


function addToCart(itemId) {

}

function removeFromCart(itemId) {

}

function updateCartBadge() {

}

function calculateTotal() {
  
}

function renderCart() {
  cartList.innerHTML = "";

  const cartEntries = Object.entries(cart);

  if (cartEntries.length === 0) {
    cartEmpty.style.display = "block";
    cartList.style.display = "none";
    cartTotal.textContent = formatMoney(0);
    confirmOrderBtn.disabled = true;
    return;
  }

  cartEmpty.style.display = "none";
  cartList.style.display = "flex";
  confirmOrderBtn.disabled = false;

  cartEntries.forEach(([itemId, qty]) => {
    const item = MENU_ITEMS.find((i) => i.id === itemId);

    const row = document.createElement("div");
    row.className = "cart-item";

    row.innerHTML = `
      <img src="${item.image}" alt="${item.name}" />
      <div class="title">
        <strong>${item.name}</strong>
        <p class="muted">${formatMoney(item.price)}</p>
      </div>

      <div class="qty-controls">
        <button class="qty-btn minus">-</button>
        <strong>${qty}</strong>
        <button class="qty-btn plus">+</button>
      </div>
    `;

    row.querySelector(".minus").addEventListener("click", () => {
      removeFromCart(itemId)
    });
    row.querySelector(".plus").addEventListener("click", () => {
      addToCart(itemId)
    });

    cartList.appendChild(row);
  });

  cartTotal.textContent = formatMoney(calculateTotal());
}


// ---------- Inicialização ----------
function init() {
  todayLabel.textContent = formatToday();

  renderMenu();
  renderFavorites();
  renderCart();
  updateCartBadge();
}

init();