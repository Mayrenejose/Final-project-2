export default class UserRepository {
    constructor(dao) {
        this.dao = dao
    }
    getUsers = async() => {return this.dao.getUsers()}

    addRegister = async body => {return this.dao.addRegister(body)}
} 