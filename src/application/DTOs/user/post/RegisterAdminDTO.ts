export type RegisterAdminDTOInput = {
    name:string,
    email:string,
    password:string,
    phoneNumber:string,
    accessLevel:number
}

export type RegisterAdminDTOOutput = {
    success:boolean,
    status_code:number,
    message?:string | string[],
    id?:string
}