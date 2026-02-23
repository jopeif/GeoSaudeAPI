import { PasswordHasher } from '../../../../infra/utils/passwordHasher/PasswordHasher';
import { Agent } from '../../../../domain/entities/users/Agent';
import { UseCase } from '../../../UseCase';
import { UserRepository } from '../../../../domain/repo/UserRepository';
import { RegisterAdminDTOInput, RegisterAdminDTOOutput } from '../../../DTOs/user/post/RegisterAdminDTO';
import { Admin } from '../../../../domain/entities/users/Admin';

export class RegisterAdminUseCase implements UseCase<RegisterAdminDTOInput, RegisterAdminDTOOutput>{
    
    public constructor(
        private readonly userRepo:UserRepository,
        private readonly passwordHasher:PasswordHasher
    ){}

    public async execute(input: RegisterAdminDTOInput): Promise<RegisterAdminDTOOutput> {
        try {
            
            const user = await this.userRepo.findByEmail(input.email)
            if(user){
                return {
                    success:false,
                    status_code:400,
                    message:"Email is already in use."
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
                accessLevel
            } = input

            const passwordHash = await this.passwordHasher.hashPassword(password)
            const admin = Admin.create(
                name,
                email,
                passwordHash,
                phoneNumber,
                accessLevel
            )

            await this.userRepo.save(admin)

            return{
                success:true,
                status_code:201,
                id:admin.id
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