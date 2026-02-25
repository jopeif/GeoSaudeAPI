/**
 * @openapi
 * components:
 *   schemas:
 *
 *     LoginRequest:
 *       type: object
 *       required:
 *         - login
 *         - password
 *       properties:
 *         login:
 *           type: string
 *           description: Email ou matrícula do usuário
 *           example: joao.silva@email.com
 *         password:
 *           type: string
 *           example: Password123
 *
 *     RefreshTokenRequest:
 *       type: object
 *       required:
 *         - refreshToken
 *       properties:
 *         refreshToken:
 *           type: string
 *           example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *
 *     AuthUserPayload:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           example: 8f3a2c1e-91c4-4d0b-9a42-3a2d9e8a1b21
 *         access_token:
 *           type: string
 *           description: JWT de acesso
 *         refresh_token:
 *           type: string
 *           description: JWT de refresh
 *         role:
 *           type: string
 *           enum: [AGENT, SUPERVISOR, ADM]
 *
 *     AuthSuccessResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: true
 *         user:
 *           $ref: '#/components/schemas/AuthUserPayload'
 *
 *     InvalidCredentialsError:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: false
 *         message:
 *           type: string
 *           example: Invalid Credentials.
 *
 *     UserBannedError:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: false
 *         message:
 *           type: string
 *           example: User is banned.
 *
 *     RefreshTokenInvalidError:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: false
 *         message:
 *           type: string
 *           example: Refresh Token is not valid.
 *
 *     UserNotFoundError:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: false
 *         message:
 *           type: string
 *           example: User with the given Refresh Token does not exist.
 *
 *     InternalServerError:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: false
 *         message:
 *           type: string
 *           example: Internal server error
 */