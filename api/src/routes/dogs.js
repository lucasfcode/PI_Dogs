var express = require("express");
var router = express.Router();
const axios = require("axios");
const { YOUR_API_KEY } = process.env;
const { conn } = require("../db.js");
const bodyParser = require("body-parser");
const { Breed, Temper } = conn.models;
//GET https://api.thedogapi.com/v1/breeds

// const getAllDogsApi = async () => {
//   let allBreeds = await axios(
//     `https://api.thedogapi.com/v1/breeds?api_key=${YOUR_API_KEY}`
//   );
//   return allBreeds.data;
// };

// const getAllDogsDb = async () => {
//   let allDogsDb = await Breed.findAll({
//     include: Temper,
//   });
//   return allDogsDb;
// };

/* GET home page. */
router.get("/", (req, res) => {
  const { name } = req.query;
  if (name) {
    axios(`https://api.thedogapi.com/v1/breeds?api_key=${YOUR_API_KEY}`)
      .then((d) => {
        let mapped = d.data.map((r) => r.name);
        console.log("mapped", mapped);
        let filtred = mapped.filter((n) =>
          n.toUpperCase().includes(name.toUpperCase())
        );

        return filtred.length
          ? res.status(200).json(filtred)
          : res
              .status(200)
              .send(
                "La petición se ha completado con éxito pero no se ha encontrado ningún contenido"
              );
        //resolver problema con 204 'no content'
      })
      .catch((err) => console.log(err));
  }
  //en caso de que no busquen por query, devolverá todas las razas
  else {
    axios(`https://api.thedogapi.com/v1/breeds?api_key=${YOUR_API_KEY}`)
      .then((r) => res.status(200).json(r.data.map((d) => d.name)))
      .catch((err) => console.log(err));
  }
});

router.get("/:idRaza", async (req, res) => {
  try {
    const { idRaza } = req.params;
    let all = await axios(
      `https://api.thedogapi.com/v1/breeds?api_key=${YOUR_API_KEY}`
    );
    let justOne = await all.data.find((e) => e.id == idRaza);
    res.json({
      id: justOne.id,
      name: justOne.name,
      height: justOne.height.metric,
      weight: justOne.weight.metric,
      yearsOfLife: justOne.life_span,
      temper: justOne.temperament,
      image: justOne.image.url,
    });
  } catch (err) {
    console.log(err);
  }
});
//POSTT
router.post("/", async (req, res) => {
  try {
    let dog = await Breed.findOrCreate({
      where: {
        name: req.body.name,
        height: req.body.height,
        weight: req.body.weight,
        yearsOfLife: req.body.yearsOfLife,
      },
    });
    res.status(202).json(dog);
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
