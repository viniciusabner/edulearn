const bcrypt = require("bcryptjs");
const supabase = require("../config/supabaseClient");

exports.registerAluno = async (req, res) => {
  const { nome, cpf, email, senha, professorId } = req.body;
  const { data: existingAluno, error: existingError } = await supabase
    .from("alunos")
    .select("*")
    .eq("email", email)
    .single();

  if (existingAluno) {
    return res
      .status(400)
      .json({ error: "Aluno já cadastrado com este email" });
  }

  const hashedPassword = await bcrypt.hash(senha, 10);

  const { data, error } = await supabase
    .from("alunos")
    .insert([
      { nome, cpf, email, senha: hashedPassword, professor_id: professorId },
    ])
    .select();

  if (error) {
    return res
      .status(500)
      .json({ error: "Erro ao cadastrar o aluno", details: error });
  }

  return res
    .status(201)
    .json({ message: "Aluno cadastrado com sucesso", aluno: data });
};

exports.loginAluno = async (req, res) => {
  const { email, senha } = req.body;

  const { data: aluno, error } = await supabase
    .from("alunos")
    .select("id, senha, professor_id")
    .eq("email", email)
    .single();

  if (!aluno || error) {
    return res.status(400).json({ error: "Usuário ou senha inválidos" });
  }

  const validPassword = await bcrypt.compare(senha, aluno.senha);
  if (!validPassword) {
    return res.status(400).json({ error: "Usuário ou senha inválidos" });
  }

  return res.status(200).json({
    message: "Login bem-sucedido",
    alunoId: aluno.id,
    professorId: aluno.professor_id,
    role: "aluno",
  });
};
