import { VisitFormRepository } from "../../../domain/repo/VisitFormRepository";
import { DeleteVisitDTOInput, DeleteVisitDTOOutput } from "../../DTOs/visitForm/DeleteVisitDTO";
import { UseCase } from "../../UseCase";

export class DeleteVisitUseCase implements UseCase<DeleteVisitDTOInput, DeleteVisitDTOOutput>{
    constructor(
        private readonly visitRepo : VisitFormRepository
    ){}

    async execute(input: DeleteVisitDTOInput): Promise<DeleteVisitDTOOutput> {
        try {
            const {id} = input
            const visit = await this.visitRepo.findById(id)

            if(!visit){
                return {
                    success:false,
                    status_code:404,
                    message:"Visit Form with the given ID does not exist."
                }
            }

            await this.visitRepo.delete(id)

            return{
                success:true,
                status_code:200,
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