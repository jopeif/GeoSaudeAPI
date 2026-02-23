export type FindUserByRegistrationDTOInput = {
    registration:string
}
export type FindUserByRegistrationDTOOutput = {
    success:boolean,
    status_code:number,
    message?:string,
    user?:{
        id:string,
        name:string,
        email:string,
        role:"ADM" | "AGENT"| "SUPERVISOR",
        phoneNumber:string,
        banned:boolean,
        createdAt:Date
        registration?:string,
        block?:string,
        accessLevel?:number
    }
    
}