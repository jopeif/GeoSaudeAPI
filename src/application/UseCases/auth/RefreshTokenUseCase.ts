import jwt from "jsonwebtoken";
import { AuthRepository } from "../../../domain/repo/AuthRepository";
import { RefreshTokenDTOInput, RefreshTokenDTOOutput } from "../../DTOs/auth/RefreshTokenDTO";
import { UseCase } from "../../UseCase";
import { RefreshToken } from "../../../domain/entities/auth/RefreshToken";

export class RefreshTokenUseCase implements UseCase<RefreshTokenDTOInput, RefreshTokenDTOOutput>{
    constructor(private readonly authRepo:AuthRepository){}

    async execute(input: RefreshTokenDTOInput): Promise<RefreshTokenDTOOutput> {
        try {
            const {refreshToken} = input

            if(!refreshToken || refreshToken==""){
                return{
                    success:false,
                    status_code:401,
                    message:"Refresh Token was not provided."
                }
            }

            const storedToken = await this.authRepo.findTokenByToken(refreshToken)
            if(!storedToken || storedToken?.revoked || storedToken?.expiresAt < new Date()){
                return{
                    success:false,
                    status_code:401,
                    message:"Refresh Token is not valid."
                }
            }
            const user = await this.authRepo.findById(storedToken.userId)

            if(!user){
                return{
                    success:false,
                    status_code:404,
                    message:"User with the give Refresh Token does not exist."
                }
            }

            const payload = jwt.verify(storedToken.token, process.env["REFRESH_SECRET"] ?? "")
            
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