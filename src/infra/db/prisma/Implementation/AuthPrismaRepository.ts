import { RefreshToken } from "../../../../domain/entities/auth/RefreshToken";
import { User } from "../../../../domain/entities/users/User";
import { AuthRepository } from "../../../../domain/repo/AuthRepository";
import { prisma } from "../Prisma";
import { RefreshTokenMapper } from "./mappers/RefreshTokenMapper";
import { UserMapper } from "./mappers/UserMapper";


export class prismaAuthRepository implements AuthRepository{
    async createRefreshToken(token: RefreshToken): Promise<void> {
        try {
            await prisma.refreshToken.create({
                data:token.toPersistance()
            })
        } catch (error) {
            throw error
        }
    }
    async revokeTokenById(id: string): Promise<void> {
        try {
            await prisma.refreshToken.updateMany({
                where: {
                    id
                },
                data: {
                    revoked: true,
                },
            })
        } catch (error) {
            throw error
        }
    }

    async deleteTokensByUserId(userId:string): Promise<void>{
        try {
            await prisma.refreshToken.deleteMany({
                where:{
                    userId
                }
            })
        } catch (error) {
            throw error
        }
    }
    
    findTokenById(id: string): Promise<RefreshToken | null> {
        throw new Error("Method not implemented.");
    }
    async findTokenByToken(token: string): Promise<RefreshToken | null> {
        try {
            const result = await prisma.refreshToken.findFirst({
                where:{token}
            })

            if(result){
                return RefreshTokenMapper.toDomain(result)
            }else{
                return null
            }
        } catch (error) {
            throw error
        }
    }
    findTokensByUserId(token: string): Promise<RefreshToken[] | null> {
        throw new Error("Method not implemented.");
    }
    async findById(id: string): Promise<User<any> | null> {
        try {
            const user = await prisma.user.findFirst({
                where: {
                    id,
                },
            })
            return user ? UserMapper.toDomain(user) : null
        } catch (error) {
            throw error
        }
    }

    async findByEmail(email: string): Promise<User<any> | null> {
        try {
            const user = await prisma.user.findFirst({
                where: {
                    email,
                },
            })
            return user ? UserMapper.toDomain(user) : null
        } catch (error) {
            throw error
        }
    }

    async findByRegistration(registration: string): Promise<User<any> | null> {
        try {
            const user = await prisma.user.findFirst({
                where: {
                    registration,
                },
            })
            return user ? UserMapper.toDomain(user) : null
        } catch (error) {
            throw error
        }
    }
    
}