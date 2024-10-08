export default class TicketRepository {
    constructor(dao) {
        this.dao = dao
    }

    createTicket = async (id, body) => {return this.dao.createTicket(id, body)}
} 