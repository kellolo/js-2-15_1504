'use strict';

let API = 'https://raw.githubusercontent.com/xenophorus/static/master'

class List {
    constructor(url, container) {
        this.url = url;
        this.container = container;
        this.items = [];
        this._init();
    }

    async _init() {
        try {
            let data = await this._get(API + this.url);
            this.items = this.constructor.name === 'Basket' ? data.contents : data;
            console.log(this.items, `from ${this.constructor.name}`);
        } catch (e) {
            console.log(`Error loading ${this.constructor.name} data, ${e}`);
        } finally {
            this.render();
            this._handleEvents();
        }
    }

    _get(url) {
        return fetch(url)
            .then(d => d.json());
    }

    render() {
        let block = document.querySelector(this.container);
        let str = '';
        this.items.forEach(item => {
            let newItem = new dependencies[this.constructor.name](item);
            str += newItem.render();
        });
        block.innerHTML = str;
    }
}

class Catalog extends List {
    constructor(basket, url = '/goods.json', container = '.products') {
        super(url, container);
        this.basket = basket
    }

    _handleEvents() {
        document.querySelector(this.container).addEventListener('click', event => {
            if (event.target.name === 'buy-btn') {
                this.basket.add(event.target);
            }
        });
    }
}

class Basket extends List {
    constructor(url = '/getBasket.json', container = '.cart-items') {
        super(url, container);
    }

    _handleEvents() {
        document.querySelector(this.container).addEventListener('click', event => {
            if (event.target.name === 'del-btn') {
                this.remove(event.target);
            }
        });

        //Взял свое старое решение
        document.querySelector('.btn-cart').addEventListener('click', () => {
            let cartBlock = document.querySelector('.cart-block')
            switch (cartBlock.style.display === 'none') {
                case true:
                    cartBlock.style.display = 'block';
                    break;
                case false:
                    cartBlock.style.display = 'none';
                    break;
            }
        })
    }

    add(product) {
        let a;
        this.items.find(el => {
            if (el.id_product === product.dataset.id) {
                el.quantity += 1;
                a = true;
            }
        })
        if (a !== true) {
            this.items.push({
                id_product: product.dataset.id,
                price: parseInt(product.dataset.price),
                product_name: product.dataset.name,
                quantity: 1
            })
        }
        this.render();
    }

    remove(product) {
        console.log(product.dataset.id + ' removed')
        let idx = 0;
        this.items.find(el => {
            if (el.id_product === product.dataset.id) {
                idx = this.items.indexOf(el);
            }
        })
        let obj = this.items[idx];
        if (obj.quantity > 1) {
            obj.quantity -= 1
        } else {
            this.items.splice(idx, 1)
        }

        this.render();
    }

    _totalPrice() {
        let a = 0;
        this.items.forEach(el => {
            a += el.price * el.quantity;
        })
        document.getElementById('price').innerText = a;
    }

    render() {
        let block = document.querySelector(this.container);
        let str = '';
        this.items.forEach(item => {
            let newItem = new dependencies[this.constructor.name](item);
            str += newItem.render();
        });
        this._totalPrice();
        block.innerHTML = str;
    }
}

class Item {
    constructor(item) {
        this.item = item
    }

    render() {
        return `
            <div class="product-item">
                <!--<img src="https://placehold.it/300x200" alt="${this.item.product_name}">-->
                <div class="image">
                <img src="${this.item.img}" width="200" alt="${this.item.product_name}"></div>
                <div class="desc">
                    <h1>${this.item.product_name}</h1>
                    <p>${this.item.price}</p>
                    <button
                    class="buy-btn"
                    name="buy-btn"
                    data-name="${this.item.product_name}"
                    data-price="${this.item.price}"
                    data-id="${this.item.id_product}"
                    >Купить</button>
                </div>
            </div>`
    }
}

class CatalogItem extends Item {
}

class BasketItem extends Item {
    render() {
        return `
        <div class="cart-item" data-id="${this.item.id_product}">
            <!--img src="https://placehold.it/100x80" alt=""-->
            <div class="product-desc">
                <p class="product-title">${this.item.product_name}</p>
                <p class="product-quantity">${this.item.quantity}</p>
                <p class="product-single-price">${this.item.price * this.item.quantity}</p>
            </div>
            <div class="right-block">
                <button name="del-btn" class="del-btn" data-id="${this.item.id_product}">&times;</button>
            </div>
        </div>`

    }

}

export default function () {
    let basket = new Basket();
    let catalog = new Catalog(basket);
};

let dependencies = {
    Catalog: CatalogItem,
    Basket: BasketItem,
}




