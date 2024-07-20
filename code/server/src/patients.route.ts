import * as express from "express";
import { ObjectId } from "mongodb";
import { collections } from "./database";

export const patientsRouter = express.Router();
patientsRouter.use(express.json());

patientsRouter.get("/", async (_req, res) => {
    try {
        console.log("Fetching patient IDs..."); // Add logging
        const patients = await collections?.patients?.find({}, { projection: { PATIENT_ID: 1, _id: 0 } }).toArray();
        console.log("Patient IDs fetched:", patients); // Add logging
        res.status(200).send(patients);
    } catch (error) {
        console.error("Error fetching patient IDs:", error); // Add logging
        res.status(500).send(error instanceof Error ? error.message : "Unknown error");
    }
});