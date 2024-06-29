import express from "express";

import getEnvs from "./getEnvs";
import connectDb from "./config/connectDb";


const app = express();

const {DB_URI, DB_NAME, PORT} = getEnvs();

connectDb(DB_URI, DB_NAME)

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
