export default class CartsInsertDTO {
    constructor(product = []) {
        this.products = product.products ?? []
    }
}