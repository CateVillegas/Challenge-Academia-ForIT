const express = require('express');
const cors = require("cors");

const app = express();

//permite parsear json en req body
app.use(express.json());

// permite llamadas desde el frontend (vite) en el browser
app.use(
    cors({
        origin: process.env.CORS_ORIGIN || "*",
    })
);

//Hago un enpoint tecnico para verificar que el servidor esta vivo. 
app.get("/health", (req,res) => {
    res.status(200).json({ok: true});
});

module.exports = { app };
