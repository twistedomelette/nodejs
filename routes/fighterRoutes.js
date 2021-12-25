const { Router } = require('express');
const FighterService = require('../services/fighterService');
const { responseMiddleware } = require('../middlewares/response.middleware');
const { createFighterValid, getFighters, getFighter, updateFighterValid } = require('../middlewares/fighter.validation.middleware');

const router = Router();

router.get('/', function(req, res) {
    try {
        getFighters(req, res, FighterService.getAll);
    } catch (e) {
        res.err = e;
    }
});

router.get('/:id', function(req, res) {
    try {
        getFighter(req, res, () => FighterService.getFighter(req.params.id));
    } catch (e) {
        res.err = e;
    }
});

router.post('/', function(req, res, next) {
    try {
        createFighterValid(req, res, () => FighterService.add(req.body));
    } catch (e) {
        res.err = e;
    } finally {
        next()
    }
}, responseMiddleware);

router.put('/:id', function(req, res, next) {
    try {
        updateFighterValid(req, res, () => {})
    } catch (e) {
        res.err = e;
    } finally {
        next()
    }
}, responseMiddleware);

router.delete('/:id', function(req, res) {
    try {
        if (FighterService.getFighter(req.params.id).id === req.params.id.slice(1)) {
            FighterService.deleteUser(req.params.id.slice(1))
            res.status(200)
        }
    } catch (e) {
        res.err = e;
    }
});

// TODO: Implement route controllers for fighter

module.exports = router;