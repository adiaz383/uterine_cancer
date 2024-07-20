import * as mongodb from "mongodb";

export interface Users {
    firstname: string;
    lastname: string;
    email: string;
    password: string;
    _id?: mongodb.ObjectId;
}