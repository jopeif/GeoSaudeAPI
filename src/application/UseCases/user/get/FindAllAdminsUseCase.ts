import { Admin } from "../../../../domain/entities/users/Admin";
import { Agent } from "../../../../domain/entities/users/Agent";
import { Supervisor } from "../../../../domain/entities/users/Supervisor";
import { UserRepository } from "../../../../domain/repo/UserRepository";
import { FindAllAdminDTOOutput } from "../../../DTOs/user/get/FindAllAdminDTO";
import { UseCase } from "../../../UseCase";

export class FindAllAdminUseCase implements UseCase<void, FindAllAdminDTOOutput>{
    constructor(private readonly userRepo:UserRepository){}
    async execute(): Promise<FindAllAdminDTOOutput> {
        try {
            const users = await this.userRepo.findByRole("ADM")

            return {
                success:true,
                status_code:200,
                users:users.map((u)=>{

                    let result
                    if(u instanceof Agent){
                        const props = u.toJson()
                        result = {
                            id:props.id, 
                            name:props.name, 
                            email:props.email, 
                            role: props.role, 
                            phoneNumber: props.phoneNumber, 
                            registration:props.registration,
                            block: props.block,
                            createdAt: props.createdAt,
                            banned:props.banned,
                        }
                    }else if(u instanceof Supervisor){
                        const props = u.toJson()
                        
                        result = {
                            id:props.id, 
                            name:props.name, 
                            email:props.email, 
                            role: props.role, 
                            phoneNumber: props.phoneNumber, 
                            registration:props.registration,
                            createdAt: props.createdAt,
                            banned:props.banned,
                        }
                    }else if(u instanceof Admin){
                        const props = u.toJson()
                        result = {
                            id:props.id, 
                            name:props.name, 
                            email:props.email, 
                            role: props.role, 
                            phoneNumber: props.phoneNumber, 
                            accessLevel: props.accessLevel,
                            createdAt: props.createdAt,
                            banned:props.banned,
                        }
                    }
                    return result
                }).filter((u): u is Exclude<typeof u, undefined> => u !== undefined)
            }
        } catch (error) {
            return {
                success: false,
                status_code:500,
                message:(error as Error).message
            }
        }
    }
}