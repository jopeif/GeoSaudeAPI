import { RegisterAgentDTOOutput, RegisterAgentDTOInput } from '../../../DTOs/user/post/RegisterAgentDTO';
import { PasswordHasher } from '../../../../infra/utils/passwordHasher/PasswordHasher';
import { Agent } from '../../../../domain/entities/users/Agent';
import { UseCase } from '../../../UseCase';
import { UserRepository } from '../../../../domain/repo/UserRepository';
export class RegisterAgentUseCase implements UseCase<RegisterAgentDTOInput, RegisterAgentDTOOutput>{
    
    public constructor(
        private readonly userRepo:UserRepository,
        private readonly passwordHasher:PasswordHasher
    ){}

    public async execute(input: RegisterAgentDTOInput): Promise<RegisterAgentDTOOutput> {
        try {
            
            const user = await this.userRepo.findByEmail(input.email)
            if(user){
                return {
                    success:false,
                    status_code:400,
                    message:"Email is already in use."
                }
            }else{
                const user = await this.userRepo.findByRegistration(input.registration)
                if (user){
                    return {
                        success:false,
                        status_code:400,
                        message:"Registration number is already in use."
                    }
                }
            }

            
            const passwordValidation = Agent.validatePasswordWithErrors(input.password)

            if(passwordValidation.length!=0){
                return {
                    success:false,
                    status_code:400,
                    message:passwordValidation
                }
            }

            const {
                name,
                email,
                password,
                phoneNumber,
                block,
                registration
            } = input

            const passwordHash = await this.passwordHasher.hashPassword(password)
            const agent = Agent.create(
                name,
                email,
                passwordHash,
                phoneNumber,
                block,
                registration
            )

            await this.userRepo.save(agent)

            return{
                success:true,
                status_code:201,
                id:agent.id
            }

        } catch (error) {
            return {
                success:false,
                status_code:500,
                message: (error as Error).message
            }
        }
    }
}