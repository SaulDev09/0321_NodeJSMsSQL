const { v4: uuidv4 } = require('uuid');

module.exports = (sequelize, Sequelize) => {
  const Tutorial = sequelize.define("tutorial", {
    id: {
      primaryKey: true,
      type: Sequelize.UUID
    },
    title: {
      type: Sequelize.STRING
    },
    description: {
      type: Sequelize.STRING
    },
    published: {
      type: Sequelize.BOOLEAN
    }
  });

  Tutorial.beforeCreate(tutorial => tutorial.id = uuidv4());
  return Tutorial;
};
