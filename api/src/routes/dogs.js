var express = require("express");
var router = express.Router();
const axios = require("axios");
const { YOUR_API_KEY } = process.env;
const { conn, Breed, Temperament, BreedTemp } = require("../db.js");
//GET https://api.thedogapi.com/v1/breeds

/* GET home page. */
router.get("/", (req, res) => {
  const { name } = req.query;
  if (name) {
    axios(`https://api.thedogapi.com/v1/breeds?api_key=${YOUR_API_KEY}`)
      .then((d) => {
        let mapped = d.data.map((r) => r.name);
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
    Promise.all([
      axios(`https://api.thedogapi.com/v1/breeds?api_key=${YOUR_API_KEY}`),
      Breed.findAll({
        include: {
          model: Temperament,
        },
      }),
    ])
      .then((r) => {
        let apiDogs = r[0].data.map((d) => d.name);
        let dbDogs = r[1].map((d) => d.name);
        // let allDogs = dbDogs.concat(apiDogs);
        res.json([...dbDogs, ...apiDogs]);
      })
      .catch((err) => {
        console.log(err);
        res.status(404).send(err);
      });
  }
});

router.get("/:idRaza", async (req, res) => {
  try {
    const { idRaza } = req.params;
    let all = await axios(
      `https://api.thedogapi.com/v1/breeds?api_key=${YOUR_API_KEY}`
    );
    let justOne = await all.data.find(
      (e) => parseInt(e.id) === parseInt(idRaza)
    );

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
    console.log("errorrrrr", err);
    res.status(200).send("El el id no ha sido encontrado");
  }
});
//POSTT
router.post("/", async (req, res) => {
  try {
    const { name, height, weight, yearsOfLife, image, temperaments } = req.body;
    let newDog = await Breed.findOrCreate({
      where: {
        name,
        height,
        weight,
        yearsOfLife,
        image,
      },
    });
    //trae temperamentos que coincidan con los que he recibido
    let tempDB = await Temperament.findAll({
      where: { name: temperaments },
    });
    await newDog[0].setTemperaments(tempDB);

    res.status(202).json(newDog);
  } catch (err) {
    console.log(err);
    res.status(404).send(err);
  }
});

module.exports = router;
