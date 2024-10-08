import mongoose from 'mongoose'

const usersCollection = 'users'

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    first_name: {
        type: String,
        required: true,        
        trim: true
    },
    last_name: {
        type: String,
        required: true,        
        trim: true
    },
    age: String,
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['admin', 'user'],
        default: 'user'
    }
})

const usersModel = mongoose.model(usersCollection, userSchema)

export default usersModel