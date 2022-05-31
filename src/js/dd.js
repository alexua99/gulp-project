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

export { Cart };