import { DepositType, LarvicideType, PendingReason, PropertyType, VisitType } from "./enums/enum";

export type VisitFormProps = {
    id:string;

    visitDate: Date;
    localityCode: string;
    streetName: string;
    number: string;
    blockSide: string | undefined;
    complement: string | undefined;
    propertyType: PropertyType;
    residentName: string | undefined;
    phone: string | undefined;
    entryTime: string | undefined;
    visitType: VisitType;
    inspected: boolean;
    pendingReason: PendingReason | undefined;

    depositsWithFocus: boolean;
    depositType: DepositType | undefined;
    larvicideUsed: LarvicideType | undefined;
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
    treatmentLarvicideType: LarvicideType | undefined;
    larvicideAmount: number | undefined;
    perifocalDeposits: number;
    adulticideLoads: number;

    sampleCollected: boolean;
    sampleCode: string | undefined;
    tubeCount: number;

    notes: string | undefined;

    latitude: number | undefined;
    longitude: number | undefined;

    createdAt:Date;
    userId:string;
}

export class VisitForm {
    private constructor(
        private readonly props: VisitFormProps
    ) {}

    public static create(input: {
        visitDate: Date | string;
        localityCode: string;
        streetName: string;
        number: string;
        blockSide?: string | undefined;
        complement?: string | undefined;
        propertyType: PropertyType | string;
        residentName?: string | undefined;
        phone?: string | undefined;
        entryTime?: string | undefined;
        visitType: VisitType | string;
        inspected: boolean;
        pendingReason?: PendingReason | string | undefined;

        depositsWithFocus: boolean;
        depositType?: DepositType | string | undefined;
        larvicideUsed?: LarvicideType | string | undefined;
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
        treatmentLarvicideType?: LarvicideType | string | undefined;
        larvicideAmount?: number | undefined;
        perifocalDeposits: number;
        adulticideLoads: number;

        sampleCollected: boolean;
        sampleCode?: string | undefined;
        tubeCount: number;

        notes?: string | undefined;

        latitude?: number | undefined;
        longitude?: number | undefined;

        userId: string;
    }) {
        const id = crypto.randomUUID();
        const createdAt = new Date();

        const visitDate = this.parseDate(input.visitDate);
        const propertyType = this.parseEnum(PropertyType, input.propertyType, "propertyType");
        const visitType = this.parseEnum(VisitType, input.visitType, "visitType");
        const pendingReason = this.parseOptionalEnum(PendingReason, input.pendingReason);
        const depositType = this.parseOptionalEnum(DepositType, input.depositType);
        const larvicideUsed = this.parseOptionalEnum(LarvicideType, input.larvicideUsed);
        const treatmentLarvicideType = this.parseOptionalEnum(LarvicideType, input.treatmentLarvicideType);

        if (!input.localityCode.trim()) {
        throw new Error("localityCode is required");
        }

        if (!input.streetName.trim()) {
        throw new Error("streetName is required");
        }

        if (!input.number.trim()) {
        throw new Error("number is required");
        }

        if (!input.inspected && !pendingReason) {
        throw new Error("pendingReason is required when inspected is false");
        }

        if (input.depositsWithFocus && !depositType) {
        throw new Error("depositType is required when depositsWithFocus is true");
        }

        if (input.treatedDeposits < 0 || input.eliminatedDeposits < 0) {
        throw new Error("deposit counts cannot be negative");
        }

        const totalDeposits =
        input.depositsA1 +
        input.depositsA2 +
        input.depositsB +
        input.depositsC +
        input.depositsD1 +
        input.depositsD2 +
        input.depositsE;

        if (totalDeposits === 0 && input.depositsWithFocus) {
        throw new Error("at least one deposit must be informed when depositsWithFocus is true");
        }

        if (input.treatmentApplied) {
        if (!treatmentLarvicideType) {
            throw new Error("treatmentLarvicideType is required when treatmentApplied is true");
        }

        if (!input.larvicideAmount || input.larvicideAmount <= 0) {
            throw new Error("larvicideAmount must be greater than zero when treatmentApplied is true");
        }
        }

        if (input.sampleCollected) {
        if (!input.sampleCode?.trim()) {
            throw new Error("sampleCode is required when sampleCollected is true");
        }

        if (input.tubeCount <= 0) {
            throw new Error("tubeCount must be greater than zero when sampleCollected is true");
        }
        }

        if ((input.latitude && !input.longitude) || (!input.latitude && input.longitude)) {
        throw new Error("latitude and longitude must be provided together");
        }

        return new VisitForm({
        id,
        visitDate,
        localityCode: input.localityCode.trim(),
        streetName: input.streetName.trim(),
        number: input.number.trim(),
        blockSide: input.blockSide,
        complement: input.complement,
        propertyType,
        residentName: input.residentName,
        phone: input.phone,
        entryTime: input.entryTime,
        visitType,
        inspected: input.inspected,
        pendingReason,

        depositsWithFocus: input.depositsWithFocus,
        depositType,
        larvicideUsed,
        treatedDeposits: input.treatedDeposits,
        eliminatedDeposits: input.eliminatedDeposits,

        depositsA1: input.depositsA1,
        depositsA2: input.depositsA2,
        depositsB: input.depositsB,
        depositsC: input.depositsC,
        depositsD1: input.depositsD1,
        depositsD2: input.depositsD2,
        depositsE: input.depositsE,

        treatmentApplied: input.treatmentApplied,
        treatmentLarvicideType,
        larvicideAmount: input.larvicideAmount,
        perifocalDeposits: input.perifocalDeposits,
        adulticideLoads: input.adulticideLoads,

        sampleCollected: input.sampleCollected,
        sampleCode: input.sampleCode,
        tubeCount: input.tubeCount,

        notes: input.notes,

        latitude: input.latitude,
        longitude: input.longitude,

        createdAt,
        userId: input.userId
        });
    }

    static fromPersistence(props:VisitFormProps){
        return new VisitForm(props)
    }

    static parseEnum<T>(
        enumObj: T,
        value: unknown,
        field: string
    ): T[keyof T] {
        if (Object.values(enumObj as any).includes(value)) {
            return value as T[keyof T];
        }
        throw new Error(`Invalid value for ${field}`);
    }

    static parseOptionalEnum<T>(
        enumObj: T,
        value: unknown
    ): T[keyof T] | undefined {
        if (value === undefined || value === null || value === "") {
        return undefined;
        }
        if (Object.values(enumObj as any).includes(value)) {
        return value as T[keyof T];
        }
        throw new Error("Invalid enum value");
    }

    private static parseDate(value: Date | string): Date {
        const date = value instanceof Date ? value : new Date(value);
        if (isNaN(date.getTime())) {
        throw new Error("Invalid visitDate");
        }
        return date;
    }

    public get data() {
        return this.props;
    }

    public get id(){
        return this.props.id
    }
}