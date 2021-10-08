const Sauce = require('../models/sauce');

//Afficher toutes les sauces
exports.getAllSauce = (req, res, next) => {
    Sauce.find()
    .then(sauces => res.status(200).json(sauces))
    .catch(error => res.status(400).json({ error }));
};

// Afficher une seule sauce
exports.getOneSauce = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id })
        .then(sauce => res.status(200).json(sauce))
        .catch(error => res.status(404).json({ error }));
};

// Créer une sauce
exports.createSauce = (req, res, next) => {
    const sauceObject = JSON.parse(req.body.sauce);
    delete sauceObject._id;
    const sauce = new Sauce({
        ...sauceObject,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    });
    sauce.save()
    .then(() => res.status(201).json({message: 'Sauce enregistrée'}))
    .catch(error => res.status(400).json({ error }));
};

// Modifier une sauce
exports.modifySauce = (req, res, next) => {
    Sauce.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
        .then(() => res.status(200).json({message: 'Sauce modifiée'}))
        .catch(error => res.status(400).json({ error }));
};

// Supprimer une sauce
exports.deleteSauce = (req, res, next) => {
    Sauce.deleteOne({ _id: req.params.id })
        .then(() => res.status(200).json({message: 'Sauce supprimée'}))
        .catch(error => res.status(400).json({ error }));
};