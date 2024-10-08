import passport from "passport"
import local from 'passport-local'
import GitHubStrategy from 'passport-github2'
import passportJWT from 'passport-jwt'
import UserModel from '../dao/models/user.models.js'
import { createHash, isValidPassword } from '../utils/validationHash/index.js'
import config from "./config.js"

const LocalStrategy = local.Strategy
const JWTStrategy = passportJWT.Strategy
const ExtractJwt = passportJWT.ExtractJwt;

const initialize = () => {

    passport.use('github', new GitHubStrategy({
        clientID: config.clientId,
        clientSecret: config.clientSecretToken,
        callbackURL: config.urlCallback
    }, async (accessToken, refreshToken, profile, done) => {
        try {
            const user = await UserModel.findOne({ email: profile._json.email })
            if(user) {
                return done(null, user)
            }

            const newUser = await UserModel.create({
                first_name: profile._json.name, 
                last_name: '',
                email: profile._json.email,
                password: '',
                age: 0
            })

            return done(null, newUser)

        } catch (error) {
            return done('Error to login with github ' + error)
        }
    }))    

    passport.use('register', new LocalStrategy({
        passReqToCallback: true,
        usernameField: 'email'
    }, async (req, username, password, done) => {
        const { 
            email, 
            first_name,
            last_name, 
            age
        } = req.body 
        
        try {
        const user = await UserModel.findOne({ email: username })

        if(user) {
            return done(null, false, { message: 'user ready' })
        }

        const newUser = await UserModel.create({
            first_name,
            email,
            last_name,
            age,
            password: createHash(password)
        })

        const userNew = await UserModel.create(newUser)
        done(null, userNew)

        } catch(error) {
            done(error)
        }
    }))

    passport.use('login', new LocalStrategy({
        usernameField: 'email'
    }, async(username, password, done) => {
        try {
            const user = await UserModel.findOne({ email: username}).lean().exec()
            if(!user) {   
                console.error('user invalid')             
                return done(null, false)
            }
            
            if(!isValidPassword(user, password)) {
                console.error('password invalid')
                return done(null, false)
            }
            return done(null, user)

        } catch (error) {
            done(error)
        }
    }))

    const jwtOptions = {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: config.secretKey
    }
 
    passport.use(
        new JWTStrategy(jwtOptions, async(jwtPayload, done) => {

        const user = await UserModel.findById(jwtPayload.user._id)
    
        if (user) {
            return done(null, user)
        }
    
        return done(null, false)
        })
    )
    
    passport.serializeUser((user, done) => {
        done(null, user._id)
    })

    passport.deserializeUser(async (id, done) => {
        const user = await UserModel.findById(id)
        done(null, user)
    })
}

export default initialize