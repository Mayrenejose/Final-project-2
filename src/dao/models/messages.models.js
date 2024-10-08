import mongoose from 'mongoose'

const messagesCollection = 'messages'

const messagesSchema = new mongoose.Schema({
    message: {
        type: [String],
        default: []
    },
    email: {
        type: String,
        required: true,
        unique: true
    }
})

const messageModel = mongoose.model(messagesCollection, messagesSchema)

export default messageModel
