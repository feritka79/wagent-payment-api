import express from "express";

import getEnvs from "./env";
import connectDb from "./config/connectDb";
import userRoutes from "./routes/userRoutes";


const app = express();

const { DB_URI, DB_NAME } = getEnvs();

connectDb(DB_URI, DB_NAME)
    .then(() => {
        app.get('/a', (req, res) => {
            res.send('Connected to database');
        });

        const PORT = process.env.PORT || 3000;
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch(err => {
        console.error('Failed to connect to the database:', err);
    });


const {PORT} = getEnvs();

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
