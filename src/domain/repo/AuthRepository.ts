import { RefreshToken } from "../entities/auth/RefreshToken";
import { User } from "../entities/users/User";

export interface AuthRepository{


    findById(id:string):Promise<User<any> | null>
    findByEmail(email:string):Promise<User<any> | null>
    findByRegistration(registration:string):Promise<User<any> | null>

    //=== Refresh Token ===
    createRefreshToken(token: RefreshToken):Promise<void>
    revokeTokenById(id:string):Promise<void>
    
    deleteTokensByUserId(userID:string):Promise<void>

    findTokenById(id: string):Promise<RefreshToken | null>
    findTokenByToken(token: string):Promise<RefreshToken | null>
    findTokensByUserId(token: string):Promise<RefreshToken[] | null>
    
}