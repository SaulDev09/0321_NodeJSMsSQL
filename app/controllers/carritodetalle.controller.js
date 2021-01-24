const { v4: uuidv4 } = require('uuid');
const db = require("../models");
const CarritoDetalle = db.carritodetalle;
// const Carrito = db.carrito;
const Op = db.Sequelize.Op;

create = (req, res) => {
    // Validate request
    if (!req.body.libroId || !req.body.carritoId) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    const carritodetalle = {
        id: uuidv4(),
        fechaCreacion: req.body.fechaCreacion,
        libroId: req.body.libroId,
        estado: req.body.estado,
        carritoId: req.body.carritoId
    };

    CarritoDetalle.create(carritodetalle)
        .then(data => {
            res.status(200).send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Algún error ocurrió mientras se creaba el CarritoDetalle."
            });
        });
};

createList = async (lstCarritoDetalle, carritoId) => {
    // Validate request
    try {
        for (let index = 0; index < lstCarritoDetalle.length; index++) {

            if (!lstCarritoDetalle[index].libroId || !carritoId) {
                // res.status(400).send({
                //     message: "Content can not be empty!"
                // });
                console.log("Content can not be empty!");
                return false;
            }

            const carritodetalle = {
                id: uuidv4(),
                fechaCreacion: lstCarritoDetalle[index].fechaCreacion,
                libroId: lstCarritoDetalle[index].libroId,
                estado: lstCarritoDetalle[index].estado,
                carritoId: carritoId
            };

            var rpta = await CarritoDetalle.create(carritodetalle)
                .then(data => {
                    // res.status(200).send(data);
                    // console.log('Registro número: ' + index, ' - Con datos: ', data);
                })
                .catch(err => {
                    console.log(err);
                    return false;
                    // res.status(500).send({
                    //     message:
                    //         err.message || "Algún error ocurrió mientras se creaba el CarritoDetalle."
                    // });
                });
        }
        return true;
    } catch (error) {
        console.log(error);
        return false;
    }
};

findAll = async (req, res) => {
    // const carritoDetalle = await CarritoDetalle.findAll({ include: Carrito });
    // console.log(JSON.stringify(carritoDetalle, null, 2));

    const fechaCreacion = req.query.fechaCreacion;
    var condition = fechaCreacion ? { fechaCreacion: fechaCreacion } : null;

    CarritoDetalle.findAll({ where: condition })
        .then(data => {
            res.status(200).send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Algún error ocurrió mientras se listaban los carritodetalles."
            });
        });
};

findOne = (req, res) => {
    const id = req.params.id;

    CarritoDetalle.findByPk(id)
        .then(data => {
            res.status(200).send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error mientras se obtenía el CarritoDetalle con id=" + id
            });
        });
};

update = (req, res) => {
    const id = req.params.id;

    CarritoDetalle.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.status(201).send({
                    message: "CarritoDetalle fue actualizado satisfactoriamente."
                });
            } else {
                res.status(404).send({
                    message: `No se puede actualizar el CarritoDetalle con id=${id}.  Quizás el auto no fue encontrato o el req.body está vacío!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error actualizando el CarritoDetalle con id=" + id
            });
        });
};

eliminar = (req, res) => {
    const id = req.params.id;

    CarritoDetalle.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.status(204).send({
                    message: "CarritoDetalle fue eliminado exitosamente!"
                });
            } else {
                res.send({
                    message: `No se logró eliminar al CarritoDetalle con id=${id}. Quizás el carritodetalle no fue encontrado!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "No se logró eliminar al CarritoDetalle con id=" + id
            });
        });
};

deleteAll = (req, res) => {
    CarritoDetalle.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({ message: `${nums} CarritoDetallees fue(ron) eliminado satisfactoriamente!` });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Algún error ocurrió mientras se eliminaban todos los carritodetalles."
            });
        });
};

// find all published CarritoDetalle
findAllActivo = (req, res) => {
    CarritoDetalle.findAll({ where: { estado: req.params.estado } })
        .then(data => {
            res.status(200).send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Algún error ocurrió mientras se listaban los carritodetalles."
            });
        });
};

module.exports = {
    create,
    createList,
    findAll,
    findOne,
    update,
    eliminar,
    deleteAll,
    findAllActivo
};