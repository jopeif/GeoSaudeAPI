import { Router } from "express";
import { ContainerFactory } from "../../../di/ContainerFactory";
import { authMiddleware } from "../middlewares/AuthMiddleware";

const router = Router();
const container = ContainerFactory.getContainer();



router.post("/create", authMiddleware, (req, res)=> container.visitFormController.createNewVisit(req, res))

router.delete("/delete/by-id/:id", authMiddleware, (req, res)=> container.visitFormController.deleteVisit(req, res))


router.get("/by-id/:id", (req, res)=>container.visitFormController.findById(req, res))
router.get("/by-user/:userId", (req, res)=>container.visitFormController.findByUserId(req, res))
router.get("/by-zipcode/:zipCode", (req, res)=>container.visitFormController.findByZipCode(req, res))
router.get("/on-date/", (req, res)=>container.visitFormController.findOnDate(req, res))

export default router