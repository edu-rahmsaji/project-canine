import { Router } from "express";
import mongoose from "mongoose";
import { Instructor } from "../database/models/Instructor";
import { School } from "../database/models/School";

export const router = Router();

router.get("/", async (req, res) => {
    try {
        const instructors = await Instructor.find();
        return res.status(200).send({ success: true, message: "Instructors retrieved successfully", data: instructors });
    } catch (err) {
        console.log(`An error occurred whilst retrieving instructors : ${err.message}`);
        return res.status(500).send({ success: false, message: "Internal Server Error" });
    }
});

router.get("/:id", async (req, res) => {
    try {
        const instructor = await Instructor.findById(new mongoose.mongo.ObjectId(req.params.id));
        return res.status(200).send({ success: true, message: "Instructor retrieved successfully", data: instructor });
    } catch (err) {
        console.log(`An error occurred whilst retrieving an instructor : ${err.message}`);
        return res.status(500).send({ success: false, message: "Internal Server Error" });
    }
});

router.post("/", async (req, res) => {
    try {
        const newInstructor = await Instructor.create(req.body);
        return res.status(201).send({ success: true, message: "Instructor added successfully", data: newInstructor });
    } catch (err) {
        console.log(`An error occurred whilst creating an instructor : ${err.message}`);
        return res.status(500).send({ success: false, message: "Internal Server Error" });
    }
});

router.put("/:id", async (req, res) => {
    try {
        await Instructor.findByIdAndUpdate(req.params.id, { $set: { ...req.body } });
        return res.status(200).send({ success: true, message: "Updated an instructor successfully" });
    } catch (err) {
        console.log(`An error occurred whilst updating an instructor : ${err.message}`);
        return res.status(500).send({ success: false, message: "Internal Server Error" });
    }
});

router.delete("/:id", async (req, res) => {
    try {
        await Instructor.findByIdAndDelete(new mongoose.mongo.ObjectId(req.params.id));
        return res.status(200).send({ success: true, message: "Deleted an instructor successfully" });
    } catch (err) {
        console.log(`An error occurred whilst deleting an instructor : ${err.message}`);
        return res.status(500).send({ success: false, message: "Internal Server Error" });
    }
});

router.get("/:id/school", async (req, res) => {
    try {
        const instructor = await Instructor.findById(new mongoose.mongo.ObjectId(req.params.id));
        const school = await School.findById(instructor!.ecoleId);

        return res.status(200).send({ success: true, message: "Instructor's school retrieved successfully", data: school });
    } catch (err) {
        console.log(`An error occurred whilst retrieving an instructor's school : ${err.message}`);
        return res.status(500).send({ success: false, message: "Internal Server Error" });
    }
});
