const multer = require("multer")

const storage = multer.memoryStorage()
const upload = multer({ storage })

const multerMiddleware = upload.single("images")

module.exports = multerMiddleware