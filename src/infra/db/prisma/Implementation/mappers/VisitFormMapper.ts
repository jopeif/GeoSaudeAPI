
import { VisitForm } from "../../../../../domain/entities/visitForm/visitForm";
import {
    DepositType,
    LarvicideType,
    PendingReason,
    PropertyType,
    VisitType
} from "./../../../../../domain/entities/visitForm/enums/enum"

import {
    PropertyType as PrismaPropertyType,
    VisitType as PrismaVisitType,
    DepositType as PrismaDepositType,
    LarvicideType as PrismaLarvicideType,
    PendingReason as PrismaPendingReason,
} from "../../../../../generated/prisma/enums"

export class VisitFormMapper {

    private static mapRequiredEnum<
        TDomain extends string,
        TPrisma extends Record<string, string>
        >(
        value: TDomain,
        prismaEnum: TPrisma
        ): TPrisma[keyof TPrisma] {
        return prismaEnum[value]
    }

    private static mapOptionalEnum<
            TDomain extends string,
            TPrisma extends Record<string, string>
            >(
            value: TDomain | undefined,
            prismaEnum: TPrisma
            ): TPrisma[keyof TPrisma] | null {
            if (value === undefined) return null
            return prismaEnum[value]
        }

    static toPrisma(visitForm: VisitForm) {
        const props = visitForm.data;

        return {
            id: props.id,
            visitDate: props.visitDate,
            localityCode: props.localityCode,
            streetName: props.streetName,
            number: props.number,
            blockSide: props.blockSide ?? null,
            complement: props.complement ?? null,

            propertyType: this.mapRequiredEnum(props.propertyType, PrismaPropertyType),
            visitType: this.mapRequiredEnum(props.visitType, PrismaVisitType),
            pendingReason: this.mapOptionalEnum(props.pendingReason, PrismaPendingReason) ?? null,

            residentName: props.residentName ?? null,
            phone: props.phone ?? null,
            entryTime: props.entryTime ?? null,
            inspected: props.inspected,

            depositsWithFocus: props.depositsWithFocus,
            depositType: this.mapOptionalEnum(props.depositType, PrismaDepositType) ?? null,
            larvicideUsed: this.mapOptionalEnum(props.larvicideUsed, PrismaLarvicideType) ?? null,
            treatedDeposits: props.treatedDeposits,
            eliminatedDeposits: props.eliminatedDeposits,

            depositsA1: props.depositsA1,
            depositsA2: props.depositsA2,
            depositsB: props.depositsB,
            depositsC: props.depositsC,
            depositsD1: props.depositsD1,
            depositsD2: props.depositsD2,
            depositsE: props.depositsE,

            treatmentApplied: props.treatmentApplied,
            treatmentLarvicideType: this.mapOptionalEnum(
                props.treatmentLarvicideType,
                PrismaLarvicideType
            ) ?? null,
            larvicideAmount: props.larvicideAmount ?? null,
            perifocalDeposits: props.perifocalDeposits,
            adulticideLoads: props.adulticideLoads,

            sampleCollected: props.sampleCollected,
            sampleCode: props.sampleCode ?? null,
            tubeCount: props.tubeCount,

            notes: props.notes ?? null,

            latitude: props.latitude ?? null,
            longitude: props.longitude ?? null,

            createdAt: props.createdAt,
            userId: props.userId,
            }
    }

    static toDomain(raw: any): VisitForm {
        return VisitForm.fromPersistence({
        id: raw.id,
        visitDate: raw.visitDate,
        localityCode: raw.localityCode,
        streetName: raw.streetName,
        number: raw.number,
        blockSide: raw.blockSide,
        complement: raw.complement,
        propertyType: raw.propertyType as PropertyType,
        residentName: raw.residentName,
        phone: raw.phone,
        entryTime: raw.entryTime,
        visitType: raw.visitType as VisitType,
        inspected: raw.inspected,
        pendingReason: raw.pendingReason as PendingReason | undefined,

        depositsWithFocus: raw.depositsWithFocus,
        depositType: raw.depositType as DepositType | undefined,
        larvicideUsed: raw.larvicideUsed as LarvicideType | undefined,
        treatedDeposits: raw.treatedDeposits,
        eliminatedDeposits: raw.eliminatedDeposits,

        depositsA1: raw.depositsA1,
        depositsA2: raw.depositsA2,
        depositsB: raw.depositsB,
        depositsC: raw.depositsC,
        depositsD1: raw.depositsD1,
        depositsD2: raw.depositsD2,
        depositsE: raw.depositsE,

        treatmentApplied: raw.treatmentApplied,
        treatmentLarvicideType: raw.treatmentLarvicideType as LarvicideType | undefined,
        larvicideAmount: raw.larvicideAmount,
        perifocalDeposits: raw.perifocalDeposits,
        adulticideLoads: raw.adulticideLoads,

        sampleCollected: raw.sampleCollected,
        sampleCode: raw.sampleCode,
        tubeCount: raw.tubeCount,

        notes: raw.notes,

        latitude: raw.latitude,
        longitude: raw.longitude,

        createdAt: raw.createdAt,
        userId: raw.userId,
        });
    }
}