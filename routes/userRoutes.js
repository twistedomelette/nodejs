const { Router } = require('express');
const UserService = require('../services/userService');
const { createUserValid, getUsers, getUser, updateUserValid } = require('../middlewares/user.validation.middleware');
const { responseMiddleware } = require('../middlewares/response.middleware');

const router = Router();

router.get('/', function(req, res) {
    try {
        getUsers(req, res, UserService.getAll);
    } catch (e) {
        res.err = e;
    }
});

router.get('/:id', function(req, res) {
    try {
        getUser(req, res, UserService.getUser(req.params.id));
    } catch (e) {
        res.err = e;
    }
});

router.post('/', function(req, res, next) {
    try {
        createUserValid(req, res, () => UserService.add(req.body));
    } catch (e) {
        res.err = e;
    } finally {
        next()
    }
}, responseMiddleware);

router.put('/:id', function(req, res, next) {
    try {
        updateUserValid(req, res, () => {})
    } catch (e) {
        res.err = e;
    } finally {
        next()
    }
}, responseMiddleware);

router.delete('/:id', function(req, res) {
    try {
        if (UserService.getUser(req.params.id).id === req.params.id.slice(1)) {
            UserService.deleteUser(req.params.id.slice(1))
            res.status(200)
        }
    } catch (e) {
        res.err = e;
    }
});


// TODO: Implement route controllers for user

module.exports = router;