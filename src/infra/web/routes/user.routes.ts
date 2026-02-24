import { Router } from "express";
import { ContainerFactory } from "../../../di/ContainerFactory";
import { authMiddleware } from "../middlewares/AuthMiddleware";

const router = Router();
const container = ContainerFactory.getContainer();

//===POST===
router.post("/agent/register/", (req, res)=> container.UserController.registerAgent(req, res))
router.post("/supervisor/register/", (req, res)=> container.UserController.registerSupervisor(req, res))
router.post("/adm/register/", (req, res)=> container.UserController.registerAdmin(req, res))

//===GET===
router.get("/", authMiddleware, (req, res)=> container.UserController.findAll(req, res))
router.get("/by-id/:id", authMiddleware, (req, res)=> container.UserController.findById(req, res))
router.get("/by-email/", authMiddleware, (req, res)=>container.UserController.findByEmail(req, res))
router.get("/agent", authMiddleware, (req, res)=>container.UserController.findAllAgents(req, res))
router.get("/supervisor", authMiddleware, (req, res)=>container.UserController.findAllSupervisor(req, res))
router.get("/adm", authMiddleware, (req, res)=>container.UserController.findAllAdmin(req, res))
router.get("/by-registration/:registration", authMiddleware, (req, res)=>container.UserController.findByRegistration(req, res))

//===PATCH===
router.patch("/ban/:id", (req, res)=> container.UserController.banUser(req, res))

export default router