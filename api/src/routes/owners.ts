import { Router } from "express";
import mongoose from "mongoose";
import { Owner } from "../database/models/Owner";
import { Dog } from "../database/models/Dog";

export const router = Router();

router.get("/", async (req, res) => {
    const owners = await Owner.find();
    return res.status(200).send({ success: true, data: owners })
});

router.get("/:id", async (req, res) => {
    const owner = await Owner.findById(new mongoose.mongo.ObjectId(req.params.id));
    return res.status(200).send({ success: true, data: owner })
});

router.post("/", async (req, res) => {
    try {
        const {
            adresse,
            certificatDelivre,
            dateNaissance,
            nom,
            origine,
            prenom,
            localite,
            mails,
            telephones } = req.body;

        const newOwner = await Owner.create(
            {
                adresse,
                certificatDelivre,
                dateNaissance,
                nom,
                origine,
                prenom,
                localite,
                mails,
                telephones
            }
        );

        return res.status(201).send({ success: true, message: "Owner added successfully", data: newOwner });
    } catch (err) {
        console.log(`An error occurred whilst creating an owner : ${err.message}`);
        return res.status(500).send({ success: false, message: "Internal Server Error" });
    }
});

router.put("/:id", async (req, res) => {
    try {
        const {
            adresse,
            certificatDelivre,
            dateNaissance,
            nom,
            origine,
            prenom,
            localite,
            mails,
            telephones } = req.body;

        await Owner.findByIdAndUpdate(
            new mongoose.mongo.ObjectId(req.params.id),
            {
                $set: {
                    adresse,
                    certificatDelivre,
                    dateNaissance,
                    nom,
                    origine,
                    prenom,
                    localite: localite ? JSON.parse(localite) : null,
                    mails: mails ? JSON.parse(mails) : null,
                    telephones: telephones ? JSON.parse(telephones) : null
                }
            });

        return res.status(200).send({ success: true, message: "Updated an owner successfully" });
    } catch (err) {
        console.log(`An error occurred whilst updating an owner : ${err.message}`);
        return res.status(500).send({ success: false, message: "Internal Server Error" });
    }
});

router.delete("/:id", async (req, res) => {
    try {
        await Owner.findByIdAndDelete(new mongoose.mongo.ObjectId(req.params.id));

        return res.status(200).send({ success: true, message: "Deleted an owner successfully" });
    } catch (err) {
        console.log(`An error occurred whilst deleting an owner : ${err.message}`);
        return res.status(500).send({ success: false, message: "Internal Server Error" });
    }
});

router.get("/:id/dogs", async (req, res) => {
    const dogs = JSON.parse(JSON.stringify(await Dog.find())).filter(dog => dog.proprietaireId === req.params.id);
    return res.status(200).send({ success: true, data: dogs })
});
