import { Admin } from "../../../../domain/entities/users/Admin";
import { Agent } from "../../../../domain/entities/users/Agent";
import { Supervisor } from "../../../../domain/entities/users/Supervisor";
import { UserRepository } from "../../../../domain/repo/UserRepository";
import { UserMapper } from "./mappers/UserMapper";
import {prisma} from "../Prisma"
export class PrismaUserRepository implements UserRepository{
    async save(user: Agent | Supervisor | Admin): Promise<void> {
        try {
            const data = UserMapper.toPrisma(user)
            const {
                id,
                name, 
                email,
                passwordHash,
                role,
                phoneNumber,
                banned,
                createdAt
            } = data
            await prisma.user.create({
                data:{
                    id,
                    name,
                    email,
                    passwordHash,
                    role,
                    phoneNumber,
                    banned,
                    createdAt,
                    registration: role=="AGENT"||role=="SUPERVISOR" ? data.registration : null,
                    block: role=="AGENT" ? data.block : null,
                    accessLevel: role=="ADM" ? data.accessLevel : null
                }
            })
            } catch (error) {
                throw error
        }
    }
    async update(user: Agent | Supervisor | Admin): Promise<void> {
        try {
            const data = UserMapper.toPrisma(user)
            await prisma.user.update({
                where:{id:user.id},
                data
            })
        } catch (error) {
            throw error
        }
    }
    async delete(id: string): Promise<void> {
        await prisma.user.delete({
            where:{id}
        })
    }

    async setBanned(id:string, banned: boolean): Promise<void> {
        try {
            await prisma.user.update({
                where:{id},
                data:{
                    banned
                }
            })
        } catch (error) {
            throw error
        }
    }

    //===finders===

    async findAll(): Promise<(Agent | Supervisor | Admin)[]> {
        try {
            const users = await prisma.user.findMany()

            const result = users.map((u)=>{
                return UserMapper.toDomain(u)
            })

            return result
        } catch (error) {
            throw error
        }
    }

    async findById(id: string): Promise<Agent | Supervisor | Admin | null> {
        try {
            const user = await prisma.user.findUnique({
                where:{id}
            })
            if(!user){
                return null
            }
            return UserMapper.toDomain(user)
        } catch (error) {
            throw error
        }
    }

    async findByRole(role: "AGENT" | "ADM" | "SUPERVISOR"): Promise<(Agent | Supervisor | Admin)[]> {
        try {
            const users = await prisma.user.findMany({
                where:{role}
            })

            const result = users.map((u)=>{
                return UserMapper.toDomain(u)
            })

            return result
        } catch (error) {
            throw error
        }
    }
    async findByEmail(email: string): Promise<Agent | Supervisor | Admin | null> {
        try {
            const user = await prisma.user.findUnique({
                where:{email}
            })
            if(!user){
                return null
            }
            return UserMapper.toDomain(user)
        } catch (error) {
            throw error
        }
    }
    async findByRegistration(registration: string): Promise<Agent | Supervisor | Admin | null> {
        try {
            const user = await prisma.user.findFirst({
                where:{registration}
            })
            if(!user){
                return null
            }
            return UserMapper.toDomain(user)
        } catch (error) {
            throw error
        }
    }
    
}