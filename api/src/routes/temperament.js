var express = require("express");
var router = express.Router();
const axios = require("axios");
const { YOUR_API_KEY } = process.env;
const { conn } = require("../db.js");
const { Breed, Temper } = conn.models;
//GET https://api.thedogapi.com/v1/breeds

router.get("/", async (req, res) => {
  let allBreeds = await axios(
    `https://api.thedogapi.com/v1/breeds?api_key=${YOUR_API_KEY}`
  );

  let mapped = await allBreeds.data.map((el) => el.temperament);
  let allTempers = await mapped.join(",").split(",");

  allTempers.forEach((element) => {
    Temper.findOrCreate({
      where: {
        name: element.trim(),
      },
    });
  });
  let TemperamentsDB = await Temper.findAll();

  res.status(200).json(TemperamentsDB);
});
module.exports = router;
