var express = require("express");
var router = express.Router();
const axios = require("axios");
const { YOUR_API_KEY } = process.env;
const { conn, Breed, Temperament, BreedTemp } = require("../db.js");
const req = require("express/lib/request");
//GET https://api.thedogapi.com/v1/breeds

/*------------------------ GET home page.--------------------- */
router.get("/", (req, res) => {
  //en principio busco por name en la api y en db y devuelvo todo
  const { name } = req.query;
  if (name) {
    Promise.all([
      axios(`https://api.thedogapi.com/v1/breeds?api_key=${YOUR_API_KEY}`),
      Breed.findAll({
        include: {
          model: Temperament,
        },
      }),
    ])
      .then((data) => {
        let findedApi = data[0].data.filter((dog) =>
          dog.name.toUpperCase().includes(name.toUpperCase())
        );
        // console.log("desde back findedApi", findedApi);
        let findedDB = data[1].filter((d) =>
          d.name.toUpperCase().includes(name.toUpperCase())
        );

        res.status(200).json([...findedDB, ...findedApi]);
      })
      .catch((err) => console.log("Error en searching back", err));
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
        let apiDogs = r[0].data;
        let dbDogs = r[1];
        // let allDogs = dbDogs.concat(apiDogs);
        res.status(200).json([...dbDogs, ...apiDogs]);
      })
      .catch((err) => {
        console.log(err);
        //no es recomendable enviar el error
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
    const {
      name,
      height,
      weight,
      yearsOfLife,
      image,
      temperament,
      description,
    } = req.body;
    // console.log("Objeto recibico en el back", req.body);

    let newDog = await Breed.findOrCreate({
      where: {
        image,
        name,
        description,
        height,
        weight,
        yearsOfLife,
      },
    });
    //trae temperamentos que coincidan con los que he recibido
    let tempDB = await Temperament.findAll({
      where: { name: temperament },
    });
    // console.log("temps coincidencia", tempDB);
    // console.log("New dog por crear back", newDog[0]);
    await newDog[0].setTemperaments(tempDB);

    res.status(202).json({ created: newDog, temperament: tempDB });
  } catch (err) {
    console.log(err);
    //no enviar error
    res.status(404).send(err);
  }
});
/* ------------PUT------------ */
router.put("/:id", async (req, res, next) => {
  const { id } = req.params;
  const { name, height, weight, yearsOfLife, image, description, temperament } =
    req.body;
  console.log("temperamentos recibidos", temperament);
  try {
    let toEdit = await Breed.findByPk(id);
    //encuentro y seteo los temperamentos
    let tempDB = await Temperament.findAll({
      where: { name: temperament },
    });

    //edito varias propiedades a la vez
    toEdit.update({
      ...toEdit,
      name,
      height,
      weight,
      yearsOfLife,
      image,
      description,
    });
    //es imprescindible setear temps luego de actualizar los datos idk why
    await toEdit.setTemperaments(tempDB);
    await toEdit.save();

    res.json(toEdit);
  } catch (err) {
    next(err);
  }
});
/* ----------DELETE--------------- */
router.delete("/clear/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    const thisDog = await Breed.findByPk(id);
    const deleted = await thisDog.destroy();
    res.json("Dog deleted successfully");
  } catch (err) {
    next(err);
  }
});

module.exports = router;
