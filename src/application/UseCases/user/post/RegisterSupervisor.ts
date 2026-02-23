
import { PasswordHasher } from '../../../../infra/utils/passwordHasher/PasswordHasher';
import { UseCase } from '../../../UseCase';
import { UserRepository } from '../../../../domain/repo/UserRepository';
import { Supervisor } from '../../../../domain/entities/users/Supervisor';
import { RegisterSupervisorDTOInput, RegisterSupervisorDTOOutput } from '../../../DTOs/user/post/RegisterSupervisorDTO';
export class RegisterSupervisorUseCase implements UseCase<RegisterSupervisorDTOInput, RegisterSupervisorDTOOutput>{
    
    public constructor(
        private readonly userRepo:UserRepository,
        private readonly passwordHasher:PasswordHasher
    ){}

    public async execute(input: RegisterSupervisorDTOInput): Promise<RegisterSupervisorDTOOutput> {
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

            
            const passwordValidation = Supervisor.validatePasswordWithErrors(input.password)

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
                registration
            } = input

            const passwordHash = await this.passwordHasher.hashPassword(password)
            const supervisor = Supervisor.create(
                name,
                email,
                passwordHash,
                phoneNumber,
                registration
            )

            await this.userRepo.save(supervisor)

            return{
                success:true,
                status_code:201,
                id:supervisor.id
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