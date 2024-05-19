let cart = [];

function loadCartFromLocalStorage() {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
        cart = JSON.parse(storedCart);
        updateCartCount();
    }
}

function saveCartToLocalStorage() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

const images = [
    { src: 'media\\image1.jpg', size: 'small', title: 'Котик Овен © Маріанна Пащук RBS53998', description: 'Ціна: 210 грн. Розмір: 30x40 см', price: 210 },
    { src: 'media\\image2.jpg', size: 'medium', title: 'Кольорове село BS53968', description: 'Ціна: 245 грн. Розмір: 40x50 см', price: 245 },
    { src: 'media\\image3.jpg', size: 'large', title: 'Молитва серця © Каріна Зіміна BS53970L', description: 'Ціна: 295 грн. Розмір: 48x60 см', price: 295 },
    { src: 'media\\image4.jpg', size: 'small', title: 'Єдиноріг у сердечках KBS0074', description: 'Ціна: 210 грн. Розмір: 30x40 см', price: 210 },
    { src: 'media\\image8.jpg', size: 'medium', title: 'Котики Риби © Маріанна Пащук BS53971', description: 'Ціна: 245 грн. Розмір: 40x50 см', price: 245 },
    { src: 'media\\image11.jpg', size: 'large', title: 'Поцілунок у квітучому саду BS53897L', description: 'Ціна: 295 грн. Розмір: 48x60 см', price: 295 },
    { src: 'media\\image5.jpg', size: 'small', title: 'Лисичка в квітах KBS0001', description: 'Ціна: 210 грн. Розмір: 30x40 см', price: 210 },
    { src: 'media\\image0.jpg', size: 'medium', title: 'Підводний вальс BS53967', description: 'Ціна: 245 грн. Розмір: 40x50 см', price: 245 },
    { src: 'media\\image12.jpg', size: 'large', title: 'Дух лісу BS53928L', description: 'Ціна: 295 грн. Розмір: 48x60 см', price: 295 },
    { src: 'media\\image6.jpg', size: 'small', title: 'Веселковий єдиноріг KBS7125', description: 'Ціна: 210 грн. Розмір: 30x40 см', price: 210 },
    { src: 'media\\image9.jpg', size: 'medium', title: 'Захоплені вітром BS53963', description: 'Ціна: 245 грн. Розмір: 40x50 см', price: 245 },
    { src: 'media\\image13.jpg', size: 'large', title: 'Синій Трепіт BS53938L', description: 'Ціна: 295 грн. Розмір: 48x60 см', price: 295 },
    { src: 'media\\image7.jpg', size: 'small', title: 'Малинова пісня © Alena Dirizhenko KBS0117', description: 'Ціна: 210 грн. Розмір: 30x40 см', price: 210 },
    { src: 'media\\image10.jpg', size: 'medium', title: 'Барвистий коргі BS53927', description: 'Ціна: 245 грн. Розмір: 40x50 см', price: 245 },
    { src: 'media\\image14.jpg', size: 'large', title: 'Грошовий кіт BS8911L', description: 'Ціна: 295 грн. Розмір: 48x60 см', price: 295 },
];

function loadImages() {
    const container = document.getElementById('cards-container');
    container.innerHTML = ''; 

    const sizeFilter = document.getElementById('size-filter');
    const selectedSize = sizeFilter.value;

    images.forEach(image => {
        if (selectedSize === 'all' || image.size === selectedSize) {
            const card = document.createElement('div');
            card.classList.add('card');
            card.innerHTML = `
                <img src="${image.src}" alt="Image">
                <div class="card-content">
                    <h3>${image.title}</h3>
                    <p>${image.description}</p>
                    <button onclick="addToCart('${image.title}')">Додати до кошика</button>
                </div>
            `;
            container.appendChild(card);
        }
    });
}

function addToCart(title) {
    const item = images.find(image => image.title === title);
    const existingItem = cart.find(cartItem => cartItem.title === title);
    console.log(existingItem)
    console.log(item)
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({...item, quantity: 1, price: item.price});
    }

    updateCartCount();
    saveCartToLocalStorage();
}


