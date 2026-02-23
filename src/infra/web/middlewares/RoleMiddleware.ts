// src/infra/http/middlewares/roleMiddleware.ts
import { Request, Response, NextFunction } from "express";
import { RoleEnum } from "../../../domain/entities/users/RoleEnum";
import { User } from "../../../domain/entities/users/User";

export function roleMiddleware(allowedRoles: RoleEnum[]) {
    return (req: Request, res: Response, next: NextFunction) => {
        if (!req.user) {
        return res.status(401).json({ message: "Usuário não autenticado" });
        }

        const { role } = req.user;

        const roleEnum  = User.roleEnumParse(role)
        
        if (!allowedRoles.includes(roleEnum)) {
        return res.status(403).json({ message: "Acesso negado" });
        }

        next();
    };
}