export type FindAllUsersDTOOutput = {
    success:boolean,
    status_code:number,
    message?:string,
    users?:{
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
    }[]
}