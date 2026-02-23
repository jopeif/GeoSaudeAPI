export type RefreshTokenDTOInput = {
    refreshToken: string
}

export type RefreshTokenDTOOutput = {
    success: boolean,
    status_code: number,
    message?:string | string[],
    user?:{
        id:string,
        access_token:string,
        refresh_token:string,
        role: "AGENT" | "SUPERVISOR" | "ADM"
    }
}

