import express from "express";

import getEnvs from "./env";
import connectDb from "./config/connectDb";


const app = express();

const { DB_URI, DB_NAME } = getEnvs();

connectDb(DB_URI, DB_NAME)
    .then(() => {
        app.get('/a', (req, res) => {
            res.send('Connected to database');
        });

        const port = PORT || 5000;
        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    })
    .catch(err => {
        console.error('Failed to connect to the database:', err);
    });


const {PORT} = getEnvs();
