const { Router } = require('express');
const { create, findAll, findOne, update, eliminar, deleteAll, findAllPublished } = require("../controllers/tutorial.controller.js");
const router = Router();

router.get("/", findAll);
router.get("/:id", findOne);
router.post("/", create);
router.put("/:id", update);
router.delete("/:id", eliminar);
router.delete("/", deleteAll);
router.get("/published", findAllPublished);

// app.use('/api/tutorials', router);
module.exports = router;