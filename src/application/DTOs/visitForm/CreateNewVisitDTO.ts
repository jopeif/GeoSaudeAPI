export type CreateNewVisitDTOInput = {
    visitDate: string;
    localityCode: string;
    streetName: string;
    number: string;
    blockSide: string | undefined;
    complement: string | undefined;
    propertyType: "RESIDENTIAL" | "COMMERCIAL" | "VACANT LOT" | "STRATEGIC POINT" | "HEALTH FACILITY" | "SCHOOL" | "OTHER";
    residentName: string | undefined;
    phone: string | undefined;
    entryTime: string | undefined;
    visitType: "ROUTINE" | "RECOVERY" | "LIRAA" | "BLOCKING";
    inspected: boolean;
    pendingReason: "NONE" | "RESIDENT REFUSED" | "PROPERTY CLOSED" | "ABSENT" | "ABANDONED PROPERTY" | "OTHER" | undefined;

    depositsWithFocus: boolean;
    depositType: "A1" | "A2" | "B" | "C" | "D1" | "D2" | "E" | undefined;
    larvicideUsed: "NONE" | "BTI" | "PYRIPROXYFEN" | "DIFLUBENZURON" | "TEMEPHOS" | "OTHER" | undefined;
    treatedDeposits: number;
    eliminatedDeposits: number;

    depositsA1: number;
    depositsA2: number;
    depositsB: number;
    depositsC: number;
    depositsD1: number;
    depositsD2: number;
    depositsE: number;

    treatmentApplied: boolean;
    treatmentLarvicideType: "NONE" | "BTI" | "PYRIPROXYFEN" | "DIFLUBENZURON" | "TEMEPHOS" | "OTHER" | undefined;
    larvicideAmount: number | undefined;
    perifocalDeposits: number;
    adulticideLoads: number;

    sampleCollected: boolean;
    sampleCode: string | undefined;
    tubeCount: number;

    notes: string | undefined;

    latitude: number | undefined;
    longitude: number | undefined;

    userId:string;
}

export type CreateNewVisitDTOOutput = {
    success: boolean,
    status_code: number,
    message?: string,
    id?: string
}