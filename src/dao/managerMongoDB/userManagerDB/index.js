import usersModel from '../../models/user.models.js'

export default class UserManager {
    getUsers = async() => {return await usersModel.find().lean().exec()}

    addRegister = async body => {return await usersModel.create(body)}
}