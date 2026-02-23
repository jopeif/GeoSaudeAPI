export interface JwtPayload {
    sub: string; 
    role: "ADM" | "AGENT" | "SUPERVISOR";
}