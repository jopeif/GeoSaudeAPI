// src/infra/http/middlewares/authMiddleware.ts
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { JwtPayload } from "../auth/JwtPayload";

export function authMiddleware(
    req: Request,
    res: Response,
    next: NextFunction
) {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ message: "Token was not provided" });
    }

    const [scheme, token] = authHeader.split(" ");

    if (scheme !== "Bearer" || !token) {
        return res.status(401).json({ message: "Malformed token" });
    }

    try {
        const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET as string
        ) as JwtPayload;
        
        req.user = decoded;
        next();
    } catch {
        return res.status(401).json({ message: "Token is invalid or expired" });
    }
}