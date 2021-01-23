const { v4: uuidv4 } = require('uuid');
const db = require("../models");
const Autor = db.autor;
const Op = db.Sequelize.Op;

create = (req, res) => {
    // Validate request
    if (!req.body.nombre) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    const autor = {
        id: uuidv4(),
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        fechaNacimiento: req.body.fechaNacimiento,
        estado: req.body.estado
    };

    Autor.create(autor)
        .then(data => {
            res.status(200).send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Algún error ocurrió mientras se creaba el Autor."
            });
        });
};

findAll = (req, res) => {
    const nombre = req.query.nombre;
    var condition = nombre ? { nombre: { [Op.like]: `%${nombre}%` } } : null;

    Autor.findAll({ where: condition })
        .then(data => {
            res.status(200).send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Algún error ocurrió mientras se listaban los autores."
            });
        });
};

findOne = (req, res) => {
    const id = req.params.id;

    Autor.findByPk(id)
        .then(data => {
            res.status(200).send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error mientras se obtenía el Autor con id=" + id
            });
        });
};

update = (req, res) => {
    const id = req.params.id;

    Autor.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.status(201).send({
                    message: "Autor fue actualizado satisfactoriamente."
                });
            } else {
                res.status(404).send({
                    message: `No se puede actualizar el Autor con id=${id}.  Quizás el auto no fue encontrato o el req.body está vacío!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error actualizando el Autor con id=" + id
            });
        });
};

eliminar = (req, res) => {
    const id = req.params.id;

    Autor.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.status(204).send({
                    message: "Autor fue eliminado exitosamente!"
                });
            } else {
                res.send({
                    message: `No se logró eliminar al Autor con id=${id}. Quizás el autor no fue encontrado!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "No se logró eliminar al Autor con id=" + id
            });
        });
};

deleteAll = (req, res) => {
    Autor.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({ message: `${nums} Autores fue eliminado satisfactoriamente!` });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Algún error ocurrió mientras se eliminaban todos los autores."
            });
        });
};

// find all published Autor
findAllActivo = (req, res) => {
    Autor.findAll({ where: { estado: req.params.estado } })
        .then(data => {
            res.status(200).send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Algún error ocurrió mientras se listaban los autores."
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