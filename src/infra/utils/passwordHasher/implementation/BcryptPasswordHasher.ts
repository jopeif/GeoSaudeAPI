import { hash } from "bcrypt"
import bcrypt from "bcrypt";
import { PasswordHasher } from "../PasswordHasher";

export class BcryptPasswordHasher implements PasswordHasher{
    public async hashPassword(password: string): Promise<string>{
        try{
            const saltRounds = Number(process.env.SALT_ROUNDS) || 10;
            return await hash(password, saltRounds)
        }catch(error){
            throw error
        }
    }

    public async comparePassword(password: string, realPassword: string): Promise<boolean>{
        try{
            return await bcrypt.compare(password, realPassword)
        }catch(error){
            throw error
        }
    }
}