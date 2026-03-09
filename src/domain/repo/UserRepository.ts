import { Admin } from "../entities/users/Admin"
import { Agent } from "../entities/users/Agent"
import { Supervisor } from "../entities/users/Supervisor"

export interface UserRepository{
    save(user:Agent | Supervisor | Admin):Promise<void>
    update(user:Agent | Supervisor | Admin):Promise<void>
    delete(id:string):Promise<void>

    setBanned(id:string, banned:boolean):Promise<void>

    findAll():Promise<(Agent | Supervisor | Admin)[]>
    findById(id:string):Promise<Agent | Supervisor | Admin | null>
    findByEmail(email:string):Promise<Agent | Supervisor | Admin | null>
    findByRegistration(registration:string):Promise<Agent | Supervisor | Admin | null>
    findByRole(role:"AGENT"|"ADM"|"SUPERVISOR"):Promise<(Agent | Supervisor | Admin)[]>
}
