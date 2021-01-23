const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const db = require("./app/models");
const app = express();

var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

db.sequelize.sync();
// // drop the table if it already exists
// db.sequelize.sync({ force: true }).then(() => {
//   console.log("Drop and re-sync db.");
// });

app.get("/", (req, res) => {
  res.json({ message: "Welcome Saul." });
});


var autor_routes = require('./app/routes/autor.routes');

app.use('/api/autor', autor_routes);

// set port, listen for requests
const PORT = process.env.PORT || 3977;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
