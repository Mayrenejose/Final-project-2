import { CartService } from '../../service/index.js'

export const getAllCarts = async(req, res) => {
    try{
        const allDataCarts = await CartService.getAllCarts()
        res.status(200).json({data: allDataCarts})
    } catch (error) {
        res.status(400).send({message: 'error getting carts'})
    }
}

export const getCartById = async(req, res) => {
    try{
        const { cid } = req.params
        const cartById = await CartService.getCartById(cid)
        res.json({data: cartById})
    } catch (error) {
        res.status(400).send({message: 'error getting carts'})
    }
}

export const addCart = async(req, res) => {
    try {
        const bodyGet = req.body
        await CartService.addCart(bodyGet)
        return res.status(200).json({ message: 'cart successfully added' })

    } catch(error) {
        res.status(400).send({error: 'error adding cart'})
    }
}

export const addProductToCart = async(req, res) => {
    try {
        const idCart = req.params.cid
        const idProduct = req.params.pid
        await CartService.addProductToCart(idCart, idProduct)
        
        return res.status(200).json({ message: 'product successfully added' })

    } catch(error) {
        res.status(400).send({error: 'error adding product'})
    }
}

export const deleteAllProducts = async(req, res) => {
    try{
        const { cid } = req.params
        const deleteCartById = await CartService.deleteAllProducts(cid)

        if ( !deleteCartById ) {
            res.status(400).send({message: 'error deleting carts'})
        }
        res.json({data: deleteCartById})
    } catch (error) {
        res.status(500).send({message: 'error server'})
    }
}

export const deleteProduct = async(req, res) => {
    try{
        const { cid } = req.params
        const { pid } = req.params
        const deleteProductById = await CartService.deleteProduct(cid, pid)

        if ( deleteProductById.modifiedCount === 0 ) {
            res.status(400).send({message: 'error deleting product'})
        }
        
        res.json({message: 'product successfully removed'})
    } catch (error) {
        res.status(500).send({message: 'error server'})
    }
}

export const updateProductsInCart =  async(req, res) => {
    try{
        const { cid } = req.params
        const cartUpdate = req.body
        const updateProducts = await CartService.updateProductsInCart (cid, cartUpdate)
        
        if ( updateProducts.modifiedCount === 0 ) {
            res.status(400).send({message: 'error updating carts'})
        }
        res.json({message: 'cart successfully updated'})
    } catch (error) {
        res.status(500).send({message: 'error server'})
    }
}

export const updateQuantityInCart = async(req, res) => {
    try{
        const { cid } = req.params
        const { pid } = req.params
        const quantityUpdate = req.body
        const updateQuantity = await CartService.updateQuantityInCart(cid, pid, quantityUpdate)
        
        if ( updateQuantity.modifiedCount === 0 ) {
            res.status(400).send({message: 'error updating quantity in carts'})
        }
        res.json({message: 'quantity in cart successfully updated'})
    } catch (error) {
        res.status(500).send({message: 'error server'})
    }
}