import { FindAllSupervisorUseCase } from './../../../application/UseCases/user/get/FindAllSupervisorsUseCase';
import { RegisterAdminUseCase } from '../../../application/UseCases/user/post/RegisterAdminUseCase';
import { RegisterAgentUseCase } from "../../../application/UseCases/user/post/RegisterAgentUseCase";
import { Request, Response } from 'express';
import { RegisterSupervisorUseCase } from "../../../application/UseCases/user/post/RegisterSupervisor";
import { FindAllUsersUseCase } from '../../../application/UseCases/user/get/FindAllUsersUseCase';
import { FindUserByIdUseCase } from '../../../application/UseCases/user/get/FindUserByIdUseCase';
import { FindUserByEmailUseCase } from '../../../application/UseCases/user/get/FindUserByEmailUseCase';
import { FindAllAdminUseCase } from '../../../application/UseCases/user/get/FindAllAdminsUseCase';
import { FindAllAgentUseCase } from '../../../application/UseCases/user/get/FindAllAgentsUseCase';
import { FindUserByRegistrationUseCase } from '../../../application/UseCases/user/get/FindUserByRegistrationUseCase';
import { BanUserUseCase } from '../../../application/UseCases/user/patch/BanUserUseCase';

export class UserController{
    public constructor(
        //post
        private readonly registerAgentUC:RegisterAgentUseCase,
        private readonly registerSupervisorUC: RegisterSupervisorUseCase,
        private readonly registerAdminUC: RegisterAdminUseCase,

        //patch
        private readonly banUserUC: BanUserUseCase,

        //get
        private readonly findAllUsersUC: FindAllUsersUseCase,
        private readonly findUserByIdUC: FindUserByIdUseCase,
        private readonly findUserByEmailUC: FindUserByEmailUseCase,
        private readonly findUserByRegistrationUC: FindUserByRegistrationUseCase,
        private readonly findAllAdminUC: FindAllAdminUseCase,
        private readonly findAllAgentUC: FindAllAgentUseCase,
        private readonly findAllSupervisorUC: FindAllSupervisorUseCase,
    ){}

    //POST
    public async registerAgent(req:Request, res:Response){
        try {
            console.log(req.headers)
            const {
                name,
                email,
                password,
                phoneNumber,
                block,
                registration
            } = req.body

            const result = await this.registerAgentUC.execute({
                name,
                email,
                password,
                phoneNumber,
                block,
                registration
            })

            if(!result.success){
                return res.status(result.status_code).json({
                    success:false,
                    message:result.message
                })
            }else{
                return res.status(result.status_code).json({
                    success:true,
                    id:result.id
                })
            }
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: error instanceof Error ? error.message : "Internal server error"
            })
        }
    }
    public async registerSupervisor(req:Request, res:Response){
        try {
            const {
                name,
                email,
                password,
                phoneNumber,
                registration
            } = req.body

            const result = await this.registerSupervisorUC.execute({
                name,
                email,
                password,
                phoneNumber,
                registration
            })

            if(!result.success){
                return res.status(result.status_code).json({
                    success:false,
                    message:result.message
                })
            }else{
                return res.status(result.status_code).json({
                    success:true,
                    id:result.id
                })
            }
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: error instanceof Error ? error.message : "Internal server error"
            })
        }
    }
    public async registerAdmin(req:Request, res:Response){
        try {
            const {
                name,
                email,
                password,
                phoneNumber,
                accessLevel
            } = req.body

            const result = await this.registerAdminUC.execute({
                name,
                email,
                password,
                phoneNumber,
                accessLevel
            })

            if(!result.success){
                return res.status(result.status_code).json({
                    success:false,
                    message:result.message
                })
            }else{
                return res.status(result.status_code).json({
                    success:true,
                    id:result.id
                })
            }
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: error instanceof Error ? error.message : "Internal server error"
            })
        }
    }

    public async banUser(req:Request, res:Response){
        try {
            const { id } = req.params

            if (typeof id !== "string" || !id.trim()) {
                return res.status(400).json({
                    success: false,
                    message: "No id was given."
                })
            }

            const result = await this.banUserUC.execute({id})

            if (!result.success) {
                return res.status(404).json({
                    success: false,
                    message: result.message
                })
            }

            return res.status(200).json({
                success: true,
            })

        } catch (error) {
            return res.status(500).json({
                success: false,
                message: error instanceof Error ? error.message : "Internal server error"
            })
        }
    }

    //GET
    public async findAll(req:Request, res:Response){
        try {
            const result = await this.findAllUsersUC.execute()
            if(!result.success){
                return res.status(result.status_code).json({
                    success:false,
                    message:result.message
                })
            }else{
                return res.status(result.status_code).json({
                    success:true,
                    users:result.users
                })
            }
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: error instanceof Error ? error.message : "Internal server error"
            })
        }
    }

    public async findById(req: Request, res: Response) {
        try {
            const { id } = req.params

            if (typeof id !== "string" || !id.trim()) {
                return res.status(400).json({
                    success: false,
                    message: "No id was given."
                })
            }

            const result = await this.findUserByIdUC.execute({ id })

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

    public async findByEmail(req: Request, res: Response) {
        try {
            const { email } = req.body

            if (typeof email !== "string" || !email.trim()) {
                return res.status(400).json({
                    success: false,
                    message: "No email was given."
                })
            }

            const result = await this.findUserByEmailUC.execute({ email })

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

    public async findByRegistration(req: Request, res:Response) {
        try {
            const { registration } = req.params

            if (typeof registration !== "string" || !registration.trim()) {
                return res.status(400).json({
                    success: false,
                    message: "No registration was given."
                })
            }

            const result = await this.findUserByRegistrationUC.execute({ registration })

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

    public async findAllAdmin(req:Request, res:Response){
        try {
            const result = await this.findAllAdminUC.execute()
            if(!result.success){
                return res.status(result.status_code).json({
                    success:false,
                    message:result.message
                })
            }else{
                return res.status(result.status_code).json({
                    success:true,
                    users:result.users
                })
            }
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: error instanceof Error ? error.message : "Internal server error"
            })
        }
    }

    public async findAllAgents(req:Request, res:Response){
        try {
            const result = await this.findAllAgentUC.execute()
            if(!result.success){
                return res.status(result.status_code).json({
                    success:false,
                    message:result.message
                })
            }else{
                return res.status(result.status_code).json({
                    success:true,
                    users:result.users
                })
            }
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: error instanceof Error ? error.message : "Internal server error"
            })
        }
    }

    public async findAllSupervisor(req:Request, res:Response){
        try {
            const result = await this.findAllSupervisorUC.execute()
            if(!result.success){
                return res.status(result.status_code).json({
                    success:false,
                    message:result.message
                })
            }else{
                return res.status(result.status_code).json({
                    success:true,
                    users:result.users
                })
            }
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: error instanceof Error ? error.message : "Internal server error"
            })
        }
    }


    
}