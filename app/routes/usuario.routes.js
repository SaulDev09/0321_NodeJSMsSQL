const { Router } = require('express');
const { create, findAll, findOne, update, eliminar, deleteAll, findAllActivo, loginUser } = require("../controllers/usuario.controller.js");
const router = Router();
const md_auth = require('../middlewares/authenticated');

router.get("/", findAll);
router.get("/:id", md_auth.ensureAuth, findOne);
router.post("/", create);
router.put("/:id", update);
router.delete("/:id", md_auth.ensureAuth, eliminar);
router.delete("/", md_auth.ensureAuth, deleteAll);
router.get("/estado/:estado", md_auth.ensureAuth, findAllActivo);
// router.get("/published/", findAllActivo); => X conflicto con /:id - ambos son string
router.post('/login', loginUser);
module.exports = router;