import { RoleEnum } from "./RoleEnum"
import { User, UserProps } from "./User"
import validator from "validator"

export type AgentProps = UserProps & {
    block: string
    registration: string
}

export class Agent extends User<AgentProps> {
    private constructor(props: AgentProps) {
        super(props)
    }

    static create(
        name: string,
        email: string,
        passwordHash: string,
        phoneNumber: string,
        block: string,
        registration: string
    ) {
        const id = crypto.randomUUID().toString()
        const createdAt = new Date()

        this.validateName(name)
        this.validateEmail(email)
        this.validatePhoneNumber(phoneNumber)
        this.validateRegistration(registration)



        return new Agent({
        id,
        name,
        email,
        passwordHash,
        phoneNumber,
        role: RoleEnum.AGENT,
        block,
        registration,
        banned: false,
        createdAt
        })
    }

    public static fromPersistence(props:AgentProps){
        return new Agent(props)
    }

    public static validateRegistration(registration:string){
        //TODO: Implementar método de verificação de matrícula após consenguir as regras de negócio
    }

    public toPersistance(){
        return this.props
    }

    public toJson(){
        return {
            id:this.id, 
            name:this.name, 
            email:this.email, 
            passwordHash:this.passwordHash, 
            role: this.role, 
            phoneNumber: this.phoneNumber, 
            registration:this.registration,
            block: this.block,
            createdAt: this.createdAt,
            banned:this.banned,
        }
    }

    public get registration(){
        return this.props.registration
    }

    public get block(){
        return this.props.block
    }
}
