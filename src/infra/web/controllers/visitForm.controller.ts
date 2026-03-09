import { Request, Response } from 'express';
import { CreateNewVisitUseCase } from '../../../application/UseCases/visitForm/CreateNewVisitUseCase';
import { DeleteVisitUseCase } from '../../../application/UseCases/visitForm/DeleteVisitUseCase';
import { FindVisitByIdUseCase } from '../../../application/UseCases/visitForm/FindVisitByIdUseCase';
import { FindVisitsByUserIdUseCase } from '../../../application/UseCases/visitForm/FindVisitsByUserIdUseCase';
import { FindVisitsByZipCodeUseCase } from '../../../application/UseCases/visitForm/FindVisitsByZipCodeUseCase';
import { FindVisitsOnDateUseCase } from '../../../application/UseCases/visitForm/FindVisitsOnDateUseCase';

export class VisitFormController{

    constructor(
        private readonly createNewVisitUC:CreateNewVisitUseCase,
        private readonly deleteVisitUC:DeleteVisitUseCase,

        private readonly findByIdUC: FindVisitByIdUseCase,
        private readonly findByUserIdUC: FindVisitsByUserIdUseCase,
        private readonly findByZipCodeUC: FindVisitsByZipCodeUseCase,
        private readonly findOnDateUC: FindVisitsOnDateUseCase,
    ){}

    async createNewVisit(req:Request, res:Response){
        try {
            
            const {
                visitDate,
                localityCode,
                streetName,
                number,
                blockSide,
                complement,
                propertyType,
                residentName,
                phone,
                entryTime,
                visitType,
                inspected,
                pendingReason,

                depositsWithFocus,
                depositType,
                larvicideUsed,
                treatedDeposits,
                eliminatedDeposits,

                depositsA1,
                depositsA2,
                depositsB,
                depositsC,
                depositsD1,
                depositsD2,
                depositsE,

                treatmentApplied,
                treatmentLarvicideType,
                larvicideAmount,
                perifocalDeposits,
                adulticideLoads,

                sampleCollected,
                sampleCode,
                tubeCount,

                notes,

                latitude,
                longitude
            } = req.body

            const userId = req.user!.sub

            const result = await this.createNewVisitUC.execute({
                visitDate,
                localityCode,
                streetName,
                number,
                blockSide,
                complement,
                propertyType,
                residentName,
                phone,
                entryTime,
                visitType,
                inspected,
                pendingReason,

                depositsWithFocus,
                depositType,
                larvicideUsed,
                treatedDeposits,
                eliminatedDeposits,

                depositsA1,
                depositsA2,
                depositsB,
                depositsC,
                depositsD1,
                depositsD2,
                depositsE,

                treatmentApplied,
                treatmentLarvicideType,
                larvicideAmount,
                perifocalDeposits,
                adulticideLoads,

                sampleCollected,
                sampleCode,
                tubeCount,

                notes,

                latitude,
                longitude,

                userId
            })

            if(!result.success){
                return res.status(result.status_code).json({
                    success:false,
                    message:result.message
                })
            }else{
                return res.status(result.status_code).json({
                    success:true,
                    id:result.id
                })
            }

        } catch (error) {
            return res.status(500).json({
                success:false,
                message:error
            })
        }
    }

    async deleteVisit(req:Request, res:Response){
        try {
            const {id} = req.params

            if(!id || id==="" || (typeof id) != "string"){
                return res.status(400).json({sucess:false, message:"No id was sent."})
            }

            const result = await this.deleteVisitUC.execute({id})

            if(!result.success){
                return res.status(result.status_code).json({
                    success:false,
                    message:result.message
                })
            }else{
                return res.status(result.status_code).json({
                    success:true
                })
            }
        } catch (error) {
            return res.status(500).json({
                success:false,
                message:error
            })
        }
    }

    //GET
    async findById(req:Request, res:Response){
        try {
            const {id} = req.params

            if(!id || id==="" || (typeof id) != "string"){
                return res.status(400).json({sucess:false, message:"No id was sent."})
            }

            const result = await this.findByIdUC.execute({id})

            if(!result.success){
                return res.status(result.status_code).json({
                    success:false,
                    message:result.message
                })
            }else{
                return res.status(result.status_code).json({
                    success:true,
                    visitForm:result.visitForm
                })
            }

        } catch (error) {
            return res.status(500).json({
                success:false,
                message:error
            })
        }
    }

    async findByUserId(req:Request, res:Response){
        try{
            const {userId} = req.params
            if(!userId || userId==="" || (typeof userId) != "string"){
                return res.status(400).json({sucess:false, message:"No id was sent."})
            }

            const result = await this.findByUserIdUC.execute({userId})

            if(!result.success){
                return res.status(result.status_code).json({
                    success:false,
                    message:result.message
                })
            }else{
                return res.status(result.status_code).json({
                    success:true,
                    visitForm:result.visitForms
                })
            }

        } catch (error) {
            return res.status(500).json({
                success:false,
                message:error
            })
        }
    }

    async findByZipCode(req:Request, res:Response){
        try {
            const {zipCode} = req.params
            if(!zipCode || zipCode==="" || (typeof zipCode) != "string"){
                return res.status(400).json({sucess:false, message:"No zip code was sent."})
            }

            const result = await this.findByZipCodeUC.execute({zipCode})
            if(!result.success){
                return res.status(result.status_code).json({
                    success:false,
                    message:result.message
                })
            }else{
                return res.status(result.status_code).json({
                    success:true,
                    visitForm:result.visitForms
                })
            }
        } catch (error) {
            return res.status(500).json({
                success:false,
                message:error
            })
        }
    }

    async findOnDate(req:Request, res:Response){
        try {
            const date = req.query.date as string

            if(!date || date.trim()==""){
                return res.status(400).json({
                    sucess:false,
                    message:"No date was sent."
                })
            }

            const result = await this.findOnDateUC.execute({date})

            if(!result.success){
                return res.status(result.status_code).json({
                    success:false,
                    message:result.message
                })
            }else{
                return res.status(result.status_code).json({
                    success:true,
                    visitForm:result.visitForms
                })
            }
        } catch (error) {
            return res.status(500).json({
                success:false,
                message:(error as Error).message
            })
        }
    }

    
}