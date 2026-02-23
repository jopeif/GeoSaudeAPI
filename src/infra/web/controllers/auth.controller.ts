import { Request, Response } from 'express';
import { LoginUseCase } from '../../../application/UseCases/auth/LoginUseCase';
import { RefreshTokenUseCase } from '../../../application/UseCases/auth/RefreshTokenUseCase';
import { MeUseCase } from '../../../application/UseCases/auth/MeUseCase';

export class AuthController{

    constructor(
        private readonly loginUC:LoginUseCase,
        private readonly refreshTokenUC:RefreshTokenUseCase,
        private readonly meUC:MeUseCase,
    ){}
    
    async login(req:Request, res:Response){
        try {
            const {login, password} = req.body

            const result = await this.loginUC.execute({
                login,
                password
            })

            if(result.success){
                return res.status(result.status_code).json({
                    success:true,
                    user:{
                        id:result.user?.id,
                        access_token:result.user?.access_token,
                        refresh_token:result.user?.refresh_token,
                        role: result.user?.role
                    }
                })
            }else{
                return res.status(result.status_code).json({
                    success:false,
                    message:result.message
                })
            }

        } catch (error) {
            return res.status(500).json({
                success: false,
                message: error instanceof Error ? error.message : "Internal server error"
            })
        }
    }

    async refreshToken(req:Request, res:Response){
        try {
            const {refreshToken} = req.body

            if(!refreshToken){
                res.status(401).json({
                    success:false,
                    message:"Refresh Token was not provided."
                })
            }

            const result = await this.refreshTokenUC.execute({refreshToken})

            if(result.success){
                return res.status(result.status_code).json({
                    success:true,
                    user:{
                        id:result.user?.id,
                        access_token:result.user?.access_token,
                        refresh_token:result.user?.refresh_token,
                        role: result.user?.role
                    }
                })
            }else{
                return res.status(result.status_code).json({
                    success:false,
                    message:result.message
                })
            }
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: error instanceof Error ? error.message : "Internal server error"
            })
        }
    }

    async me(req:Request, res:Response){
        try {
            const userId = req.user!.sub

            const result = await this.meUC.execute({id:userId})

            if (!result.success) {
                return res.status(404).json({
                    success: false,
                    message: result.message
                })
            }

            return res.status(200).json({
                success: true,
                user: result.user
            })
            
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: error instanceof Error ? error.message : "Internal server error"
            })
        }
    }
}