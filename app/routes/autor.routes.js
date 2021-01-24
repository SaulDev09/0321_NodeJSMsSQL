const { Router } = require('express');
const { create, findAll, findOne, update, eliminar, deleteAll, findAllActivo } = require("../controllers/autor.controller.js");
const router = Router();
const md_auth = require('../middlewares/authenticated');

router.get("/", md_auth.ensureAuth, findAll);
router.get("/:id", md_auth.ensureAuth, findOne);
router.post("/", md_auth.ensureAuth, create);
router.put("/:id", md_auth.ensureAuth, update);
router.delete("/:id", md_auth.ensureAuth, eliminar);
router.delete("/", md_auth.ensureAuth, deleteAll);
router.get("/estado/:estado", md_auth.ensureAuth, findAllActivo);
// router.get("/published/", findAllActivo); => X conflicto con /:id - ambos son string

module.exports = router;