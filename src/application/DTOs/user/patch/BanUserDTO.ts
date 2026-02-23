export type BanUserDTOInput = {
    id:string
}

export type BanUserDTOOutput = {
    success:boolean,
    status_code:number,
    message?:string
}