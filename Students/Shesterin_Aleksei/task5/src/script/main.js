'use strict';

let app = new Vue({
    el: '#app',
    data: {
        url: 'https://raw.githubusercontent.com/xenophorus/static/master/goods.json',
        data: [],
        cartItems: [],
        hideCart: false,
    },
    methods: {
        addToCart: function (d) {
            let a;
            this.cartItems.find(el => {
                if (el.id_product === d.id_product) {
                    el.quantity += 1;
                    a = true;
                }
            })
            if (a !== true) {
                this.cartItems.push({
                    id_product: d.id_product,
                    price: d.price,
                    product_name: d.product_name,
                    quantity: 1
                })
            }
        },
        removeCartItem(c) {
            let idx = 0;
            this.cartItems.find(el => {
                if (el.id_product === c.id_product) {
                    idx = this.cartItems.indexOf(el);
                }
            })
            if (c.quantity > 1) {
                c.quantity -= 1
            } else {
                this.cartItems.splice(idx, 1)
            }
        },

    },
    computed: {
        image() {
            return this.data[this.data.id].img
        },
        totalQuantity() {
            let sum = 0;
            this.cartItems.forEach(el => {
                sum += el.quantity
            })
            return sum;
        },
        totalPrice() {
            let sum = 0;
            this.cartItems.forEach(el => {
                sum += el.quantity * parseInt(el.price)
            })
            return sum;
        },
    },
    async mounted() {
        try {
            this.data = await fetch(this.url).then(d => d.json());
        } catch (e) {
            console.log(`Error loading data, ${e}`);
        } finally {
            console.log(this.data)
        }
    },

})
