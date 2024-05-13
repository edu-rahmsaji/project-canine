import mongoose from "mongoose";

export const phoneSchema = new mongoose.Schema(
    {
        numero: String,
        type: String,
    },
    { _id: false }
);
