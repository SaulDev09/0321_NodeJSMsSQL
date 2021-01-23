const { Router } = require('express');
const { create, findAll, findOne, update, eliminar, deleteAll, findAllActivo } = require("../controllers/libro.controller.js");
const router = Router();

router.get("/", findAll);
router.get("/:id", findOne);
router.post("/", create);
router.put("/:id", update);
router.delete("/:id", eliminar);
router.delete("/", deleteAll);
router.get("/estado/:estado", findAllActivo);
// router.get("/published/", findAllActivo); => X conflicto con /:id - ambos son string

module.exports = router;