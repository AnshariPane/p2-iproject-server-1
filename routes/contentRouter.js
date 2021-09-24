const router = require("express").Router()
const contentController = require("../controllers/contentController")
const multerMiddleware = require("../middlewares/multer")
const imageKit = require("../middlewares/imageKit")
const authentication = require("../middlewares/authentication")

router.get("/", contentController.showAll)
router.get("/youtubeVideo", contentController.getData)
router.get("/filtered", contentController.filteredContents)
router.get("/:id", contentController.findCharaById)

router.use(authentication)

router.post("/", multerMiddleware, imageKit, contentController.addCharaForAdmin)


module.exports = router