function updateCartCount() {
    const cartCount = document.getElementById('cart-count');
    cartCount.textContent = cart.reduce((total, item) => total + item.quantity, 0);
}

function filterImages() {
    loadImages();
}


function renderFilteredCartItems() {
    const cartItemsContainer = document.getElementById('cart-items');
    cartItemsContainer.innerHTML = '';

    let filteredCart = [...cart]; 


    const priceRange = document.getElementById('price-range').value;
    if (priceRange !== 'all') {
        const [minPrice, maxPrice] = priceRange.split('-').map(Number);
        filteredCart = filteredCart.filter(item => item.price >= minPrice && item.price <= maxPrice);
    }


    const sortBy = document.getElementById('sort-by').value;
    if (sortBy === 'name') {
        filteredCart.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortBy === 'priceAsc') {
        filteredCart.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'priceDesc') {
        filteredCart.sort((a, b) => b.price - a.price);
    }


    filteredCart.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');
        cartItem.innerHTML = `
            <p>${item.title} (x${item.quantity})</p>
            <p>Ціна: ${item.price} грн</p>
            <button onclick="removeFromCart('${item.title}')">Видалити</button>
        `;
        cartItemsContainer.appendChild(cartItem);
    });

    const totalCost = filteredCart.reduce((total, item) => total + item.price * item.quantity, 0);
    const totalCostElement = document.getElementById('total-cost');
    totalCostElement.textContent = `Загальна вартість: ${totalCost} грн`;
}


function updateCartDisplay() {
    renderFilteredCartItems();
}


document.getElementById('sort-by').addEventListener('change', updateCartDisplay);
document.getElementById('price-range').addEventListener('change', updateCartDisplay);



function removeFromCart(title) {
    const itemIndex = cart.findIndex(cartItem => cartItem.title === title);

    if (itemIndex > -1) {
        cart.splice(itemIndex, 1);
        updateCartCount();
        saveCartToLocalStorage();
    }
}

function displaySubscribeModal() {
    const modal = document.getElementById('subscribe-modal');
    const closeButton = modal.querySelector('.close');
    const subscribeButton = modal.querySelector('#subscribe-btn');
    const closeButtonOutside = modal.querySelector('#close-btn');

    closeButton.onclick = function() {
        modal.style.display = 'none';
    }

    closeButtonOutside.onclick = function() {
        modal.style.display = 'none';
    }

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    }

    modal.style.display = 'block';

    subscribeButton.onclick = function() {
        const emailInput = document.getElementById('email-input').value;

        modal.style.display = 'none';
    }
}

function displayAdModal() {
    const modal = document.getElementById('ad-modal');
    const closeButton = modal.querySelector('.close');

    closeButton.onclick = function() {
        modal.style.display = 'none';
    }
    buildAdChart()
    setTimeout(function() {
        modal.style.display = 'block';
    }, 5000); 
}

function displayCartModal() {
    const modal = document.getElementById('cart-modal');
    const closeButton = modal.querySelector('.close');
    const closeButtonOutside = modal.querySelector('#close-cart-btn');

    closeButton.onclick = function() {
        modal.style.display = 'none';
    }

    closeButtonOutside.onclick = function() {
        modal.style.display = 'none';
    }

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    }

    modal.style.display = 'block';
}

window.onload = function() {
    loadImages();
    loadCartFromLocalStorage();

    document.getElementById('size-filter').addEventListener('change', filterImages);
    document.getElementById('view-cart-btn').addEventListener('click', displayCartModal);

    displaySubscribeModal();
    displayAdModal();
}


function buildAdChart() {
    const data = [{
        labels: ['Поцілунок у квітучому саду BS53897L', 'Веселковий єдиноріг KBS7125', 'Котик Овен © Маріанна Пащук RBS53998'], 
        values: [10, 20, 30], 
        type: 'pie'
    }];
    Plotly.newPlot('ad-chart', data);
}

