import { Router } from 'express'
import {
    getAllProducts,
    getProductById,
    addProduct,
    updateProduct,
    deleteProduct
} from '../../controllers/product/index.js'
import passport from 'passport'
import authorizationSystem from '../../middleware/authorizationSystem/index.js'

const router = Router()

router.get('/', passport.authenticate('jwt', {session: false}), getAllProducts)
router.get('/:pid', passport.authenticate('jwt', {session: false}), getProductById) 
router.post('/', passport.authenticate('jwt', {session: false}), authorizationSystem('admin'),  addProduct) 
router.put('/:pid', passport.authenticate('jwt', {session: false}), authorizationSystem('admin'),  updateProduct)
router.delete('/:pid', passport.authenticate('jwt', {session: false}), authorizationSystem('admin'), deleteProduct)  

export default router