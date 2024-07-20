import * as express from "express";
import { ObjectId } from "mongodb";
import { collections } from "./database";
import { Patients } from "./patients"; // Make sure to import the Patients interface

export const resultsRouter = express.Router();
resultsRouter.use(express.json());

resultsRouter.get("/:patientId", async (req, res) => {
    try {
        const patientId = req.params.patientId;
        const patient = await collections?.patients?.findOne({ PATIENT_ID: patientId });

        if (!patient) {
            res.status(404).send("Patient not found");
            return;
        }

        // Process the patient to generate the results objects
        const treatments = [];
        for (let i = 1; i <= 12; i++) {
            const treatmentType = patient[`TREATMENT_for_treatment_${i}`];
            if (treatmentType && treatmentType !== "0") {
                treatments.push({
                    PATIENT_ID: patient.PATIENT_ID,
                    treatment_num: i,
                    treatment_type: treatmentType,
                    agent: patient[`AGENT_for_treatment_${i}`] || "",
                    cicles_num: patient[`NUMBER_OF_CYCLES_for_treatment_${i}`] || 0,
                    dosage: patient[`DOSAGE_for_treatment_${i}`] || 0,
                    anatomic_size_treatment: patient[`ANATOMIC_site_for_treatment_${i}`] || "0",
                    _id: patient._id
                });
            }
        }

        res.status(200).send(treatments);
    } catch (error) {
        res.status(500).send(error instanceof Error ? error.message : "Unknown error");
    }
});