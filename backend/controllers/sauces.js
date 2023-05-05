const Sauce = require("../models/Sauces");

exports.getAll = (req, res, next) => {
  Sauce.find()
    .then((sauces) => res.status(200).json(sauces))
    .catch((error) => res.status(400).json({ error }));
};

exports.getOne = (req, res, next) => {
  console.log(req.params.id);
  Sauce.findOne({ _id: req.params.id })
    .then((sauce) => {
      if (!sauce) {
        return res.status(404).send(new Error("Sauce introuvable !"));
      }

      const likes = sauce.usersLiked.length;
      const dislikes = sauce.usersDisliked.length;

      const sauceData = {
        ...sauce._doc,
        likes,
        dislikes,
      };

      res.status(200).json(sauceData);
    })
    .catch((error) => res.status(404).json({ error }));
};

exports.create = (req, res, next) => {
  const sauceForm = JSON.parse(req.body.sauce);
  delete sauceForm._id;
  const sauce = new Sauce({
    ...sauceForm,
    imageUrl: `${req.protocol}://${req.get("host")}/images/${
      req.file.filename
    }`,
    usersLiked: [],
    usersDisliked: [],
    userId: req.auth.userId,
  });
  console.log(sauce);
  sauce
    .save()
    .then(() => res.status(201).json({ message: "Sauce créée !" }))
    .catch((error) => res.status(400).json({ error }));
};

exports.like = (req, res, next) => {
  const userId = req.body.userId;
  const likeValue = req.body.like;

  Sauce.findOne({ _id: req.params.id })
    .then((sauce) => {
      if (!sauce) {
        return res.status(404).send(new Error("Sauce introuvable !"));
      }

      const usersLiked = sauce.usersLiked;
      const usersDisliked = sauce.usersDisliked;

      if (likeValue === 0) {
        usersLiked.splice(usersLiked.indexOf(userId), 1);
        usersDisliked.splice(usersDisliked.indexOf(userId), 1);
      } else if (likeValue === 1) {
        if (!usersLiked.includes(userId)) {
          usersLiked.push(userId);
        }
      } else if (likeValue === -1) {
        if (!usersDisliked.includes(userId)) {
          usersDisliked.push(userId);
        }
      } else {
        return res.status(400).json({ error: "Valeur de like invalide !" });
      }

      sauce.usersLiked = usersLiked;
      sauce.usersDisliked = usersDisliked;

      sauce
        .save()
        .then(() => res.status(200).json({ message: "Like mis à jour !" }))
        .catch((error) => res.status(400).json({ error }));
    })
    .catch((error) => res.status(404).json({ error }));
};

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
