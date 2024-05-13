import { Router } from "express";
import mongoose from "mongoose";
import { School } from "../database/models/School";
import { Instructor } from "../database/models/Instructor";

export const router = Router();

router.get("/", async (req, res) => {
    const schools = await School.find();
    return res.status(200).send({ success: true, message: "Schools retrieved successfully", data: schools })
});

router.get("/:id", async (req, res) => {
    const school = await School.findById(new mongoose.mongo.ObjectId(req.params.id));
    return res.status(200).send({ success: true, message: "School retrieved successfully", data: school })
});

router.post("/", async (req, res) => {
    try {
        const {
            adresse,
            nom,
            localite,
            mails,
            telephones } = req.body;

        const newSchool = await School.create(
            {
                adresse,
                nom,
                localite,
                mails,
                telephones
            }
        );

        return res.status(201).send({ success: true, message: "School added successfully", data: newSchool });
    } catch (err) {
        console.log(`An error occurred whilst creating a school : ${err.message}`);
        return res.status(500).send({ success: false, message: "Internal Server Error" });
    }
});

router.put("/:id", async (req, res) => {
    try {
        const {
            adresse,
            nom,
            localite,
            mails,
            telephones } = req.body;

        await School.findByIdAndUpdate(
            new mongoose.mongo.ObjectId(req.params.id),
            {
                $set: {
                    adresse,
                    nom,
                    localite: localite ? JSON.parse(localite) : null,
                    mails: mails ? JSON.parse(mails) : null,
                    telephones: telephones ? JSON.parse(telephones) : null
                }
            }
        );

        return res.status(200).send({ success: true, message: "School updated successfully" });
    } catch (err) {
        console.log(`An error occurred whilst updating a school : ${err.message}`);
        return res.status(500).send({ success: false, message: "Internal Server Error" });
    }
});

router.delete("/:id", async (req, res) => {
    try {
        await School.findByIdAndDelete(new mongoose.mongo.ObjectId(req.params.id));

        return res.status(200).send({ success: true, message: "School deleted successfully" });
    } catch (err) {
        console.log(`An error occurred whilst deleting a school : ${err.message}`);
        return res.status(500).send({ success: false, message: "Internal Server Error" });
    }
});

router.get("/:id/instructors", async (req, res) => {
    try {
        const instructors = await Instructor.find({ ecoleId: new mongoose.mongo.ObjectId(req.params.id as string) });

        return res.status(200).send({ success: true, message: "School's instructors retrieved successfully", data: instructors });
    } catch (err) {
        console.log(`An error occurred whilst retrieving a school's instructors : ${err.message}`);
        return res.status(500).send({ success: false, message: "Internal Server Error" });
    }
});
