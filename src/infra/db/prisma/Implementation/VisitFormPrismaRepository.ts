import { VisitForm } from "../../../../domain/entities/visitForm/visitForm";
import { VisitFormRepository } from "../../../../domain/repo/VisitFormRepository";
import { prisma } from "../Prisma";
import { VisitFormMapper } from "./mappers/VisitFormMapper";

export class VisitFormPrismaRepository implements VisitFormRepository{
    async save(visit: VisitForm): Promise<void> {
        try {
            const visitProps = VisitFormMapper.toPrisma(visit)

            await prisma.visitForm.create({
                data:visitProps
            })
        } catch (error) {
            throw error
        }
    }

    async delete(id: string): Promise<void> {
        try {
            await prisma.visitForm.delete({
                where:{id}
            })
        } catch (error) {
            throw error
        }
    }

    async findById(id: string): Promise<VisitForm | null> {
        try {
            const visitProps = await prisma.visitForm.findUnique({where:{id}})

            if(!visitProps){
                return null
            }

            return VisitFormMapper.toDomain(visitProps)
        } catch (error) {
            throw error
        }
    }

    async findByUserId(userId: string): Promise<VisitForm[] | null> {
        try {
            const visits = await prisma.visitForm.findMany({
                where:{userId}
            })

            if(!visits){
                return []
            }

            const result = visits.map((v)=>VisitFormMapper.toDomain(v))

            return result
        } catch (error) {
            throw error
        }
    }

    async findByLocalityCode(localityCode: string): Promise<VisitForm[] | null> {
        try {
            const visits = await prisma.visitForm.findMany({
                where:{localityCode}
            })

            if(!visits){
                return []
            }

            const result = visits.map((v)=>VisitFormMapper.toDomain(v))

            return result
        } catch (error) {
            throw error
        }
    }

    async findByDate(date: Date): Promise<VisitForm[] | null> {
        try {
            const start = new Date(date)
            start.setHours(0,0,0,0)

            const end = new Date(date)
            end.setHours(23,59,59,999)

            const visits = await prisma.visitForm.findMany({
            where: {
                    visitDate: {
                    gte: start,
                    lte: end
                    }
                }
            })

            const result = visits.map((v)=>{
                return VisitFormMapper.toDomain(v)
            })

            return result

        } catch (error) {
            throw error
        }
    }

}