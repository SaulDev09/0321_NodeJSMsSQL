const { v4: uuidv4 } = require('uuid');

module.exports = (sequelize, Sequelize) => {
  const Autor = sequelize.define("autor", {
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
    fechaNacimiento: {
        type: Sequelize.DATEONLY
    },
    estado: {
      type: Sequelize.BOOLEAN
    }
  });

  Autor.beforeCreate(autor => autor.id = uuidv4());
  return Autor;
};
