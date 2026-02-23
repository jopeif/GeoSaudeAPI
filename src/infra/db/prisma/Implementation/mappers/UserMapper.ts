import { Supervisor } from './../../../../../domain/entities/users/Supervisor';
import { Admin } from "../../../../../domain/entities/users/Admin"
import { Agent } from "../../../../../domain/entities/users/Agent"
import { RoleEnum } from "../../../../../generated/prisma/enums"

export class UserMapper {

    static toPrisma(user: Agent | Supervisor | Admin) {
        

        if(user instanceof Agent){
            const props = user.toPersistance()
            return {
                id: props.id,
                name: props.name,
                email: props.email,
                passwordHash: props.passwordHash,
                phoneNumber: props.phoneNumber,
                role: RoleEnum.AGENT,
                block: props.block,
                registration: props.registration,
                banned: props.banned,
                createdAt: props.createdAt,
            }
        }else if(user instanceof Supervisor){
            const props = user.toPersistance()
            return {
                id: props.id,
                name: props.name,
                email: props.email,
                passwordHash: props.passwordHash,
                phoneNumber: props.phoneNumber,
                role: RoleEnum.SUPERVISOR,
                registration: props.registration,
                banned: props.banned,
                createdAt: props.createdAt,
            }
        }else if(user instanceof Admin){
            const props = user.toPersistance()

            return{
                id: props.id,
                name: props.name,
                email: props.email,
                passwordHash: props.passwordHash,
                phoneNumber: props.phoneNumber,
                role: RoleEnum.ADM,
                banned: props.banned,
                accessLevel: props.accessLevel,
                createdAt: props.createdAt,
            }
        }

        throw new Error("Role either does not exists or is incorrect.")
        
    }

    static toDomain(raw: any): Admin | Agent | Supervisor {

        if(raw.role=="ADM"){
            return Admin.fromPersistence({
                id: raw.id,
                name: raw.name,
                email: raw.email,
                passwordHash: raw.passwordHash,
                phoneNumber: raw.phoneNumber,
                role: Admin.roleEnumParse("ADM"),
                accessLevel: raw.accessLevel, 
                banned: raw.banned,
                createdAt: raw.createdAt,
            })
        }else if(raw.role=="AGENT"){
            return Agent.fromPersistence({
                id: raw.id,
                name: raw.name,
                email: raw.email,
                passwordHash: raw.passwordHash,
                phoneNumber: raw.phoneNumber,
                registration: raw.registration,
                block: raw.block,
                role: Agent.roleEnumParse("AGENT"),
                banned: raw.banned,
                createdAt: raw.createdAt,
            })
        }else if(raw.role=="SUPERVISOR"){
            return Supervisor.fromPersistance({
                id: raw.id,
                name: raw.name,
                email: raw.email,
                passwordHash: raw.passwordHash,
                phoneNumber: raw.phoneNumber,
                registration: raw.registration,
                role: Supervisor.roleEnumParse("SUPERVISOR"),
                banned: raw.banned,
                createdAt: raw.createdAt,
            })
        }else{
            throw new Error("Role either does not exists or is incorrect.")
        }
    }
}
