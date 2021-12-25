const { fighter } = require('../models/fighter');
const FighterService = require('../services/fighterService');

const createFighterValid = (req, res, next) => {
    const fighter = FighterService.getAll();
    let us = true;
    for (let val of fighter) {
        if (val.name.toLowerCase() === req.body.name.toLowerCase()) {
            us = false;
            break;
        }
    }
    let f = true;
    if (req.body.health) {
        if (req.body.health <= 80 || req.body.health >= 120) {
            f = false;
        }
    }
    if (req.body.power > 1 && req.body.power < 100 && req.body.defense > 1 && req.body.defense < 10 && req.body.name && f && us){
        res.data = req.body
        next();
    } else {
        res.data = 'Fighter'
        console.log('Fighter not validation')
    }
    // TODO: Implement validatior for fighter entity during creation
}

const getFighters = (req, res, next) => {
    const AllFighters = next()
    res.send(AllFighters)
    next();
}

const getFighter = (req, res, next) => {
    const OneFighter = next
    res.send(OneFighter)
}

const updateFighterValid = (req, res, next) => {
    // TODO: Implement validatior for fighter entity during update
    if (FighterService.getFighter(req.params.id).id === req.params.id.slice(1)) {
        FighterService.updateUser(req.params, FighterService.getFighter(req.params.id))
        res.data = req.params
        next();
    }
}

exports.getFighter = getFighter;
exports.getFighters = getFighters;
exports.createFighterValid = createFighterValid;
exports.updateFighterValid = updateFighterValid;