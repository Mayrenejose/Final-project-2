import { Router } from 'express'
import { ProductService } from '../../service/index.js'
import passport from 'passport'

const router = Router()

router.get('/', async(req, res) => {
    try { 
        return res.redirect('/login')

    } catch (error) {
        res.status(500).send({error :'error'})
    }
})

router.get('/register', async(req, res) => {
    try {        
        res.render('register', {
            style: 'index.css',
            title: 'Registro'
        })

    } catch (error) {
        res.status(500).send({error :'error'})
    }
})

router.get('/login', async(req, res) => {
    try {      
        res.render('login', {
            style: 'index.css',
            title: 'Login'
        })

    } catch (error) {
        res.status(500).send({error :'error'})
    }
})

router.get('/products', passport.authenticate('jwt', {session: false}), async(req, res) => {
    try {
        const user = req.user
        const limit = parseInt(req.query?.limit ?? 10)
        const page = parseInt(req.query?.page ?? 1)
        const query = req.query?.query ?? ''
        const sort = req.query?.sort
        const category = req.query.category ?? ''
        const previousPage = req.get('Referer')
        const currentUrl = `${req.protocol}://${req.get('host')}`        
       
        const dataProducts = await ProductService.getAllProducts(
            limit, 
            page,
            query,
            previousPage,
            currentUrl,
            sort,
            category
        )

        res.render('products', {
            dataProducts,
            user,
            style: 'index.css',
            title: 'All products'
        })

    } catch (error) {
        res.status(500).send({status:'error'})
    }
})

router.get('/product/:_id', passport.authenticate('jwt', {session: false}), async(req, res) => {
    try {   
        const idProduct = req.params?._id
        const infoProduct = await ProductService.getProductById(idProduct)
        const titleProduct = infoProduct.title
        const image = infoProduct.thumbnails
        const description = infoProduct.description
        const priceProduct = infoProduct.price
        const categoryProduct = infoProduct.category
        const stockProduct = infoProduct.stock
        
        res.render('product', {
            titleProduct,
            image,
            description,
            priceProduct,
            categoryProduct,
            stockProduct,
            style: 'index.css',
            title: 'All products'
        })

    } catch (error) {
        res.status(500).send({status:'error'})
    }
})

router.get('/:site', passport.authenticate('jwt', {session: false}), async(req, res) => {
    try {
        const params = req.params?.site
        const limit = parseInt(req.query?.limit ?? 2)
        const page = parseInt(req.query?.page ?? 1)
        const query = req.query?.query ?? ''
        const renderParameter = params === 'home' ? 'home' : 'realTimeProducts'
        const dataProducts = await ProductService.getAllProducts(
            limit, 
            page,
            query,
        )
        
        res.render(renderParameter, {
            dataProducts,
            style: 'index.css',
            title: 'All products'
        })

    } catch (error) {
        res.status(500).send({error :'error getting products'})
    }
})

export default router