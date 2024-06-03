import { Router } from "express";
import { Dog } from "../database/models/Dog";
import mongoose from "mongoose";
import { Owner } from "../database/models/Owner";

const ObjectId = mongoose.mongo.ObjectId;

export const router = Router();

router.get("/", async (req, res) => {
    const dogs = await Dog.find();
    return res.status(200).send({ success: true, message: "Dogs retrieved successfully", data: dogs })
});

router.get("/:id", async (req, res) => {
    try {
        const dog = await Dog.findById(new ObjectId(req.params.id));
        return res.status(200).send({ success: true, message: "Dog retrieved successfully", data: dog })
    } catch (err) {
        console.log(`An error occurred whilst retrieving a a dog : ${err.message}`);
        return res.status(500).send({ success: false, message: "Internal Server Error" });
    }
});

router.get("/:id/owner", async (req, res) => {
    try {
        const dog = await Dog.findById(new mongoose.mongo.ObjectId(req.params.id));
        const owner = await Owner.findById(dog!.proprietaireId);
        return res.status(200).send({ success: true, message: "Dog's owner retrieved successfully", data: owner })
    } catch (err) {
        console.log(`An error occurred whilst retrieving a dog's owner : ${err.message}`);
        return res.status(500).send({ success: false, message: "Internal Server Error" });
    }
});

router.post("/", async (req, res) => {
    try {
        const {
            dateNaissance,
            identificationAmicus,
            male,
            nom,
            race,
            proprietaireId } = req.body;

        const newDog = await Dog.create({
            dateNaissance,
            identificationAmicus,
            male,
            nom,
            race,
            proprietaireId: new mongoose.mongo.ObjectId(proprietaireId as string)
        });

        return res.status(201).send({ success: true, message: "Dog added successfully", data: newDog });
    } catch (err) {
        console.log(`An error occurred whilst creating a dog : ${err.message}`);
        return res.status(500).send({ success: false, message: "Internal Server Error" });
    }
});

router.put("/:id", async (req, res) => {
    try {
        const {
            dateNaissance,
            identificationAmicus,
            male,
            nom,
            race,
            proprietaireId } = req.body;

        await Dog.findByIdAndUpdate(
            new mongoose.mongo.ObjectId(req.params.id),
            {
                $set: {
                    dateNaissance,
                    identificationAmicus,
                    male,
                    nom,
                    race,
                    proprietaireId: new mongoose.mongo.ObjectId(proprietaireId as string)
                }
            });

        return res.status(200).send({ success: true, message: "Updated a dog successfully" });
    } catch (err) {
        console.log(`An error occurred whilst updating a dog : ${err.message}`);
        return res.status(500).send({ success: false, message: "Internal Server Error" });
    }
});

router.delete("/:id", async (req, res) => {
    try {
        await Dog.findByIdAndDelete(new mongoose.mongo.ObjectId(req.params.id));

        return res.status(200).send({ success: true, message: "Deleted a dog successfully" });
    } catch (err) {
        console.log(`An error occurred whilst deleting a dog : ${err.message}`);
        return res.status(500).send({ success: false, message: "Internal Server Error" });
    }
});
