const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");

app.use(express.json());
app.use(cors());

const professorRoutes = require("./routes/professorRoutes");
const videoRoutes = require("./routes/videoRoutes");
const alunoRoutes = require("./routes/alunoRoutes");

app.use("/api/professores", professorRoutes);
app.use("/api/videos", videoRoutes);
app.use("/api/alunos", alunoRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
