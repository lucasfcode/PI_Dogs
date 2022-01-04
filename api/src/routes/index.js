const { Router } = require("express");
const dogs = require("./dogs");
const temperament = require("./temperament");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
// Unicos endpoints:
//GET https://api.thedogapi.com/v1/breeds
//GET https://api.thedogapi.com/v1/breeds/search?q={raza_perro}

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use("/dogs", dogs);
router.use("/temperament", temperament);

module.exports = router;
