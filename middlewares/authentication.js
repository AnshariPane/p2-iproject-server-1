const { verifyToken } = require("../helpers/jwt")
const { User } = require("../models")

const authentication = async (req, res, next) => {
    try {
        const {access_token} = req.headers
        const payload = verifyToken(access_token)
        const userData = await User.findByPk(payload.id)

        if (!userData) {
            next({
                code : 401,
                name : "Unauthorized"
            })
        } else {
            req.user = {
                id : userData.id,
                username : userData.username,
                email : userData.email,
            }
            next()
        }
    } catch (error) {
        next({
            code : 401,
            name : "Unauthorized"
        })
    }
}

module.exports = authentication