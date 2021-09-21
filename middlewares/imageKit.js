const axios = require("axios")
const FormData = require("form-data")

async function imageKit(req, res, next) {
    try {
        const form = new FormData()
        const fileEncoded = req.file.buffer.toString("base64")
        form.append("file", fileEncoded)
        let fileFormat = req.file.originalname.substring(req.file.originalname.lastIndexOf(".") + 1).toLowerCase()
        if (fileFormat === "jpg" || fileFormat === "png" || fileFormat === "jpeg" || fileFormat === "webp") {
            if (req.file.size > 2097152) {
                throw ({ name : "file size exceeded maximum size limit"})
            }
        } else {
            throw ({name : "invalid file format"})
        }
        form.append("fileName", req.file.originalname)
        const privateKey = Buffer.from(process.env.PRIVATEKEY + ":").toString("base64")
        const upload = await axios.post(
            "https://upload.imagekit.io/api/v1/files/upload",
            form,
            {
                headers: {
                    ...form.getHeaders(),
                    Authorization: `Basic ${privateKey}`
                }
            }
        )
        req.body.imageUrl = upload.data.url
        next()
    } catch (error) {
        console.log(error, "??????????");
        next(error)
    }
}

module.exports = imageKit