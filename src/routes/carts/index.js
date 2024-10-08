import { Router } from 'express'
import {
    getAllCarts,
    getCartById,
    addCart,
    addProductToCart,
    deleteAllProducts,
    deleteProduct,
    updateProductsInCart,
    updateQuantityInCart
} from '../../controllers/cart/index.js'
import { createTicket } from '../../controllers/ticket/index.js'
import passport from 'passport'
import authorizationSystem from '../../middleware/authorizationSystem/index.js'

const router = Router()

router.get('/', passport.authenticate('jwt', {session: false}), getAllCarts)
router.get('/:cid', passport.authenticate('jwt', {session: false}), getCartById) 
router.post('/:cid/purchase', passport.authenticate('jwt', {session: false}), createTicket)
router.post('/',passport.authenticate('jwt', {session: false}), addCart) 
router.post('/:cid/product/:pid', passport.authenticate('jwt', {session: false}), authorizationSystem('user'), addProductToCart) 
router.delete('/:cid', passport.authenticate('jwt', {session: false}), deleteAllProducts)
router.delete('/:cid/product/:pid', passport.authenticate('jwt', {session: false}), authorizationSystem('user'), deleteProduct)
router.put('/:cid', passport.authenticate('jwt', {session: false}), updateProductsInCart)
router.put('/:cid/product/:pid', passport.authenticate('jwt', {session: false}), authorizationSystem('user'), updateQuantityInCart)

export default router