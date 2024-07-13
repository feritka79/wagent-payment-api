import express from "express";

import getEnvs from "./config/getEnvs";
import connectDb from "./config/connectDb";
import userRoutes from "./routes/userRoutes";

const app = express();

const {DB_URI, DB_NAME, PORT} = getEnvs();

app.use('/users', userRoutes);

connectDb(DB_URI, DB_NAME)

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
