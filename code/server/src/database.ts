import * as mongodb from "mongodb";
import { Results } from "./results";
import { Patients } from "./patients";
import { Users } from "./users";
import { Person } from "./person";

export const collections: {
    results?: mongodb.Collection<Results>;
    patients?: mongodb.Collection<Patients>;
    users?: mongodb.Collection<Users>;
    person?: mongodb.Collection<Person>;
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
    
    const personCollection = db.collection<Person>("mycollection"); // Use Predictions for predictions
    collections.person = personCollection;

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
                    minLength: 5
                }
            },
        },
    };
    const jsonSchemaPersons = {
            $jsonSchema: {
                bsonType: "object",
                required: [
                    "PATIENT_ID",
                    "Diagnosis_Age",
                    "Race",
                    "Patient_Weight",
                    "CANCER_TYPE_DETAILED",
                    "TUMOR_TYPE",
                    "GRADE",
                    "MSI_SCORE_MANTIS",
                    "MSI_SENSOR_SCORE",
                    "TMB_NONSYNONYMOUS",
                    "TUMOR_NECROSIS_PERCENT",
                    "TUMOR_NUCLEI_PERCENT",
                    "TUMOR_WEIGHT",
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
                    Diagnosis_Age: {
                        bsonType: "int",
                        description: "'Diagnosis_Age' is required and is an integer",
                    },
                    Race: {
                        bsonType: "string",
                        description: "'Race' is required and is a string",
                    },
                    Patient_Weight: {
                        bsonType: "int",
                        description: "'Patient_Weight' is required and is an integer",
                    },
                    CANCER_TYPE_DETAILED: {
                        bsonType: "string",
                        description: "'CANCER_TYPE_DETAILED' is required and is a string",
                    },
                    TUMOR_TYPE: {
                        bsonType: "string",
                        description: "'TUMOR_TYPE' is required and is a string",
                    },
                    GRADE: {
                        bsonType: "string",
                        description: "'GRADE' is required and is a string",
                    },
                    MSI_SCORE_MANTIS: {
                        bsonType: "double",
                        description: "'MSI_SCORE_MANTIS' is required and is a double",
                    },
                    MSI_SENSOR_SCORE: {
                        bsonType: "double",
                        description: "'MSI_SENSOR_SCORE' is required and is a double",
                    },
                    TMB_NONSYNONYMOUS: {
                        bsonType: "double",
                        description: "'TMB_NONSYNONYMOUS' is required and is a double",
                    },
                    TUMOR_NECROSIS_PERCENT: {
                        bsonType: "int",
                        description: "'TUMOR_NECROSIS_PERCENT' is required and is an integer",
                    },
                    TUMOR_NUCLEI_PERCENT: {
                        bsonType: "int",
                        description: "'TUMOR_NUCLEI_PERCENT' is required and is an integer",
                    },
                    TUMOR_WEIGHT: {
                        bsonType: "int",
                        description: "'TUMOR_WEIGHT' is required and is an integer",
                    },
                    TREATMENT_for_treatment_1: {
                        bsonType: "string",
                        description: "'TREATMENT_for_treatment_1' is optional and is a string",
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
    // Apply schema validation to Person collection
    await db.command({
        collMod: "Persons",
        validator: jsonSchemaPersons
    }).catch(async (error: mongodb.MongoServerError) => {
        if (error.codeName === "NamespaceNotFound") {
            await db.createCollection("Persons", { validator: jsonSchemaPersons });
        }
    });
}