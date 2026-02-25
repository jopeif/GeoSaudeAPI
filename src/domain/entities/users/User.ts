import { RoleEnum } from "./RoleEnum"
import validator from "validator"

export type UserProps = {
    id: string
    name: string
    email: string
    passwordHash: string
    role: RoleEnum
    phoneNumber: string
    banned: boolean
    createdAt: Date
}

export class User<TProps extends UserProps> {
    protected constructor(
        protected readonly props: TProps
    ) {}

    // ===== FUNCTIONALITIES =====

    public static roleEnumParse(role: "AGENT" | "SUPERVISOR" | "ADM"): RoleEnum {
        switch (role) {
            case "AGENT":
                return RoleEnum.AGENT
            case "SUPERVISOR":
                return RoleEnum.SUPERVISOR
            case "ADM":
                return RoleEnum.ADM
            default:
                throw new Error("Role not found.")
        }
    }

    public static validateName(name: string) {
        if (name.length < 4) {
            throw new Error("Name must contain at least four characters.")
        }
    }

    public static validateEmail(email: string) {
        if (!validator.isEmail(email)) {
            throw new Error("Invalid email.")
        }
    
    }

    public static validatePhoneNumber(phoneNumber: string) {
        if (!validator.isMobilePhone(phoneNumber, "pt-BR")) {
            throw new Error("Invalid phone number.")
        }
    }

    public static validatePasswordWithErrors(password: string): string[] {
        const errors: string[] = []

        if (password.length < 8) {
            errors.push("Your password must contain at least eight characters.")
        }

        if (!/[a-z]/.test(password)) {
            errors.push("Your password must contain at least one lowercase letter.")
        }

        if (!/[A-Z]/.test(password)) {
            errors.push("Your password must contain at least one uppercase letter.")
        }

        if (!/[0-9]/.test(password)) {
            errors.push("Your password must contain at least one number.")
        }

        if (!/[^A-Za-z0-9]/.test(password)) {
            errors.push("Your password must contain at least one special character.")
        }

        return errors
    }

    public ban(){
        this.props.banned = true
    }

    public unban(){
        this.props.banned = false
    }

    // ===== GETTERS =====

    public get id(): string {
        return this.props.id
    }

    public get name(): string {
        return this.props.name
    }

    public get email(): string {
        return this.props.email
    }

    public get phoneNumber(): string {
        return this.props.phoneNumber
    }

    public get role(): "AGENT" | "SUPERVISOR" | "ADM" {
        switch (this.props.role) {
            case RoleEnum.SUPERVISOR:
                return "SUPERVISOR"
            case RoleEnum.AGENT:
                return "AGENT"
            case RoleEnum.ADM:
                return "ADM"
        }
    }

    public get passwordHash(): string {
        return this.props.passwordHash
    }

    public get banned(): boolean {
        return this.props.banned
    }

    public get createdAt(): Date {
        return this.props.createdAt
    }
}