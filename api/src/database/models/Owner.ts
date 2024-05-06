import mongoose from "mongoose";

const mailSchema = new mongoose.Schema({
    mail: String,
    type: String,
});

const phoneSchema = new mongoose.Schema({
    numero: String,
    type: String,
});

const ownerSchema = new mongoose.Schema(
    {
        _id: mongoose.Schema.ObjectId,
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
    { collection: "proprietaire" }
);

export const Owner = mongoose.model("Owner", ownerSchema);
