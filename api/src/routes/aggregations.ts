// This files is only for showing how to use the different aggregation methods.
import { Router } from "express";
import mongoose from "mongoose";
import { Session } from "../database/models/Session";
import { Dog } from "../database/models/Dog";
import { Owner } from "../database/models/Owner";

const ObjectId = mongoose.mongo.ObjectId;

export const router = Router();

router.get("/unwind", async (req, res) => {
    const sessions = await Session.aggregate().unwind("$participations").exec();
    return res.status(200).send(sessions);
});

router.get("/match", async (req, res) => {
    const dogs = await Dog.aggregate().match({ race: "Teckel" }).exec();
    return res.status(200).send(dogs);
});

router.get("/lookup", async (req, res) => {
    const dogs = await Dog.aggregate()
        .lookup({
            pipeline: [
                // @ts-ignore
                { $documents: await Owner.find() },
            ],
            localField: "proprietaireId",
            foreignField: "_id",
            as: "owner"
        }).exec();
    return res.status(200).send(dogs)
});

router.get("/project", async (req, res) => {
    const dogs = await Dog.aggregate()
        .project({
            "_id": 0,
            "nom": 1,
            "race": 1
        }).exec();
    return res.status(200).send(dogs)
});

router.get("/group", async (req, res) => {
    const dogs = await Dog.aggregate()
        .group({ "_id": "$nom" }).exec();
    return res.status(200).send(dogs)
});
