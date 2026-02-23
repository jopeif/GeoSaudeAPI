export type RegisterAgentDTOInput = {
    name:string,
    email:string,
    password:string,
    phoneNumber:string,
    block:string,
    registration:string
}

export type RegisterAgentDTOOutput = {
    success:boolean,
    status_code:number,
    message?:string | string[],
    id?:string
}