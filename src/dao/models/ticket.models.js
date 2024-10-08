import mongoose from 'mongoose'

const ticketCollection = 'ticket'

const ticketSchema = new mongoose.Schema({
    code: {
        type: String,
        required: true,
        unique: true
    },
    //timestamps: true,
    // purchase_datetime: {
    //     timestamps: true
    // },
    purchase_datetime: String,
    amount: Number,
    purchaser: {
        type: String
        //type:  mongoose.Schema.Types.email,
        //ref: 'users'
    }
})

const ticketModel = mongoose.model(ticketCollection, ticketSchema)

export default ticketModel