const { v4: uuidv4 } = require('uuid');

module.exports = (sequelize, Sequelize) => {
    const Usuario = sequelize.define("usuario", {
        id: {
            primaryKey: true,
            type: Sequelize.UUID
        },
        nombre: {
            type: Sequelize.STRING
        },
        apellido: {
            type: Sequelize.STRING
        },
        email: {
            type: Sequelize.STRING
        },
        password: {
            type: Sequelize.STRING
        },
        estado: {
            type: Sequelize.BOOLEAN
        }
    });

    Usuario.beforeCreate(usuario => usuario.id = uuidv4());
    return Usuario;
};
