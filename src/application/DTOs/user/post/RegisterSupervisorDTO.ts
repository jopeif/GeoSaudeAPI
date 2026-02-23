export type RegisterSupervisorDTOInput = {
    name:string,
    email:string,
    password:string,
    phoneNumber:string,
    registration:string
}

export type RegisterSupervisorDTOOutput = {
    success:boolean,
    status_code:number,
    message?:string | string[],
    id?:string
}