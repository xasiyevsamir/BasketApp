import { setStorage, getStorage } from "./storage.js";

let productList = document.querySelector(".products-gallery");
let btns = document.getElementsByClassName("btn-addtocart");
let sideBar = document.querySelector(".sidebar-cart");
let basketIcon = document.querySelector(".fa-cart-shopping");
let basketClose = document.querySelector(".btn-close");
let quantity = document.querySelector(".quantity");
let basketContainer = document.querySelector(".cart-items");
let totalAmount = document.querySelector(".totalAmount");
let popularProducts = document.querySelector(".popular-products");

let basketArr = getStorage("products") || [];

document.addEventListener("DOMContentLoaded", function () {
	ListProducts();
	ListBasket();
});

basketIcon.addEventListener("click", () => {
	sideBar.classList.add("open");
	popularProducts.style.transform = "translateX(-300px)";
});
basketClose.addEventListener("click", function () {
	sideBar.classList.remove("open");
	popularProducts.style.transform = "translateX(0px)";
});

async function ListProducts() {
	productList.innerHTML = "";
	let imgElement = document.createElement("img");
	imgElement.src = "http://127.0.0.1:5501/assets/images/giphy.gif";

	productList.prepend(imgElement);

	await fetch("http://localhost:4000/api/products")
		.then(async res => {
			let products = await res.json();
			productList.removeChild(imgElement);
			products.forEach(product => {
				productList.innerHTML += `<article class="product-container">
            <div class="product-image">
                <img src="${product.img}" alt="" />
            </div>
            <div class="product-info">
                <span class="category">${product.category}</span>
                <h4>${product.title}</h4>
                <p>${product.price} AZN</p>
            </div>
            <div class="button-area">
                <button data-id='${product.id}' class="btn-addtocart">
                    <i class="fa-solid fa-cart-shopping"></i>
                    Səbətə əlavə et
                </button>
            </div>
        </article>`;
			});
		})
		.catch(e => {
			alert(e);
			productList.removeChild(imgElement);
		});

	for (const btn of btns) {
		btn.addEventListener("click", AddToCart);
	}
}

async function AddToCart(e) {
	let id = Number(e.target.dataset.id);
	let res = await fetch(`http://localhost:4000/api/products/${id}`);
	let product = await res.json();

	let isInBasket = basketArr.find(x => x.id === product.id);
	let index = basketArr.findIndex(x => x.id === product.id);
	if (isInBasket) {
		let updatedData = { ...isInBasket, count: ++isInBasket.count };
		basketArr.slice(index, 1, updatedData);
	} else {
		basketArr.push({ ...product, count: 1 });
	}

	setStorage("products", basketArr);

	sideBar.classList.add("open");
	ListBasket();
}

function ListBasket() {
	let decrementBtns = document.getElementsByClassName("decrement");
	let incrementBtns = document.getElementsByClassName("increment");
	basketContainer.innerHTML = "";
	basketArr.forEach(product => {
		let totalPrice = product.count * product.price;
		basketContainer.innerHTML += `
		<li class="cart-items-item">
							<span>${product.title.substring(0, 10)}..</span>
							<b>X ${product.count}</b>
							<b>${totalPrice.toFixed(2)}AZN</b>
							<div data-id=${product.id}>
								<button class="cart-item-btn decrement">-</button>
								<button class="cart-item-btn increment">+</button>
							</div>
						</li>`;
	});

	let totalCount = basketArr.reduce(
		(accumulator, product) => accumulator + product.count,
		0
	);

	quantity.textContent = totalCount;

	let totalAmountValue = basketArr.reduce(
		(accumulator, { price, count }) => accumulator + price * count,
		0
	);
	totalAmount.textContent = totalAmountValue.toFixed(2) + "AZN";

	for (const decrementBtn of decrementBtns) {
		decrementBtn.addEventListener("click", Decrement);
	}
	for (const incrementBtn of incrementBtns) {
		incrementBtn.addEventListener("click", Increment);
	}
}

function Decrement(e) {
	let id = Number(e.target.parentElement.dataset.id);

	let isInBasket = basketArr.find(x => x.id === id);
	let index = basketArr.findIndex(x => x.id === id);

	if (isInBasket.count === 1) {
		console.log("salam");
		basketArr = basketArr.filter(x => x.id !== id);
	} else {
		let updatedData = { ...isInBasket, count: --isInBasket.count };
		basketArr.slice(index, 1, updatedData);
	}
	setStorage("products", basketArr);

	ListBasket();
}

function Increment(e) {
	let id = Number(e.target.parentElement.dataset.id);

	let isInBasket = basketArr.find(x => x.id === id);
	let index = basketArr.findIndex(x => x.id === id);

	let updatedData = { ...isInBasket, count: ++isInBasket.count };
	basketArr.slice(index, 1, updatedData);
	setStorage("products", basketArr);
	ListBasket();
}
