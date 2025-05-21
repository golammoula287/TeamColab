import express from "express"
import userRoutes from "./userRoutes.js"
import taskRoutes from "./taskRoutes.js"
import prospectRouter from "./prospectRouter.js"
import projectRouter from "./projectRouter.js"
import clientRouter from "./clientRouter.js"


const router = express.Router()

router.use("/user", userRoutes) //api/user/login
router.use("/task", taskRoutes)
router.use("/prospect", prospectRouter)
router.use("/project", projectRouter)
router.use("/client" , clientRouter)


export default router