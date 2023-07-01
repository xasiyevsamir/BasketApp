let express = require("express");
let app = express();
let cors = require("cors");

let products = [
	{
		id: 1,
		img: "http://127.0.0.1:5501/assets/images/1.jpg",
		category: "Smart saat",
		title: "Mibro Lite 2 (XPAW011) Tarnish",
		price: 179.99,
	},
	{
		id: 2,
		img: "http://127.0.0.1:5501/assets/images/2.jpg",
		category: "Televizorlar",
		title: 'Samsung 65"QLED Smart TV 4K UHD (QE65Q70TAUXRU)',
		price: 300.99,
	},
	{
		id: 3,
		img: "http://127.0.0.1:5501/assets/images/3.jpg",
		category: "Smart saat",
		title: "Mibro Lite 2 (XPAW011) Tarnish",
		price: 179.99,
	},
	{
		id: 4,
		img: "http://127.0.0.1:5501/assets/images/4.jpg",
		category: "Smart saat",
		title: "Mibro Lite 2 (XPAW011) Tarnish",
		price: 179.99,
	},
	{
		id: 5,
		img: "http://127.0.0.1:5501/assets/images/5.jpg",
		category: "Smart saat",
		title: "Mibro Lite 2 (XPAW011) Tarnish",
		price: 179.99,
	},
	{
		id: 6,
		img: "http://127.0.0.1:5501/assets/images/4.jpg",
		category: "Smart saat",
		title: "Mibro Lite 2 (XPAW011) Tarnish",
		price: 179.99,
	},
	{
		id: 7,
		img: "http://127.0.0.1:5501/assets/images/3.jpg",
		category: "Smart saat",
		title: "Mibro Lite 2 (XPAW011) Tarnish",
		price: 179.99,
	},
	{
		id: 8,
		img: "http://127.0.0.1:5501/assets/images/2.jpg",
		category: "Smart saat",
		title: "Mibro Lite 2 (XPAW011) Tarnish",
		price: 179.99,
	},
	{
		id: 9,
		img: "http://127.0.0.1:5501/assets/images/1.jpg",
		category: "Smart saat",
		title: "Mibro Lite 2 (XPAW011) Tarnish",
		price: 179.99,
	},
	{
		id: 10,
		img: "http://127.0.0.1:5501/assets/images/6.png",
		category: "Smart saat",
		title: "Mibro Lite 2 (XPAW011) Tarnish",
		price: 179.99,
	},
];

app.use(
	cors({
		origin: ["http://127.0.0.1:5501"],
	})
);

app.get("/api/products", function (req, res) {
	setTimeout(() => {
		res.status(200).send(products);
	}, 100);
});

app.get("/api/products/:id", async function (req, res) {
	let id = Number(req.params.id);
	let findedElement = products.find(product => product.id === id);

	setTimeout(() => {
		res.status(200).send(findedElement);
	}, 100);
});

app.listen(4000, function () {
	console.log("Mock api is running...");
});
