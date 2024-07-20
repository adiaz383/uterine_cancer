import * as mongodb from "mongodb";

export interface Person {
    PATIENT_ID: string;
    'Diagnosis Age' : number;
    Race: string;
    'Patient Weight': number;
    CANCER_TYPE_DETAILED: string;
    TUMOR_TYPE: string;
    GRADE: string;
    MSI_SCORE_MANTIS: number;
    MSI_SENSOR_SCORE: number;
    TMB_NONSYNONYMOUS: number;
    TUMOR_NECROSIS_PERCENT: number;
    TUMOR_NUCLEI_PERCENT: number;
    TUMOR_WEIGHT: number;
    treatment_num:number;
    treatment_type: string;
    agent: string;
    cicles_num:number;
    dosage:number;
    anatomic_size_treatment:string;
    TREATMENT_for_treatment_1?: string; // This will be the predicted value
    _id?: mongodb.ObjectId;
}