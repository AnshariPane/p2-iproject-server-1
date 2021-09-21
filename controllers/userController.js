const { User } = require("../models");
const { checkPassword } = require("../helpers/bcrypt");
const { generateToken } = require("../helpers/jwt");

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
                id: foundUser.id,
                username: foundUser.username,
                email: foundUser.email,
                access_token,
            });
        } catch (error) {
            next(error);
        }
    }
}

module.exports = UserController;
