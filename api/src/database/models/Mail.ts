import mongoose from "mongoose";

export const mailSchema = new mongoose.Schema(
    {
        mail: String,
        type: String,
    },
    { _id: false }
);
