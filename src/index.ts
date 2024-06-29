import express from "express";

import getEnvs from "./getEnvs";
import connectDb from "./config/connectDb";


const app = express();

const {DB_URI, DB_NAME, PORT} = getEnvs();

connectDb(DB_URI, DB_NAME)
    .then(() => {
        console.log('Connected to the database');
    })
    .catch(err => {
        console.error('Failed to connect to the database:', err);
    });
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
