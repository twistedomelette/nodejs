const responseMiddleware = (req, res, next) => {
    if (res.data && res.data !== 'User created' && res.data !== 'Fighter') {
        res.status(200).send(req.body)
    } else if (res.data === 'User created') {
        res.status(404).send({
            error: true,
            message: 'A user with such data was created'
        })
    } else if (res.data === 'Fighter') {
        res.status(404).send({
            error: true,
            message: 'Impossible values'
        })
    } else {
        res.status(404).send({
            error: true,
            message: 'User not found'
        })
    }
   // TODO: Implement middleware that returns result of the query
    next();
}

exports.responseMiddleware = responseMiddleware;