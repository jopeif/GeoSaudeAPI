import { RoleEnum } from "./RoleEnum"
import { User, UserProps } from "./User"

export type SupervisorProps = UserProps & {
    registration: string
}

export class Supervisor extends User<SupervisorProps> {
    private constructor(props: SupervisorProps) {
        super(props)
    }

    static create(
        name: string,
        email: string,
        passwordHash: string,
        phoneNumber: string,
        registration: string
    ) {
        const id = crypto.randomUUID().toString()
        const createdAt = new Date()

        this.validateName(name)
        this.validateEmail(email)
        this.validatePhoneNumber(phoneNumber)
        this.validateRegistration(registration)

        return new Supervisor({
        id,
        name,
        email,
        passwordHash,
        phoneNumber,
        role: RoleEnum.SUPERVISOR,
        registration,
        banned: false,
        createdAt
        })
    }

    static fromPersistance(props:SupervisorProps){
        return new Supervisor(props)
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
            registration: this.registration,
            createdAt: this.createdAt,
            banned:this.banned,
        }
    }

    public static validateRegistration(registration:string){
        //TODO: Implementar método de verificação de matrícula após consenguir as regras de negócio
    }

    public get registration(){
        return this.props.registration
    }
}
