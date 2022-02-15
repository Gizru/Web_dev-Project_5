const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const id = urlParams.get('');
const uri = 'http://localhost:3000/api/products/' + id;

fetch(uri)
	.then((data) => data.json())
	.then((response) => {
		fillProductPage(response);
	});

function fillProductPage(obj) {
	const imageItem = document.getElementsByClassName('item__img')[0];
	const image = document.createElement("img");
	image.setAttribute('src', obj.imageUrl);
	image.setAttribute('alt', obj.altTxt);

	const h1 = document.getElementById('title');
	const span = document.getElementById('price');
	const p = document.getElementById('description');
	const colors = document.getElementById('colors');

	h1.innerHTML = obj.name;

	span.innerHTML = obj.price;

	p.innerHTML = obj.description;


	for (i = 0; i < obj.colors.length; i++) {
		const option = getOption(obj.colors[i]); 
		colors.appendChild(option);
	}


	imageItem.appendChild(image);
}

function getOption(color) {
	const option = document.createElement("option");
	option.setAttribute('value', color);
	option.innerHTML = color;
	return option;
}

const button = document.getElementById('addToCart');
button.onclick = SaveToCart;

function SaveToCart() {

	const colors = document.getElementById('colors');
	const quantity = document.getElementById('quantity');
	const existing = localStorage.getItem(id + colors.value);


	if (existing == null) {
		const element = [id, colors.value, quantity.value];
		localStorage.setItem(id + colors.value, JSON.stringify(element));
	}
	else {
		const existingArray = JSON.parse(existing);
		console.log(existingArray[2]);
		existingArray[2] = (parseInt(existingArray[2]) + parseInt(quantity.value)).toString();
		localStorage.setItem(id + colors.value, JSON.stringify(existingArray));
    }
}