export interface PasswordHasher{
    hashPassword(password: string): Promise<string>
    comparePassword(password: string, realPassword: string): Promise<boolean>

}