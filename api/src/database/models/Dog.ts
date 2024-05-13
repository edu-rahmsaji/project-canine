import mongoose from "mongoose";

const dogSchema = new mongoose.Schema({
    "proprietaireId": mongoose.Schema.ObjectId,
    "identificationAmicus": String,
    "nom": String,
    "race": String,
    "male": Boolean,
    "dateNaissance": Date
}, { collection: "chien", versionKey: false });

export const Dog = mongoose.model("Dog", dogSchema);
