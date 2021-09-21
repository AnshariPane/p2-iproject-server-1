const router = require("express").Router()
const errorHandlers = require("../middlewares/errorHandlers")
const userRouter = require("../routes/userRouter")

router.use("/", userRouter)
router.use(errorHandlers)

module.exports = router