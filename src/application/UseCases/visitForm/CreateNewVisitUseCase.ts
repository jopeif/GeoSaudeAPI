import { VisitForm } from "../../../domain/entities/visitForm/visitForm";
import { UserRepository } from "../../../domain/repo/UserRepository";
import { VisitFormRepository } from "../../../domain/repo/VisitFormRepository";
import { CreateNewVisitDTOInput, CreateNewVisitDTOOutput } from "../../DTOs/visitForm/CreateNewVisitDTO";
import { UseCase } from "../../UseCase";

export class CreateNewVisitUseCase implements UseCase <CreateNewVisitDTOInput, CreateNewVisitDTOOutput>{

    constructor(
        private readonly visitRepo:VisitFormRepository,
        private readonly userRepo:UserRepository
    ){}
    async execute(input: CreateNewVisitDTOInput): Promise<CreateNewVisitDTOOutput> {
        try {
            
            const user = await this.userRepo.findById(input.userId)

            if(!user){
                return{
                    success:false,
                    status_code:400,
                    message:"User with the given ID does not exist."
                }
            }



            const visit = VisitForm.create(
                input
            )

            await this.visitRepo.save(visit)

            return {
                success: true,
                status_code: 201,
                id: visit.id
            }

            
        } catch (error) {
            return {
                success: false,
                status_code: 500,
                message: (error as Error).message
            }
        }
    }
}