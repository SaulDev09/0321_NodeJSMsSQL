'use strict'

var jwt = require('jwt-simple');
var moment = require('moment');
var secret = 'clave_secreta';

exports.ensureAuth = function (req, res, next) {
    if (!req.headers.authorization) {
        return res.status(403).send({ message: 'Header doest not have auth' });
    }

    var token = req.headers.authorization.replace(/['"]+/g, '');

    try {
        var payload = jwt.decode(token, secret);
        // console.log(payload.exp);
        if (payload.exp <= moment().unix()) {
            return res.status(401).send({ message: 'Expired token' });
        }
    } catch (ex) {
        // console.log(ex);
        return res.status(404).send({ message: 'Token not valid' });
    }

    req.usuario = payload;
    next();
};
