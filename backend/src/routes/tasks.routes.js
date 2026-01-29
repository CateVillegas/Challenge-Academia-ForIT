// Cuando alguien pide ESTA URL con ESTE método, ¿qué función se ejecuta?
//router: Solo conecta URLs con funciones (controllers)
const express = require("express");
const { getTasks, postTask } = require("../controllers/tasks.controller");

const router = express.Router();

// Defino las rutas y qué función se ejecuta en cada una
router.get("/", getTasks);
router.post("/", postTask);

module.exports = {
    router,
};