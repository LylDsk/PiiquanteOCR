const Sauce = require("../models/Sauces");

exports.getAll = (req, res, next) => {
  Sauce.find()
    .then((sauces) => res.status(200).json(sauces))
    .catch((error) => res.status(400).json({ error }));
};

exports.getOne = (req, res, next) => {
  console.log(req.params.id);
  Sauce.findOne({ _id: req.params.id })
    .then((sauce) => res.status(200).json(sauce))
    .catch((error) => res.status(404).json({ error }));
};

exports.create = (req, res, next) => {
  /*  namesauce = JSON.parse(req.body.sauce.name);
  console.log(namesauce);
  console.log(req.body.sauce.manufacturer);
  const sauce = new Sauce({
    //email: req.body.email,
    name: req.body.name,
    //name: "Tabasco",
    manufacturer: req.body.manufacturer,
    //manufacturer: "TbscINC",
    description: req.body.description,
    //description: "ça pique",
    image: `${req.protocol}://${req.get("host")}/assets/images/${
      req.file.filename
    }`,
    //image: "image",
    mainPepper: req.body.mainPepper,
    //mainPepper: "Jalapeno",
    heat: req.body.heat,
    //heat: 3,
    heatValue: req.body.heatValue,
    //heatValue: 3,
  });*/
  const sauceForm = JSON.parse(req.body.sauce);
  delete sauceForm._id;
  const sauce = new Sauce({
    ...sauceForm,
    imageUrl: `${req.protocol}://${req.get("host")}/images/${
      req.file.filename
    }`,
    usersLiked: [],
    usersDisliked: [],
    likes: 0,
    dislikes: 0,
  });
  console.log(sauce);
  sauce
    .save()
    .then(() => res.status(201).json({ message: "Sauce créée !" }))
    .catch((error) => res.status(400).json({ error }));
};

exports.like = (req, res, next) => {};

exports.edit = (req, res, next) => {
  Sauce.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
    .then(() => res.status(200).json({ message: "Objet modifié !" }))
    .catch((error) => res.status(400).json({ error }));
};

exports.delete = (req, res, next) => {
  Sauce.deleteOne({ _id: req.params.id })
    .then(() => res.status(200).json({ message: "Objet supprimé !" }))
    .catch((error) => res.status(400).json({ error }));
};
