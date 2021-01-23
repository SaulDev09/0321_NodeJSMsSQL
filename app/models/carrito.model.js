const { v4: uuidv4 } = require('uuid');

module.exports = (sequelize, Sequelize) => {
  const Carrito = sequelize.define("carrito", {
    id: {
      primaryKey: true,
      type: Sequelize.UUID
    },
    fechaCreacion: {
      type: Sequelize.DATE
    },
    estado: {
      type: Sequelize.BOOLEAN
    }
  });

  Carrito.beforeCreate(carrito => carrito.id = uuidv4());
  return Carrito;
};
