import { UserRepository } from "../../../domain/repo/UserRepository";
import { VisitFormRepository } from "../../../domain/repo/VisitFormRepository";
import { FindVisitsByUserIdDTOInput, FindVisitsByUserIdDTOOutput } from "../../DTOs/visitForm/FindVisitsByUserIdDTO";
import { UseCase } from "../../UseCase";

export class FindVisitsByUserIdUseCase implements UseCase<FindVisitsByUserIdDTOInput, FindVisitsByUserIdDTOOutput>{
    constructor(
        private readonly visitRepo:VisitFormRepository,
        private readonly userRepo:UserRepository,
    ){}
    async execute(input: FindVisitsByUserIdDTOInput): Promise<FindVisitsByUserIdDTOOutput> {
        try {

            const user = await this.userRepo.findById(input.userId)

            if(!user){
                return {
                    success:false,
                    status_code:404,
                    message:"User with the given ID does not exist."
                }
            }

            const visits = await this.visitRepo.findByUserId(user.id)

            if(!visits || visits.length==0){
                return {
                    success:true,
                    status_code:200,
                    visitForms:[]
                }
            }

            const result = visits.map((v)=>{
                const visit = v.data

                return {
                    id: visit.id,
                    visitDate: visit.visitDate,
                    localityCode: visit.localityCode,
                    streetName: visit.streetName,
                    number: visit.number,
                    blockSide: visit.blockSide,
                    complement: visit.complement,
                    propertyType: visit.propertyType,
                    residentName: visit.residentName,
                    phone: visit.phone,
                    entryTime: visit.entryTime,
                    visitType: visit.visitType,
                    inspected: visit.inspected,
                    pendingReason: visit.pendingReason,
                    depositsWithFocus: visit.depositsWithFocus,
                    depositType: visit.depositType,
                    larvicideUsed: visit.larvicideUsed,
                    treatedDeposits: visit.treatedDeposits,
                    eliminatedDeposits: visit.eliminatedDeposits,
                    depositsA1: visit.depositsA1,
                    depositsA2: visit.depositsA2,
                    depositsB: visit.depositsB,
                    depositsC: visit.depositsC,
                    depositsD1: visit.depositsD1,
                    depositsD2: visit.depositsD2,
                    depositsE: visit.depositsE,
                    treatmentApplied: visit.treatmentApplied,
                    treatmentLarvicideType: visit.treatmentLarvicideType,
                    larvicideAmount: visit.larvicideAmount,
                    perifocalDeposits: visit.perifocalDeposits,
                    adulticideLoads: visit.adulticideLoads,
                    sampleCollected: visit.sampleCollected,
                    sampleCode: visit.sampleCode,
                    tubeCount: visit.tubeCount,
                    notes: visit.notes,
                    latitude: visit.latitude,
                    longitude: visit.longitude,
                    createdAt: visit.createdAt,
                    userId: visit.userId,
                }
            })

            return{
                success:true,
                status_code:200,
                visitForms:result
            }


        } catch (error) {
            return {
                success:false,
                status_code:500,
                message:(error as Error).message
            }
        }
    }
}