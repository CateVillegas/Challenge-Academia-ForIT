const express = require('express');
const cors = require("cors");
const { errorHandler } = require("./middlewares/errorHandler");
const { router: tasksRouter } = require("./routes/tasks.routes");

const app = express();

//permite parsear json en req body
app.use(express.json());

// permite llamadas desde el frontend (vite) en el browser
app.use(
    cors({
        origin: process.env.CORS_ORIGIN || "*",
    })
);

// logger middleware
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});


//Hago un endpoint tecnico para verificar que el servidor esta vivo. 
app.get("/health", (req,res) => {
    res.status(200).json({ok: true});
});

//routes
app.use("/api/tasks", tasksRouter);


// error handler
app.use(errorHandler);

module.exports = { app };
