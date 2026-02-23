import { UserRepository } from "../../../../domain/repo/UserRepository";
import { BanUserDTOInput, BanUserDTOOutput } from "../../../DTOs/user/patch/BanUserDTO";
import { UseCase } from "../../../UseCase";

export class BanUserUseCase implements UseCase<BanUserDTOInput, BanUserDTOOutput>{
    constructor(private readonly userRepo:UserRepository){}
    async execute(input: BanUserDTOInput): Promise<BanUserDTOOutput> {
        try {
            const {id} = input

            const user = await this.userRepo.findById(id)

            if(!user){
                return{
                    success:false,
                    status_code:404,
                    message:"There is no user with the given ID."
                }
            }

            user.ban()

            await this.userRepo.setBanned(id, user.banned)
            return{
                success:true,
                status_code:204
            }
        } catch (error) {
            return {
                success: false,
                status_code: 500,
                message:(error as Error).message
            }
        }
    }
}