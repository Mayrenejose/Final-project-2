import cartsMoldel from '../../models/carts.models.js'

export default class CartManager {

    getAllCarts = async () => {return await cartsMoldel.find()}

    getCartById = async cid => {return await cartsMoldel.findById(cid)}

    addCart = async products => {return await cartsMoldel.create(products)}

    deleteAllProducts = async(idCart) => {return await cartsMoldel.findByIdAndUpdate(idCart, { products: [] }, { new: true }).lean().exec()}

    deleteProduct = async(idCart, cart) => {return await cartsMoldel.updateOne({_id: idCart}, cart)}

    updateProductsInCart = async(idCart, body) => {return await cartsMoldel.updateOne({_id: idCart}, body)}

    updateQuantityInCart = async(idCart, body) => {return await cartsMoldel.updateOne({_id: idCart}, body)}
}