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
    const owner = (await Owner.find({ _id: new mongoose.mongo.ObjectId(req.params.id) })).at(0);
    return res.status(200).send({ success: true, data: owner })
});

router.get("/:id/dogs", async (req, res) => {
    const dogs = JSON.parse(JSON.stringify(await Dog.find())).filter(dog => dog.proprietaireId === req.params.id);
    return res.status(200).send({ success: true, data: dogs })
});
