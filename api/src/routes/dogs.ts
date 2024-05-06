import { Router } from "express";
import { Dog } from "../database/models/Dog";
import mongoose from "mongoose";

export const router = Router();

router.get("/", async (req, res) => {
    const dogs = await Dog.find();
    return res.status(200).send({ success: true, data: dogs })
});

router.get("/:id", async (req, res) => {
    const dog = (await Dog.find({ _id: new mongoose.mongo.ObjectId(req.params.id) })).at(0);
    return res.status(200).send({ success: true, data: dog })
});
