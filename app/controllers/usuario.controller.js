const { v4: uuidv4 } = require('uuid');
const db = require("../models");
const Usuario = db.usuario;
const Op = db.Sequelize.Op;
var bcrypt = require('bcrypt-nodejs');
var jwt = require('../services/jwt');


create = (req, res) => {
    // Validate request
    if (!req.body.nombre) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    const usuario = {
        id: uuidv4(),
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        email: req.body.email,
        password: req.body.password,
        estado: req.body.estado
    };

    bcrypt.hash(req.body.password, null, null, function (err, hash) {
        usuario.password = hash;
        Usuario.create(usuario)
            .then(data => {
                res.status(200).send(data);
            })
            .catch(err => {
                res.status(500).send({
                    message:
                        err.message || "Algún error ocurrió mientras se creaba el Usuario."
                });
            });
    });
};

findAll = (req, res) => {
    const nombre = req.query.nombre;
    var condition = nombre ? { nombre: { [Op.like]: `%${nombre}%` } } : null;

    Usuario.findAll({ where: condition })
        .then(data => {
            res.status(200).send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Algún error ocurrió mientras se listaban los usuarios."
            });
        });
};

findOne = (req, res) => {
    const id = req.params.id;

    Usuario.findByPk(id)
        .then(data => {
            res.status(200).send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error mientras se obtenía el Usuario con id=" + id
            });
        });
};

update = (req, res) => {
    const id = req.params.id;

    Usuario.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.status(201).send({
                    message: "Usuario fue actualizado satisfactoriamente."
                });
            } else {
                res.status(404).send({
                    message: `No se puede actualizar el Usuario con id=${id}.  Quizás el auto no fue encontrato o el req.body está vacío!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error actualizando el Usuario con id=" + id
            });
        });
};

eliminar = (req, res) => {
    const id = req.params.id;

    Usuario.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.status(204).send({
                    message: "Usuario fue eliminado exitosamente!"
                });
            } else {
                res.send({
                    message: `No se logró eliminar al Usuario con id=${id}. Quizás el usuario no fue encontrado!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "No se logró eliminar al Usuario con id=" + id
            });
        });
};

deleteAll = (req, res) => {
    Usuario.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({ message: `${nums} Usuarioes fue(ron) eliminado satisfactoriamente!` });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Algún error ocurrió mientras se eliminaban todos los usuarios."
            });
        });
};

// find all published Usuario
findAllActivo = (req, res) => {
    Usuario.findAll({ where: { estado: req.params.estado } })
        .then(data => {
            res.status(200).send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Algún error ocurrió mientras se listaban los usuarios."
            });
        });
};

loginUser = (req, res) => {
    var email = req.body.email;
    var password = req.body.password;

    Usuario.findOne({ where: { email: email } })
        .then(data => {
            // res.status(200).send(data);

            if (!data) {
                res.status(404).send({ message: 'Usuario desconocido' });
            } else {
                // Comprobar la contrasenia
                bcrypt.compare(password, data.password, function (err, check) {
                    if (check) {
                        if (req.body.gethash) {
                            //Token from jwt
                            res.status(200).send({
                                token: jwt.createToken(data)
                            });
                        } else {
                            res.status(200).send({ data });
                        }
                    } else {
                        res.status(404).send({ message: 'The data could not log in' });
                    }
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Algún error ocurrió mientras se listaban los usuarios."
            });
        });

    // Usuario.findOne({ wher: { email: email.toLowerCase() } }, (err, data) => {
    //     if (err) {
    //         res.status(500).send({ message: 'Error en Request' });
    //     } else {
    //     }
    // });

}


module.exports = {
    create,
    findAll,
    findOne,
    update,
    eliminar,
    deleteAll,
    findAllActivo,
    loginUser
};