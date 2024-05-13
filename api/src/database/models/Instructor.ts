import mongoose from "mongoose";
import { mailSchema } from "./Mail";
import { phoneSchema } from "./Phone";

const instructorSchema = new mongoose.Schema(
    {
        adresse: String,
        civilite: String,
        dateNaissance: Date,
        ecoleId: mongoose.Schema.ObjectId,
        nom: String,
        prenom: String,
        localite: {
            localite: String,
            npa: Number,
        },
        mails: [mailSchema],
        telephones: [phoneSchema],
    },
    { collection: "moniteur", versionKey: false }
);

export const Instructor = mongoose.model("Instructor", instructorSchema);
