DisplayAllItems();
DisplayTotal();

function DisplayAllItems() {
    const section = document.getElementById('cart__items');
    section.innerHTML = '';
    const numberOfArticles = localStorage.length;

    for (i = 0; i < numberOfArticles; i++) {
        const Key = localStorage.key(i);
        const article = GetArticle(Key);
        section.appendChild(article);
    }
}

function DisplayTotal() {
    const tArticle = document.getElementById('totalQuantity');
    const tPrice = document.getElementById('totalPrice');
    const numberOfArticles = localStorage.length;
    let totalArticles = 0;
    let totalPrice = 0;
    tArticle.innerHTML = totalArticles;
    tPrice.innerHTML = totalPrice;

    for (i = 0; i < numberOfArticles; i++) {
        const key = localStorage.key(i);
        const array = JSON.parse(localStorage.getItem(key));
        totalArticles = parseInt(totalArticles) + parseInt(array[2]);
        tArticle.innerHTML = totalArticles;

        const uri = 'http://localhost:3000/api/products/' + array[0];
        fetch(uri)
            .then((data) => data.json())
            .then((response) => {
                console.log(response);
                totalPrice = totalPrice + response.price * parseInt(array[2]);
                console.log(totalPrice);
                tPrice.innerHTML = totalPrice;
            });
    }
}

function GetArticle(key) {
    const array = JSON.parse(localStorage.getItem(key));
    const uri = 'http://localhost:3000/api/products/' + array[0];
    const article = document.createElement("article");
    article.classList.add('cart__item');
    article.setAttribute('data-id', array[0]);
    article.setAttribute('data-color', array[1]);

    fetch(uri)
        .then((data) => data.json())
        .then((obj) => {

            const cart__item__img = GetImageDiv(obj);
            const cart__item__content = GetContentDiv(obj, array);

            article.appendChild(cart__item__img);
            article.appendChild(cart__item__content);
        });

    return article;
}

function GetImageDiv(obj) {
    const cart__item__img = document.createElement("div");
    const image = document.createElement("img");

    cart__item__img.classList.add('cart__item__img');

    image.setAttribute('src', obj.imageUrl);
    image.setAttribute('alt', obj.altTxt);

    cart__item__img.appendChild(image);

    return cart__item__img;
}

function GetContentDiv(obj, array) {
    const cart__item__content = document.createElement("div");
    cart__item__content.classList.add('cart__item__content');

    const cart__item__content__description = GetDescription(obj, array);
    const cart__item__content__settings = GetSettings(array);

    cart__item__content.appendChild(cart__item__content__description);
    cart__item__content.appendChild(cart__item__content__settings);

    return cart__item__content;
}

function GetDescription(obj, array) {
    const cart__item__content__description = document.createElement("div");
    cart__item__content__description.classList.add('cart__item__content__description');

    const h2 = document.createElement("h2");
    const color = document.createElement("p");
    const price = document.createElement("p");

    h2.innerHTML = obj.name;
    color.innerHTML = array[1];
    price.innerHTML = obj.price;

    cart__item__content__description.appendChild(h2);
    cart__item__content__description.appendChild(color);
    cart__item__content__description.appendChild(price);

    return cart__item__content__description;
}

function GetSettings(array) {
    const cart__item__content__settings = document.createElement("div");
    cart__item__content__settings.classList.add('cart__item__content__settings');

    const cart__item__content__settings__quantity = GetSettingsQuantity(array);
    const cart__item__content__settings__delete = GetSettingsDelete(array);

    cart__item__content__settings.appendChild(cart__item__content__settings__quantity);
    cart__item__content__settings.appendChild(cart__item__content__settings__delete);

    return cart__item__content__settings;
}

function GetSettingsQuantity(array) {
    const cart__item__content__settings__quantity = document.createElement("div");
    cart__item__content__settings__quantity.classList.add('cart__item__content__settings__quantity');

    const p = document.createElement("p");
    const input = document.createElement("input");

    p.innerHTML = 'Qté:';
    input.classList.add('itemQuantity');
    input.setAttribute('type', 'number');
    input.setAttribute('name', 'itemQuantity');
    input.setAttribute('min', '1');
    input.setAttribute('max', '100');
    input.setAttribute('value', array[2]);
    input.onchange = function ChangeQuantity() {
        const newArray = [array[0], array[1], input.value]
        console.log(newArray);
        localStorage.setItem(array[0] + array[1], JSON.stringify(newArray));
        DisplayTotal();
    };

    cart__item__content__settings__quantity.appendChild(p);
    cart__item__content__settings__quantity.appendChild(input);

    return cart__item__content__settings__quantity;
}

function GetSettingsDelete(array) {
    const cart__item__content__settings__delete = document.createElement("div");
    cart__item__content__settings__delete.classList.add('cart__item__content__settings__delete');

    const deleteItem = document.createElement("p");

    deleteItem.classList.add('deleteItem');

    deleteItem.innerHTML = 'Delete';

    deleteItem.onclick = function DeleteItem() {
        localStorage.removeItem(array[0] + array[1]);
        DisplayAllItems();
        DisplayTotal();
    };

    cart__item__content__settings__delete.appendChild(deleteItem);

    return cart__item__content__settings__delete;
}
