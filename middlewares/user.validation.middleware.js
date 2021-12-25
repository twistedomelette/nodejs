const { user } = require('../models/user');
const UserService = require('../services/userService');

const createUserValid = (req, res, next) => {
    // TODO: Implement validatior for user entity during creation
    const users = UserService.getAll();
    let us = true;
    for (let val of users) {
        if (val.email.toLowerCase() === req.body.email.toLowerCase() || val.phoneNumber === req.body.phoneNumber) {
            us = false;
            break;
        }
    }
    if (req.body.email.slice(-10) === "@gmail.com" && req.body.password.length >= 3 && req.body.firstName && req.body.lastName &&
        req.body.phoneNumber.substr(0,4) === "+380" && us){
        res.data = req.body
        next();
    } else if (!us) {
        res.data = 'User created'
        console.log('A user with such data was created')
    } else {
        console.log('User not validation')
    }
}

const getUsers = (req, res, next) => {
    const AllUsers = next()
    res.send(AllUsers)
}

const getUser = (req, res, next) => {
    const OneUser = next
    res.send(OneUser)
}

const updateUserValid = (req, res, next) => {
    // TODO: Implement validatior for user entity during update
    if (UserService.getUser(req.params.id).id === req.params.id.slice(1)) {
        UserService.updateUser(req.params, UserService.getUser(req.params.id))
        res.data = req.params;
        next();
    }
}

exports.getUser = getUser;
exports.getUsers = getUsers;
exports.createUserValid = createUserValid;
exports.updateUserValid = updateUserValid;