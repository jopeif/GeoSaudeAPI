import { Router } from "express";
import { ContainerFactory } from "../../../di/ContainerFactory";
import { authMiddleware } from "../middlewares/AuthMiddleware";

const router = Router();
const container = ContainerFactory.getContainer();

router.post("/login/", (req, res)=> container.authController.login(req, res))
router.post("/refresh-token", (req, res)=> container.authController.refreshToken(req, res))
router.post("/me", authMiddleware, (req, res)=>container.authController.me(req, res))

export default router