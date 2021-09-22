const { Character } = require("../models");
const { google } = require("googleapis");

class ContentController {
    static async addCharaForAdmin(req, res, next) {
        console.log(req.body.imageUrl);
        const data = {
            name: req.body.name,
            about: req.body.about,
            fanbaseName: req.body.fanbaseName,
            illustrator: req.body.illustrator,
            imageUrl: req.body.imageUrl,
        };
        try {
            const newData = await Character.create(data);
            res.status(201).json(newData);
        } catch (error) {
            next(error);
        }
    }

    static async showAll(req, res, next) {
        try {
            const charaData = await Character.findAll({
                attributes: {
                    exclude: ["createdAt", "updatedAt"],
                    include: ["Generation"],
                },
                order: [["id", "ASC"]],
            });
            res.status(200).json(charaData);
        } catch (error) {
            next(error);
        }
    }

    static async findCharaById(req, res, next) {
        const { id } = req.params;
        try {
            const foundChara = await Character.findByPk(id, {
                attributes: {
                    exclude: ["createdAt", "updatedAt"],
                },
            });
            if (!foundChara) {
                throw { name: "not found" };
            }
            res.status(200).json(foundChara);
        } catch (error) {
            next(error);
        }
    }

    static async getData(req, res, next) {
        try {
            const response = await google.youtube("v3").search.list({
                key: process.env.GOOGLEAPI,
                q: req.query.name,
                part: "snippet",
            });
            res.status(200).json(response.data.items);
        } catch (error) {
            console.log(error,"````````")
            next(error);
        }
    }
}

module.exports = ContentController;
