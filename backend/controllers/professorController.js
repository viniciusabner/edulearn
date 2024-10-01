const bcrypt = require("bcryptjs");
const supabase = require("../config/supabaseClient");

exports.registerProfessor = async (req, res) => {
  const { nome, cpf, email, senha, repetirSenha } = req.body;

  if (senha !== repetirSenha) {
    return res.status(400).json({ error: "As senhas não coincidem" });
  }

  const { data: existingProfessor, error: existingError } = await supabase
    .from("professores")
    .select("*")
    .eq("email", email)
    .single();

  if (existingProfessor) {
    return res
      .status(400)
      .json({ error: "Professor já cadastrado com este email" });
  }

  const hashedPassword = await bcrypt.hash(senha, 10);

  const { data, error } = await supabase
    .from("professores")
    .insert([{ nome: nome, cpf: cpf, email: email, senha: hashedPassword }])
    .select();

  if (error) {
    return res
      .status(500)
      .json({ error: "Erro ao cadastrar o professor", details: error });
  }

  return res
    .status(201)
    .json({ message: "Professor cadastrado com sucesso", professor: data });
};

exports.loginProfessor = async (req, res) => {
  const { email, senha } = req.body;

  const { data: professor, error } = await supabase
    .from("professores")
    .select("id, email, senha, role")
    .eq("email", email)
    .single();

  if (!professor || error) {
    return res.status(400).json({ error: "Usuário ou senha inválidos" });
  }

  const validPassword = await bcrypt.compare(senha, professor.senha);
  if (!validPassword) {
    return res.status(400).json({ error: "Usuário ou senha inválidos" });
  }

  return res.status(200).json({
    message: "Login bem-sucedido",
    professorId: professor.id,
    role: professor.role,
  });
};

exports.getProfessores = async (req, res) => {
  const { data: professores, error } = await supabase
    .from("professores")
    .select("id, nome, email");

  if (error) {
    return res
      .status(500)
      .json({ error: "Erro ao buscar professores", details: error });
  }

  return res.status(200).json(professores);
};
