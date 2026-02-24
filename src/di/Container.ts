import { FindUserByRegistrationUseCase } from './../application/UseCases/user/get/FindUserByRegistrationUseCase';
import { FindAllSupervisorUseCase } from './../application/UseCases/user/get/FindAllSupervisorsUseCase';
import { RegisterSupervisorUseCase } from '../application/UseCases/user/post/RegisterSupervisor';
import { prismaAuthRepository } from '../infra/db/prisma/Implementation/AuthPrismaRepository';
import { RegisterAgentUseCase } from "../application/UseCases/user/post/RegisterAgentUseCase";
import { UserController } from "../infra/web/controllers/user.controller";
import { BcryptPasswordHasher } from "../infra/utils/passwordHasher/implementation/BcryptPasswordHasher";
import { AuthController } from "../infra/web/controllers/auth.controller";
import { LoginUseCase } from "../application/UseCases/auth/LoginUseCase";
import { RefreshTokenUseCase } from '../application/UseCases/auth/RefreshTokenUseCase';
import { PrismaUserRepository } from '../infra/db/prisma/Implementation/UserPrismaRepository';
import { RegisterAdminUseCase } from '../application/UseCases/user/post/RegisterAdminUseCase';
import { FindAllUsersUseCase } from '../application/UseCases/user/get/FindAllUsersUseCase';
import { FindUserByIdUseCase } from '../application/UseCases/user/get/FindUserByIdUseCase';
import { FindUserByEmailUseCase } from '../application/UseCases/user/get/FindUserByEmailUseCase';
import { FindAllAdminUseCase } from '../application/UseCases/user/get/FindAllAdminsUseCase';
import { FindAllAgentUseCase } from '../application/UseCases/user/get/FindAllAgentsUseCase';
import { BanUserUseCase } from '../application/UseCases/user/patch/BanUserUseCase';
import { MeUseCase } from '../application/UseCases/auth/MeUseCase';

export class Container{

    public get UserController(){
        const userRepo = new PrismaUserRepository()
        const passwordHasher = new BcryptPasswordHasher()

        const registerAgentUC = new RegisterAgentUseCase(userRepo, passwordHasher)
        const registerSupervisorUC = new RegisterSupervisorUseCase(userRepo, passwordHasher)
        const registerAdminUC = new RegisterAdminUseCase(userRepo, passwordHasher)

        const banUserUC = new BanUserUseCase(userRepo)

        const findAllUsersUC = new FindAllUsersUseCase(userRepo)
        const findUserByIdUC = new FindUserByIdUseCase(userRepo)
        const findUserByEmailUC = new FindUserByEmailUseCase(userRepo)
        const findUserByRegistrationUC = new FindUserByRegistrationUseCase(userRepo)
        const findAllAdminUC = new FindAllAdminUseCase(userRepo)
        const findAllAgentUC = new FindAllAgentUseCase(userRepo)
        const findAllSupervisorUC = new FindAllSupervisorUseCase(userRepo)

        return new UserController(
            //post
            registerAgentUC, 
            registerSupervisorUC, 
            registerAdminUC,
            
            //patch
            banUserUC,

            //get
            findAllUsersUC,
            findUserByIdUC,
            findUserByEmailUC,
            findUserByRegistrationUC,
            findAllAdminUC,
            findAllAgentUC,
            findAllSupervisorUC,
        )
    }

    public get authController(){
        const authRepo = new prismaAuthRepository()
        const userRepo = new PrismaUserRepository()
        const passwordHasher = new BcryptPasswordHasher()

        const loginUC = new LoginUseCase(authRepo, userRepo, passwordHasher)
        const refreshTokenUC = new RefreshTokenUseCase(authRepo, userRepo)
        const meUC = new MeUseCase(userRepo)
        return new AuthController(loginUC, refreshTokenUC, meUC)
    }
}