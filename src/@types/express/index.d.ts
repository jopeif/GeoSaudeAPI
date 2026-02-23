// src/@types/express/index.d.ts
import { JwtPayload } from "../../infra/web/auth/JwtPayload"

declare global {
    namespace Express {
        interface Request {
        user?: JwtPayload;
        }
    }
}