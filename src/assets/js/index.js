class Cart {
    constructor() {
        this.cart = [];
        this.items = items = [{
            id: 1,
            name: 'Dove Soap',
            price: 39.99
        }, {
            id: 2,
            name: 'Axe Deo',
            price: 99.99
        }];
    }


    getItems() {
        return this.items;
    }


}

console.log(Cart);

export { Cart };

let a = 5;
let b = 5;

let res = a + b;

console.log(res);