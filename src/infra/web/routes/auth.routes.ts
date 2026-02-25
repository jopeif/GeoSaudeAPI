import { Router } from "express";
import { ContainerFactory } from "../../../di/ContainerFactory";
import { authMiddleware } from "../middlewares/AuthMiddleware";

const router = Router();
const container = ContainerFactory.getContainer();

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Autenticação
 */

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login do usuário
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - login
 *               - password
 *             properties:
 *               login:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login realizado
 *       401:
 *         description: Credenciais inválidas
 *       403:
 *         description: Usuário banido
 *       500:
 *         description: Erro interno
 */
router.post("/login", (req, res)=> container.authController.login(req, res))

/**
 * @swagger
 * /auth/refresh-token:
 *   post:
 *     summary: Atualizar tokens
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - refreshToken
 *             properties:
 *               refreshToken:
 *                 type: string
 *     responses:
 *       200:
 *         description: Tokens renovados
 *       401:
 *         description: Refresh token inválido
 *       403:
 *         description: Usuário banido
 *       404:
 *         description: Usuário não encontrado
 *       500:
 *         description: Erro interno
 */
router.post("/refresh-token", (req, res)=> container.authController.refreshToken(req, res))

/**
 * @swagger
 * /auth/me:
 *   post:
 *     summary: Dados do usuário autenticado
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Usuário autenticado
 *       401:
 *         description: Token inválido
 *       404:
 *         description: Usuário não existe
 *       500:
 *         description: Erro interno
 */
router.post("/me", authMiddleware, (req, res)=>container.authController.me(req, res))

export default router