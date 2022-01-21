var express = require("express");
var router = express.Router();
const axios = require("axios");
const { YOUR_API_KEY } = process.env;
const { conn, Temperament } = require("../db.js");

//GET https://api.thedogapi.com/v1/breeds

router.get("/", async (req, res) => {
  try {
    let allBreeds = await axios(
      `https://api.thedogapi.com/v1/breeds?api_key=${YOUR_API_KEY}`
    );

    let mapped = await allBreeds.data.map((el) => el.temperament);
    let allTempers = await mapped.join(",").split(",");

    allTempers.forEach((element) => {
      element !== "" &&
        Temperament.findOrCreate({
          where: {
            name: element.trim(),
          },
        });
    });
    let TemperamentsDB = await Temperament.findAll();
    res.status(200).json(TemperamentsDB);
  } catch (err) {
    console.log(err);
    //no enviar
    res.status(404).send("Hubo un error", err);
  }
});
router.post("/add", async (req, res, next) => {
  const { name } = req.body;
  try {
    const newTemp = await Temperament.findOrCreate({
      where: {
        name: name,
      },
    });
    res.status(200).send("Created successfully");
  } catch (errs) {
    next(errs);
  }
});
module.exports = router;
