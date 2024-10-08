import { 
    Cart, 
    Products,
    User,
    Ticket 
} from '../dao/factory.js' 

import CartRepository from './cart/index.js'
import ProductRepository from './product/index.js'
import UserRepository from './user/index.js'
import TicketRepository from './ticket/index.js'

export const CartService = new CartRepository(new Cart())
export const ProductService = new ProductRepository(new Products())
export const UserService = new UserRepository(new User())
export const TicketService = new TicketRepository(new Ticket())