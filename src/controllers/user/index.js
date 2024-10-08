import { UserService } from "../../service/index.js"
import { createHash } from '../../utils/validationHash/index.js'
import  UserInsertDTO  from '../../dto/user/index.js'
import jwt from 'jsonwebtoken';
import config from '../../config/config.js'

const SECRET_JWT = config.secretKey

export const getCurrent = async (req, res) => {
    try {
        const userData = new UserInsertDTO(req.user)
        
        res.status(200).json({ data:userData })
        
    } catch (error) {
        res.status(500).send('Error server')

    }
}

export const getUsers = async(req, res) => {
    try {
        const allUsers = await UserService.getUsers()
        
        res.status(200).json({data: allUsers})
    } catch(error) { 
        res.status(500).send('Error server')
    }
}

export const addRegister =  async(req, res) => {
    try {         
        const body = req.body 
        body.password = createHash(body.password)        
        const result = await UserService.addRegister(body)
        
        if (!result) return res.status(400).send('Error registering user')
        
        return res.redirect('/login')
    } catch(error) {        
        res.status(500).send(`Error registering user: ${error.message}`)
    }
}

export const addLogin = async (req, res) => {
    if (!req.user) return res.status(400).send('Invalid Credentiasls')
    const token = jwt.sign({user: req.user }, SECRET_JWT, { expiresIn: '24h' });
   
    res.json({token})           
    //return res.redirect('/products')
}

export const loginGithub = function(req, res) {
    if (!req.user) {
        console.error('Authentication failed.')
        return res.redirect('/')
    }
    return res.redirect('/products')
}

export const logout = (req, res) => {
    req.session.destroy(err => {
        if(err) return res.send('error')

        return res.redirect('/')
    })
}