export type RefreshTokenProps = {
    id: string,
    userId: string,
    token: string,
    revoked: boolean,
    expiresAt: Date,
    createdAt: Date
}

export class RefreshToken{
    private constructor(private readonly props: RefreshTokenProps){}

    public static create(
        userId: string,
        token: string,
    ){
        const id = crypto.randomUUID().toString()
        const revoked = false
        const createdAt = new Date()
        const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)

        return new RefreshToken({
            id, userId, token, revoked, expiresAt, createdAt
        })
    }

    public static fromPersistance(props:RefreshTokenProps){
        return new RefreshToken(props)
    }

    public toPersistance(){
        return this.props
    }

    public get id(){
        return this.props.id
    }

    public get userId(){
        return this.props.userId
    }

    public get token(){
        return this.props.token
    }

    public get revoked(){
        return this.props.revoked
    }

    public get expiresAt(){
        return this.props.expiresAt
    }

    public get createAt(){
        return this.props.createdAt
    }
}