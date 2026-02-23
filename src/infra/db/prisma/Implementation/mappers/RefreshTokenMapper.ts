import { RefreshToken } from "../../../../../domain/entities/auth/RefreshToken";

export class RefreshTokenMapper{
    static toDomain(raw:any){
        return RefreshToken.fromPersistance({
            id: raw.id,
            userId: raw.userId,
            token: raw.token,
            revoked: raw.revoked,
            expiresAt: raw.expiresAt,
            createdAt: raw.createdat
        })
    }
}