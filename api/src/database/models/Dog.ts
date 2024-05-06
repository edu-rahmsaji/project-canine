import mongoose from "mongoose";

const dogSchema = new mongoose.Schema({
    "_id": mongoose.Schema.ObjectId,
    "proprietaireId": mongoose.Schema.ObjectId,
    "identificationAmicus": String,
    "nom": String,
    "race": String,
    "male": Boolean,
    "dateNaissance": Date
}, { collection: "chien" });

export const Dog = mongoose.model("Dog", dogSchema);
