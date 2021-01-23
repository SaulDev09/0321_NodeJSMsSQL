const { v4: uuidv4 } = require('uuid');

module.exports = (sequelize, Sequelize) => {
  const CarritoDetalle = sequelize.define("carritodetalle", {
    id: {
      primaryKey: true,
      type: Sequelize.UUID
    },
    fechaCreacion: {
        type: Sequelize.DATE
    },
    libroUuid: {
      type: Sequelize.UUID
    },
    estado: {
        type: Sequelize.BOOLEAN
    },
    carritoUuid: {
      type: Sequelize.UUID
    }
  });

  CarritoDetalle.beforeCreate(carritodetalle => carritodetalle.id = uuidv4());
  return CarritoDetalle;
};
