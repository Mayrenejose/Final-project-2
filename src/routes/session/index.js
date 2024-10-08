import { Router } from 'express'
import {
    getCurrent,
    getUsers,
    addRegister,
    addLogin,
    loginGithub,
    logout
} from '../../controllers/user/index.js'
import passport from 'passport'

const router = Router()

router.get('/users', getUsers) 
router.post('/register', addRegister)
router.get('/github', passport.authenticate('github', { scope: [ 'user:email' ] }))
router.get('/github/callback', passport.authenticate('github', { failureRedirect: '/login' }), loginGithub)
router.post('/login', passport.authenticate('login', {session: false}), addLogin)
router.get('/logout', logout)
router.get('/current', passport.authenticate('jwt', {session: false}), getCurrent)

export default router