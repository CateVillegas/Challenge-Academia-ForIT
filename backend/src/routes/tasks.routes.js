// Cuando alguien pide ESTA URL con ESTE método, ¿qué función se ejecuta?
//router: Solo conecta URLs con funciones (controllers)
const express = require("express");
const { getTasks } = require("../controllers/tasks.controller");

const router = express.Router();

router.get("/", getTasks);

module.exports = {
    router,
};