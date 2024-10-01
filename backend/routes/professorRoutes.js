const express = require("express");
const router = express.Router();
const professorController = require("../controllers/professorController");

router.post("/register", professorController.registerProfessor);
router.post("/login", professorController.loginProfessor);
router.get("/", professorController.getProfessores);

module.exports = router;
