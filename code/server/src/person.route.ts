import * as express from "express";
import { ObjectId } from "mongodb";
import { collections } from "./database";
import { Person } from "./person";

export const personRouter = express.Router();
personRouter.use(express.json());

// Get all persons
personRouter.get("/", async (_req, res) => {
    try {
        const persons = await collections.person?.find({}).toArray();
        res.status(200).send(persons);
    } catch (error) {
        res.status(500).send(error instanceof Error ? error.message : "Unknown error");
    }
});

// Get a single person by PATIENT_ID
personRouter.get("/:id", async (req, res) => {
    try {
        const patientId = req.params.id;
        const person = await collections.person?.findOne({ PATIENT_ID: patientId });

        if (!person) {
            res.status(404).send("Person not found");
        } else {
            res.status(200).send(person);
        }
    } catch (error) {
        res.status(500).send(error instanceof Error ? error.message : "Unknown error");
    }
});

// Create a new person
personRouter.post("/", async (req, res) => {
    try {
        const newPerson: Person = req.body;
        const result = await collections.person?.insertOne(newPerson);

        if (result) {
            res.status(201).send(`Created a new person: ID ${result.insertedId}`);
        } else {
            res.status(500).send("Failed to create a new person.");
        }
    } catch (error) {
        res.status(400).send(error instanceof Error ? error.message : "Unknown error");
    }
});

// Update a person by PATIENT_ID
personRouter.put("/:id", async (req, res) => {
    try {
        const patientId = req.params.id;
        const updatedPerson: Person = req.body;
        const result = await collections.person?.updateOne(
            { PATIENT_ID: patientId },
            { $set: updatedPerson }
        );

        if (result && result.matchedCount) {
            res.status(200).send(`Updated a person: PATIENT_ID ${patientId}`);
        } else if (!result) {
            res.status(304).send(`Failed to update a person: PATIENT_ID ${patientId}`);
        } else if (!result.matchedCount) {
            res.status(404).send("Person not found");
        }
    } catch (error) {
        res.status(400).send(error instanceof Error ? error.message : "Unknown error");
    }
});

// Delete a person by PATIENT_ID
personRouter.delete("/:id", async (req, res) => {
    try {
        const patientId = req.params.id;
        const result = await collections.person?.deleteOne({ PATIENT_ID: patientId });

        if (result && result.deletedCount) {
            res.status(202).send(`Removed a person: PATIENT_ID ${patientId}`);
        } else if (!result) {
            res.status(400).send(`Failed to remove a person: PATIENT_ID ${patientId}`);
        } else if (!result.deletedCount) {
            res.status(404).send("Person not found");
        }
    } catch (error) {
        res.status(400).send(error instanceof Error ? error.message : "Unknown error");
    }
});