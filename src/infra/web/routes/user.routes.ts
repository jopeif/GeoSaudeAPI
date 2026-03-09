import { Router } from "express";
import { ContainerFactory } from "../../../di/ContainerFactory";
import { authMiddleware } from "../middlewares/AuthMiddleware";

const router = Router();
const container = ContainerFactory.getContainer();


/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Gerenciamento de usuários
 */

/**
 * @swagger
 * /user/agent/register:
 *   post:
 *     summary: Registrar agente
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *               - phoneNumber
 *               - block
 *               - registration
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               phoneNumber:
 *                 type: string
 *               block:
 *                 type: string
 *               registration:
 *                 type: string
 *     responses:
 *       201:
 *         description: Agente criado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 id:
 *                   type: string
 *       400:
 *         description: Email ou matrícula já em uso
 *       500:
 *         description: Erro interno do servidor
 */
router.post("/agent/register/", (req, res)=> container.UserController.registerAgent(req, res))

/**
 * @swagger
 * /user/supervisor/register:
 *   post:
 *     summary: Registrar supervisor
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *               - phoneNumber
 *               - registration
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               phoneNumber:
 *                 type: string
 *               registration:
 *                 type: string
 *     responses:
 *       201:
 *         description: Supervisor criado
 *       400:
 *         description: Email ou matrícula já em uso
 *       500:
 *         description: Erro interno do servidor
 */
router.post("/supervisor/register/", (req, res)=> container.UserController.registerSupervisor(req, res))

/**
 * @swagger
 * /user/adm/register:
 *   post:
 *     summary: Registrar administrador
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *               - phoneNumber
 *               - accessLevel
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               phoneNumber:
 *                 type: string
 *               accessLevel:
 *                 type: number
 *     responses:
 *       201:
 *         description: Administrador criado
 *       400:
 *         description: Email já em uso
 *       500:
 *         description: Erro interno do servidor
 */
router.post("/adm/register/", (req, res)=> container.UserController.registerAdmin(req, res))

//===GET===

/**
 * @swagger
 * /user:
 *   get:
 *     summary: Buscar todos os usuários
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de usuários
 *       401:
 *         description: Token inválido ou ausente
 *       500:
 *         description: Erro interno
 */
router.get("/", authMiddleware, (req, res)=> container.UserController.findAll(req, res))

/**
 * @swagger
 * /user/by-id/{id}:
 *   get:
 *     summary: Buscar usuário por ID
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Usuário encontrado
 *       401:
 *         description: Token inválido
 *       500:
 *         description: Erro interno
 */
router.get("/by-id/:id", authMiddleware, (req, res)=> container.UserController.findById(req, res))

/**
 * @openapi
 * /user/by-email:
 *   get:
 *     summary: Buscar usuário por email
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: email
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Usuário encontrado
 *       404:
 *         description: Usuário não existe
 *       401:
 *         description: Token inválido
 */
router.get("/by-email/", authMiddleware, (req, res)=>container.UserController.findByEmail(req, res))

/**
 * @swagger
 * /user:
 *   get:
 *     summary: Buscar todos os usuários
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de usuários
 *       401:
 *         description: Token inválido ou ausente
 *       500:
 *         description: Erro interno
 */
router.get("/agent", authMiddleware, (req, res)=>container.UserController.findAllAgents(req, res))
router.get("/supervisor", authMiddleware, (req, res)=>container.UserController.findAllSupervisor(req, res))
router.get("/adm", authMiddleware, (req, res)=>container.UserController.findAllAdmin(req, res))
router.get("/by-registration/:registration", authMiddleware, (req, res)=>container.UserController.findByRegistration(req, res))



//===PATCH===
router.patch("/ban/:id", (req, res)=> container.UserController.banUser(req, res))

export default router