import { Admin } from "../../../../domain/entities/users/Admin";
import { Agent } from "../../../../domain/entities/users/Agent";
import { Supervisor } from "../../../../domain/entities/users/Supervisor";
import { UserRepository } from "../../../../domain/repo/UserRepository";
import { FindUserByRegistrationDTOInput, FindUserByRegistrationDTOOutput } from "../../../DTOs/user/get/FindByRegistrationDTO";
import { UseCase } from "../../../UseCase";

export class FindUserByRegistrationUseCase implements UseCase<FindUserByRegistrationDTOInput, FindUserByRegistrationDTOOutput>{
    constructor(private readonly userRepo:UserRepository){}
    async execute(input: FindUserByRegistrationDTOInput): Promise<FindUserByRegistrationDTOOutput> {
        
        try {
            const {registration} = input

            const result = await this.userRepo.findByRegistration(registration)

            if(!result){
                return{
                    success:false,
                    status_code:404,
                    message:"There is no user with given id."
                }
            }


            const {
                id,
                name,
                email,
                role,
                phoneNumber,
                banned,
                createdAt,
            } = result.toJson()

            if(result instanceof Agent){
                return{
                success:true,
                status_code:200,
                user:{
                    id,
                    name,
                    email,
                    role,
                    phoneNumber,
                    banned,
                    createdAt,
                    registration: result.registration,
                    block: result.block
                    }
                }
            }else if(result instanceof Supervisor){
                return{
                    success:true,
                    status_code:200,
                    user:{
                        id,
                        name,
                        email,
                        role,
                        phoneNumber,
                        banned,
                        createdAt,
                        registration: result.registration
                    }
                }
            }else if(result instanceof Admin){
                return{
                    success:true,
                    status_code:200,
                    user:{
                        id,
                        name,
                        email,
                        role,
                        phoneNumber,
                        banned,
                        createdAt,
                        accessLevel:result.accessLevel
                    }
                }
            }

            return {
                success:false,
                status_code:500,
                message:"Unknown user role."
            }
        } catch (error) {
            return{
                success:false,
                status_code:500,
                message:(error as Error).message
            }
            
        }
    }
}