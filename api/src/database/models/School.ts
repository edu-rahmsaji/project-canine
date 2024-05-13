import mongoose from "mongoose";
import { mailSchema } from "./Mail";
import { phoneSchema } from "./Phone";

const schoolSchema = new mongoose.Schema(
    {
        adresse: String,
        nom: String,
        localite: {
            localite: String,
            npa: Number,
        },
        mails: [mailSchema],
        telephones: [phoneSchema],
    },
    { collection: "ecole", versionKey: false }
);

export const School = mongoose.model("School", schoolSchema);
