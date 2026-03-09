import { VisitForm } from '../entities/visitForm/visitForm';
export interface VisitFormRepository{
    save(visit:VisitForm):Promise<void>
    delete(id:string):Promise<void>

    findById(id:string):Promise<VisitForm | null>
    findByUserId(userId:string):Promise<VisitForm[] | null>
    findByLocalityCode(localityCode:string):Promise<VisitForm[] | null>
    findByDate(date:Date):Promise<VisitForm[] | null>
}