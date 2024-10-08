import { TicketService } from "../../service/index.js"

export const createTicket = async(req, res) => {
    try{
        const bodyGet = req.body
        const idCart = req.params.cid
        await TicketService.createTicket(idCart, bodyGet)
        return res.status(200).json({ message: 'ticket successfully create', data: bodyGet })

    } catch (error) {
        console.log(error);
        res.status(400).send({message: 'error adding ticket'})
    }
}