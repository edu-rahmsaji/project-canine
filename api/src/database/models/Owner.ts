import mongoose from "mongoose";
import { mailSchema } from "./Mail";
import { phoneSchema } from "./Phone";

const ownerSchema = new mongoose.Schema(
    {
        adresse: String,
        certificatDelivre: {
            type: Date,
            required: false,
        },
        dateNaissance: Date,
        nom: String,
        origine: String,
        prenom: String,
        localite: {
            localite: String,
            npa: Number,
        },
        mails: [mailSchema],
        telephones: [phoneSchema],
    },
    { collection: "proprietaire", versionKey: false }
);

export const Owner = mongoose.model("Owner", ownerSchema);
