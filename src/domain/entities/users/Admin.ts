import { RoleEnum } from "./RoleEnum"
import { User, UserProps } from "./User"

export type AdminProps = UserProps & {
    accessLevel: number,
}

export class Admin extends User<AdminProps>{
    private constructor(props:AdminProps){
        super(props)
    }

    public static create(
        name: string,
        email: string,
        passwordHash: string,
        phoneNumber: string,
        accessLevel: number
    ){

        const id = crypto.randomUUID().toString()
        const createdAt = new Date()

        this.validateName(name)
        this.validateEmail(email)
        this.validatePhoneNumber(phoneNumber)

        return new Admin({
            id, 
            name, 
            email, 
            passwordHash, 
            role: RoleEnum.ADM, 
            phoneNumber, 
            createdAt,
            banned:false,
            accessLevel, 
        })
    }

    public static fromPersistence(props:AdminProps){
        return new Admin(props)
    }

    public toPersistance(){
        return this.props
    }

    public toJson (){
        return {
            id:this.id, 
            name:this.name, 
            email:this.email, 
            passwordHash:this.passwordHash, 
            role: this.role, 
            phoneNumber: this.phoneNumber, 
            createdAt: this.createdAt,
            banned:this.banned,
            accessLevel: this.accessLevel, 
        }
    }

    public get accessLevel(){
        return this.props.accessLevel
    }
}