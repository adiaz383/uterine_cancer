import * as mongodb from "mongodb";

export interface Patients {
    PATIENT_ID: string;
    [key: string]: any;
    _id?: mongodb.ObjectId;
}