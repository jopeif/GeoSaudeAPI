import { LoginDTOInput, LoginDTOOutput } from "../../DTOs/auth/LoginDTO";
import jwt from "jsonwebtoken";
import { UseCase } from "../../UseCase";
import { AuthRepository } from "../../../domain/repo/AuthRepository";
import { PasswordHasher } from "../../../infra/utils/passwordHasher/PasswordHasher";
import { RefreshToken } from "../../../domain/entities/auth/RefreshToken";
import { UserRepository } from "../../../domain/repo/UserRepository";

export class LoginUseCase implements UseCase<LoginDTOInput, LoginDTOOutput>{

    constructor(
        private readonly authRepo:AuthRepository,
        private readonly userRepo:UserRepository,
        private readonly passwordHasher:PasswordHasher
    ){}

    public async execute(input: LoginDTOInput): Promise<LoginDTOOutput> {
        try {
            //1º: checar se o email ou registration existe.
            //2º: checar se a senha está correta.
            //3ª: criar e retornar os tokens

                const user = await this.userRepo.findByEmail(input.login) ?? await this.userRepo.findByRegistration(input.login)

                if(!user){
                    return {
                        success: false,
                        status_code: 401,
                        message: "Invalid credentials."
                    }
                }

                if(!await this.passwordHasher.comparePassword(input.password, user.passwordHash)){
                    return {
                        success: false,
                        status_code: 401,
                        message: "Invalid credentials."
                    }
                }

                if(user.banned){
                    return {
                        success: false,
                        status_code: 403,
                        message: "User is banned."
                    }
                }


                const access_token = jwt.sign(
                    { sub: user.id, role: user.role },
                    process.env["ACCESS_SECRET"] ?? "",
                    { expiresIn: "15m" }
                );

                const refresh_token = jwt.sign(
                    { sub: user.id, role: user.role },
                    process.env["REFRESH_SECRET"] ?? "",
                    {expiresIn: "7d"}
                )

                await this.authRepo.deleteTokensByUserId(user.id)

                const refreshTokenObject = await RefreshToken.create(user.id, refresh_token)

                await this.authRepo.createRefreshToken(refreshTokenObject)

                return {
                    success: true,
                    status_code: 200,
                    user:{
                        id:user.id,
                        access_token,
                        refresh_token,
                        role:user.role
                    }
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