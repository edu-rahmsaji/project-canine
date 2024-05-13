import { Router } from "express";
import mongoose from "mongoose";
import { Session } from "../database/models/Session";

export const router = Router();

router.get("/", async (req, res) => {
    try {
        const sessions = await Session.find();
        return res.status(200).send({ success: true, message: "Sessions retrieved successfully", data: sessions });
    } catch (err) {
        console.log(`An error occurred whilst retrieving sessions : ${err.message}`);
        return res.status(500).send({ success: false, message: "Internal Server Error" });
    }
});

router.get("/:id", async (req, res) => {
    try {
        const session = await Session.findById(new mongoose.mongo.ObjectId(req.params.id));
        return res.status(200).send({ success: true, message: "Session retrieved successfully", data: session });
    } catch (err) {
        console.log(`An error occurred whilst retrieving a session : ${err.message}`);
        return res.status(500).send({ success: false, message: "Internal Server Error" });
    }
});

router.post("/", async (req, res) => {
    try {
        const newSession = await Session.create(req.body);
        return res.status(201).send({ success: true, message: "Session added successfully", data: newSession });
    } catch (err) {
        console.log(`An error occurred whilst creating a session : ${err.message}`);
        return res.status(500).send({ success: false, message: "Internal Server Error" });
    }
});

router.put("/:id", async (req, res) => {
    try {
        await Session.findByIdAndUpdate(req.params.id, { $set: { ...req.body } });
        return res.status(200).send({ success: true, message: "Updated a session successfully" });
    } catch (err) {
        console.log(`An error occurred whilst updating a session : ${err.message}`);
        return res.status(500).send({ success: false, message: "Internal Server Error" });
    }
});

router.delete("/:id", async (req, res) => {
    try {
        await Session.findByIdAndDelete(new mongoose.mongo.ObjectId(req.params.id));
        return res.status(200).send({ success: true, message: "Deleted a session successfully" });
    } catch (err) {
        console.log(`An error occurred whilst deleting a session : ${err.message}`);
        return res.status(500).send({ success: false, message: "Internal Server Error" });
    }
});
