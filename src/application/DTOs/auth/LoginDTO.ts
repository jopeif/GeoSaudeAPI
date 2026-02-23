export type LoginDTOInput = {
    login:string
    password:string
}

export type LoginDTOOutput = {
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