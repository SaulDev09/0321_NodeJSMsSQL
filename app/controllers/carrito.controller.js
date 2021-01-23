const { v4: uuidv4 } = require('uuid');
const db = require("../models");
const Carrito = db.carrito;
const Op = db.Sequelize.Op;

create = (req, res) => {
    // Validate request
    if (!req.body.fechaCreacion) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    const carrito = {
        id: uuidv4(),
        fechaCreacion: req.body.fechaCreacion,
        estado: req.body.estado
    };

    Carrito.create(carrito)
        .then(data => {
            res.status(200).send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Algún error ocurrió mientras se creaba el Carrito."
            });
        });
};

findAll = (req, res) => {
    const fechaCreacion = req.query.fechaCreacion;
    var condition = fechaCreacion ? { fechaCreacion: fechaCreacion } : null;

    Carrito.findAll({ where: condition })
        .then(data => {
            res.status(200).send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Algún error ocurrió mientras se listaban los carritos."
            });
        });
};

findOne = (req, res) => {
    const id = req.params.id;

    Carrito.findByPk(id)
        .then(data => {
            res.status(200).send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error mientras se obtenía el Carrito con id=" + id
            });
        });
};

update = (req, res) => {
    const id = req.params.id;

    Carrito.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.status(201).send({
                    message: "Carrito fue actualizado satisfactoriamente."
                });
            } else {
                res.status(404).send({
                    message: `No se puede actualizar el Carrito con id=${id}.  Quizás el auto no fue encontrato o el req.body está vacío!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error actualizando el Carrito con id=" + id
            });
        });
};

eliminar = (req, res) => {
    const id = req.params.id;

    Carrito.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.status(204).send({
                    message: "Carrito fue eliminado exitosamente!"
                });
            } else {
                res.send({
                    message: `No se logró eliminar al Carrito con id=${id}. Quizás el carrito no fue encontrado!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "No se logró eliminar al Carrito con id=" + id
            });
        });
};

deleteAll = (req, res) => {
    Carrito.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({ message: `${nums} Carritoes fue(ron) eliminado satisfactoriamente!` });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Algún error ocurrió mientras se eliminaban todos los carritos."
            });
        });
};

// find all published Carrito
findAllActivo = (req, res) => {
    Carrito.findAll({ where: { estado: req.params.estado } })
        .then(data => {
            res.status(200).send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Algún error ocurrió mientras se listaban los carritos."
            });
        });
};


module.exports = {
    create,
    findAll,
    findOne,
    update,
    eliminar,
    deleteAll,
    findAllActivo
};