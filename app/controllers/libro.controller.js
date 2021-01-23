const { v4: uuidv4 } = require('uuid');
const db = require("../models");
const Libro = db.libro;
const Op = db.Sequelize.Op;

create = (req, res) => {
    // Validate request
    if (!req.body.titulo) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    const libro = {
        id: uuidv4(),
        titulo: req.body.titulo,
        fechaPublicacion: req.body.fechaPublicacion,
        autorUuid: req.body.autorUuid,
        estado: req.body.estado
    };

    Libro.create(libro)
        .then(data => {
            res.status(200).send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Algún error ocurrió mientras se creaba el Libro."
            });
        });
};

findAll = (req, res) => {
    const titulo = req.query.titulo;
    var condition = titulo ? { titulo: { [Op.like]: `%${titulo}%` } } : null;

    Libro.findAll({ where: condition })
        .then(data => {
            res.status(200).send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Algún error ocurrió mientras se listaban los libros."
            });
        });
};

findOne = (req, res) => {
    const id = req.params.id;

    Libro.findByPk(id)
        .then(data => {
            res.status(200).send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error mientras se obtenía el Libro con id=" + id
            });
        });
};

update = (req, res) => {
    const id = req.params.id;

    Libro.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.status(201).send({
                    message: "Libro fue actualizado satisfactoriamente."
                });
            } else {
                res.status(404).send({
                    message: `No se puede actualizar el Libro con id=${id}.  Quizás el auto no fue encontrato o el req.body está vacío!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error actualizando el Libro con id=" + id
            });
        });
};

eliminar = (req, res) => {
    const id = req.params.id;

    Libro.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.status(204).send({
                    message: "Libro fue eliminado exitosamente!"
                });
            } else {
                res.send({
                    message: `No se logró eliminar al Libro con id=${id}. Quizás el libro no fue encontrado!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "No se logró eliminar al Libro con id=" + id
            });
        });
};

deleteAll = (req, res) => {
    Libro.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({ message: `${nums} Libroes fue(ron) eliminado satisfactoriamente!` });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Algún error ocurrió mientras se eliminaban todos los libros."
            });
        });
};

// find all published Libro
findAllActivo = (req, res) => {
    Libro.findAll({ where: { estado: req.params.estado } })
        .then(data => {
            res.status(200).send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Algún error ocurrió mientras se listaban los libros."
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