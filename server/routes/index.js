import express from "express"
import userRoutes from "./userRoutes.js"
import taskRoutes from "./taskRoutes.js"
import prospectRouter from "./prospectRouter.js"


const router = express.Router()

router.use("/user", userRoutes) //api/user/login
router.use("/task", taskRoutes)
router.use("/prospect", prospectRouter)



export default router