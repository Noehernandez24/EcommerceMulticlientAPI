const Carts = require("../models/carts.model");
const Users = require("../models/users.model");

class UsersServices{
    static async create(newUser){
        try {
            const result = await Users.create(newUser)
            await Carts.create({userId: result.id})
            return result
        } catch (error) {
            throw error
        }
    }

    static async update(id, userData){
        try {
            const result = await Users.update(userData, {
                where: {id}
            })
            return result
        } catch (error) {
            throw error
        }
    }
}

module.exports = UsersServices