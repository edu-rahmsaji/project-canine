import mongoose from "mongoose";

const participationSchema = new mongoose.Schema(
    {
        chienId: mongoose.Schema.ObjectId,
        avecProprietaire: Boolean,
    },
    { _id: false }
);

const sessionSchema = new mongoose.Schema(
    {
        date: Date,
        dureeM: Number,
        moniteurId: mongoose.Schema.ObjectId,
        places: Number,
        cours: {
            niveau: String,
            tarif: Number,
            type: {
                type: String
            },
        },
        participations: [participationSchema],
    },
    { collection: "session", versionKey: false }
);

export const Session = mongoose.model("Session", sessionSchema);
