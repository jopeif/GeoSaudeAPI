export type FindUserByIdDTOInput = {
    id:string
}
export type FindUserByIdDTOOutput = {
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