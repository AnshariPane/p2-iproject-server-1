const { User } = require("../models");
const { checkPassword } = require("../helpers/bcrypt");
const { generateToken } = require("../helpers/jwt");
const { OAuth2Client } = require("google-auth-library")
const client = new OAuth2Client(process.env.GOOGLECLIENTID)


class UserController {
    static async register(req, res, next) {
        try {
            const { username, email, password } = req.body;
            const payload = {
                username,
                email,
                password,
            };
            const newUser = await User.create(payload);
            res.status(201).json({ id: newUser.id, email: newUser.email });
        } catch (error) {
            next(error);
        }
    }

    static async login(req, res, next) {
        const { username, password } = req.body;
        try {
            const foundUser = await User.findOne({
                where: { username },
            });
            if (!foundUser) {
                throw { name: "Invalid login" };
            }
            if (!checkPassword(password, foundUser.password)) {
                throw { name: "Invalid login" };
            }
            const access_token = generateToken({
                id: foundUser.id,
                email: foundUser.email,
            });
            res.status(200).json({
                username: foundUser.username,
                email: foundUser.email,
                access_token,
            });
        } catch (error) {
            next(error);
        }
    }

    static async googleLogin(req, res, next) {
        try {
            const ticket = await client.verifyIdToken({
                idToken :  req.body.idToken,
                audience : process.env.GOOGLECLIENTID
            })
            const payload = ticket.getPayload()
            const userPayload = await User.findOrCreate({
                where : {email : payload.email},
                defaults : {
                    username : payload.name,
                    email : payload.email,
                    password : payload.email,
                }
            })
            if (userPayload) {
                const user = userPayload[0].dataValues
                const access_token = generateToken({
                    id : user.id,
                    email : user.email,
                    username: user.name
                })
                res.status(200).json({id: user.id, email: user.email, access_token})
            }
        } catch (error) {
            next(error)
        }
    }
}

module.exports = UserController;
