import * as mongodb from "mongodb";
import { Results } from "./results";
import { Patients } from "./patients";
import { Users } from "./users";

export const collections: {
    results?: mongodb.Collection<Results>;
    patients?: mongodb.Collection<Patients>;
    users?: mongodb.Collection<Users>;
} = {};

export async function connectToDatabase(uri: string) {
    const client = new mongodb.MongoClient(uri);
    await client.connect();

    const db = client.db("CancerDB");


    const resultsCollection = db.collection<Results>("mycollection"); // Use mycollection for results
    collections.results = resultsCollection;

    const patientsCollection = db.collection<Patients>("mycollection"); // Use mycollection for patients
    collections.patients = patientsCollection;

    const usersCollection = db.collection<Users>("mycollection"); // Use mycollection for users
    collections.patients = patientsCollection;

    // Apply schema validation
    await applySchemaValidation(db);
}

async function applySchemaValidation(db: mongodb.Db) {
    const jsonSchema = {
        $jsonSchema: {
            bsonType: "object",
            required: [
                "PATIENT_ID",
                "treatment_num",
                "treatment_type",
                "agent",
                "cicles_num",
                "dosage",
                "anatomic_size_treatment"
            ],
            additionalProperties: false,
            properties: {
                _id: {},
                PATIENT_ID: {
                    bsonType: "string",
                    description: "'PATIENT_ID' is required and is a string",
                },
                treatment_num: {
                    bsonType: "int",
                    description: "'treatment_num' is required and is an integer",
                },
                treatment_type: {
                    bsonType: "string",
                    description: "'treatment_type' is required and is a string",
                },
                agent: {
                    bsonType: "string",
                    description: "'agent' is required and is a string",
                },
                cicles_num: {
                    bsonType: "int",
                    description: "'cicles_num' is required and is an integer",
                },
                dosage: {
                    bsonType: "int",
                    description: "'dosage' is required and is an integer",
                },
                anatomic_size_treatment: {
                    bsonType: "string",
                    description: "'anatomic_size_treatment' is required and is a string",
                }
            },
        },
    };
    const jsonSchemaPatients = {
        $jsonSchema: {
            bsonType: "object",
            required: [
                "PATIENT_ID"
            ],
            additionalProperties: false,
            properties: {
                _id: {},
                PATIENT_ID: {
                    bsonType: "string",
                    description: "'PATIENT_ID' is required and is a string",
                }
            },
        },
    };
    const jsonSchemaUsers = {
        $jsonSchema: {
            bsonType: "object",
            required: [
                "firstname",
                "lastname",
                "email",
                "password",
            ],
            additionalProperties: false,
            properties: {
                _id: {},
                firstname: {
                    bsonType: "string",
                    description: "'First Name' is required and is a string",
                },
                lastname: {
                    bsonType: "string",
                    description: "'Last Name' is required and is a string",
                },
                email: {
                    bsonType: "string",
                    description: "'Email' is required and is a string",
                },
                password: {
                    bsonType: "string",
                    description: "'Password' is required and is a string",
                    minLenght: 5
                }
            },
        },
    };

    // Try applying the modification to the collection, if the collection doesn't exist, create it
    await db.command({
        collMod: "Results",
        validator: jsonSchema
    }).catch(async (error: mongodb.MongoServerError) => {
        if (error.codeName === "NamespaceNotFound") {
            await db.createCollection("Results", {validator: jsonSchema});
        }
    });

     // Apply schema validation to the Patients collection
    await db.command({
        collMod: "Patients",
        validator: jsonSchemaPatients
    }).catch(async (error: mongodb.MongoServerError) => {
        if (error.codeName === "NamespaceNotFound") {
            await db.createCollection("Patients", { validator: jsonSchemaPatients });
        }
    });

        // Apply schema validation to the Users collection
    await db.command({
        collMod: "Users",
        validator: jsonSchemaUsers
    }).catch(async (error: mongodb.MongoServerError) => {
        if (error.codeName === "NamespaceNotFound") {
            await db.createCollection("Users", { validator: jsonSchemaUsers });
        }
    });
}