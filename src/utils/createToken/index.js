import jwt from 'jsonwebtoken'
import config from '../../config/config'

const SECRET_JWT = config.secretKey

export const generateToken = (user) => {
    const token = jwt.sign({ user }, SECRET_JWT, { expiresIn: '72h' })  
    return token
}