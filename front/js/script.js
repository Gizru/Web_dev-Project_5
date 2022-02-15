const uri = 'http://localhost:3000/api/products';
	fetch(uri)
		.then((data) => data.json())
		.then((response) => {
			createProductCards(response);

	});

function createProductCards(array) {
	const length = array.length;
	const container = document.getElementById('items');
	for (let i = 0; 1 < length; i++) {
		const a = createProductCard(array[i]);
		container.appendChild(a);
	}
}

function createProductCard(obj) {
	const a = document.createElement("a");
	const article = document.createElement("article");
	const image = document.createElement("img");
	const h3 = document.createElement("h3");
	const p = document.createElement("p");
	const singleLink = './product.html?=' + obj._id;

	a.setAttribute('id','obj._id');

	h3.classList.add('productname');
	h3.innerHTML = obj.name;

	p.classList.add('productdescription');
	p.innerHTML = obj.description;

	image.setAttribute('src', obj.imageUrl);
	image.setAttribute('alt', obj.altTxt);

	article.appendChild(image);
	article.appendChild(h3);
	article.appendChild(p);

	a.appendChild(article);
	a.setAttribute('href', singleLink);

	return a;
}