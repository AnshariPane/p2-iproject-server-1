const router = require("express").Router()
const errorHandlers = require("../middlewares/errorHandlers")
const userRouter = require("../routes/userRouter")
const contentRouter = require("../routes/contentRouter")

router.use("/", userRouter)
router.use("/characters", contentRouter)
router.use(errorHandlers)

module.exports = router