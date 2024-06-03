import mongoose from 'mongoose';

mongoose
    .connect(process.env.DB_URI! ?? "mongodb://localhost:27017/cours_canin")
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.log(err));
