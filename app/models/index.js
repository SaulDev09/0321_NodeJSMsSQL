const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.autor = require("./autor.model.js")(sequelize, Sequelize);
db.libro = require("./libro.model.js")(sequelize, Sequelize);
db.carrito = require("./carrito.model.js")(sequelize, Sequelize);
db.carritodetalle = require("./carritodetalle.model.js")(sequelize, Sequelize);
db.usuario = require("./usuario.model.js")(sequelize, Sequelize);

db.carrito.hasMany(db.carritodetalle);
db.carritodetalle.belongsTo(db.carrito);

module.exports = db;