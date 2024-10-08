import { ProductService } from '../../service/index.js'

export default class CartRepository {
    constructor(dao) {
        this.dao = dao
    }

    getAllCarts = async () => {return this.dao.getAllCarts()}

    getCartById = async cid => {return this.dao.getCartById(cid)}

    addCart = async products => {return this.dao.addCart(products)}

    addProductToCart = async(idCart, idProduct) => {
        try {
            const cart = await this.getCartById(idCart)
            const product = await ProductService.getProductById(idProduct)
            const searchIdCart = cart._id == idCart ? true : false
            
            const searchIdProduct = cart.products.find(
                (item) => item.product._id == idProduct
            )    

            if ( product.length === 0 ) throw new Error('the product does not exist')
            if ( !searchIdCart ) throw new Error('the car does not exist')
            
            if ( !searchIdProduct ) {
                const newProductToCart = {
                    product: idProduct,
                    quantity: 1
                }
                cart.products.push(newProductToCart)
            } else {
                searchIdProduct.quantity++
            }

            await cart.save()
            return cart

        } catch (error) {
            console.log(error, 'The product was not added to the cart')
            throw new Error('error')
        }
    }
    
    deleteAllProducts = async(idCart) => {return this.dao.deleteAllProducts(idCart)}

    deleteProduct = async(idCart, idProduct) => {
        const cart = await this.getCartById(idCart)
        const newCart = cart.products.filter(item => item.product._id != idProduct)
        cart.products = newCart

        return this.dao.deleteProduct(idCart, cart)
    }
        
    updateProductsInCart = async(idCart, body) => {
        const cart = await this.getCartById(idCart)
        cart.products = body
        
        return this.dao.updateProductsInCart(idCart, body)
    }

    updateQuantityInCart = async(idCart, body) => {
        const cart = await this.getCartById(idCart)
        cart.quantity = body

        return this.dao.updateQuantityInCart(idCart, body)
    }
}