import * as mongodb from "mongodb";

export interface Results {
    PATIENT_ID: string;
    treatment_num:number;
    treatment_type: string;
    agent: string;
    cicles_num:number;
    dosage:number;
    anatomic_size_treatment:string;
    _id?: mongodb.ObjectId;
}