import express from 'express'
import handlebars from 'express-handlebars'
import session from 'express-session'
import passport from 'passport'
import MongoStore from 'connect-mongo'
import routerProducts from './routes/products/index.js'
import routerCarts from './routes/carts/index.js'
import viewsHandlebars from './routes/views/index.js'
import sessionRouter from './routes/session/index.js'
import initialize from './config/index.js'
import __dirname from './utils.js'
import config from './config/config.js'
import { Server } from 'socket.io'

const PORT = config.port 
const url = config.mongoURL
const mongoDB = config.mongoDBName

const app = express()
app.use(express.json())
app.use(express.urlencoded({extended: true}))
const httpServer = app.listen(PORT, () => { console.log(`server listened on port ${PORT}`) })
const io = new Server(httpServer)

//sessions
app.use(session({
    store: MongoStore.create({
        mongoUrl: url,
        dbName: mongoDB
    }),
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}))

initialize()
    app.use(passport.initialize())
    app.use(passport.session())

//setting handlebars
app.engine('handlebars', handlebars.engine())
app.set('views', __dirname + '/views')
app.set('view engine', 'handlebars')

//routes
app.use(express.static(__dirname + '/public'))
app.use('/api/products', routerProducts)
app.use('/api/carts', routerCarts)
app.use('/', viewsHandlebars)
app.use('/session', sessionRouter)    

//sockets
io.on('connection', socket => {
    console.log('new user')
})

export { io }