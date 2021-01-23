const { v4: uuidv4 } = require('uuid');

module.exports = (sequelize, Sequelize) => {
  const Libro = sequelize.define("libro", {
    id: {
      primaryKey: true,
      type: Sequelize.UUID
    },
    titulo: {
        type: Sequelize.STRING
    },
    fechaPublicacion: {
        type: Sequelize.DATEONLY
    },
    autorUuid: {
      type: Sequelize.UUID
    },    
    estado: {
      type: Sequelize.BOOLEAN
    }
  });

  Libro.beforeCreate(libro => libro.id = uuidv4());
  return Libro;
};
