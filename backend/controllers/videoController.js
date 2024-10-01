const supabase = require("../config/supabaseClient");

exports.getVideosByUser = async (req, res) => {
  const { userId, role } = req.params;

  if (role === "aluno") {
    try {
      const { data: aluno, error: alunoError } = await supabase
        .from("alunos")
        .select("professor_id")
        .eq("id", userId)
        .single();

      if (alunoError || !aluno) {
        console.error("Erro ao buscar o aluno:", alunoError);
        return res.status(404).json({
          error: "Aluno não encontrado ou sem professor vinculado",
          details: alunoError,
        });
      }

      const { data: videos, error: videoError } = await supabase
        .from("videos")
        .select("*")
        .eq("professor_id", aluno.professor_id);

      if (videoError) {
        console.error("Erro ao buscar vídeos:", videoError);
        return res
          .status(500)
          .json({ error: "Erro ao buscar vídeos", details: videoError });
      }

      return res.status(200).json(videos);
    } catch (error) {
      console.error("Erro geral:", error);
      return res
        .status(500)
        .json({ error: "Erro interno no servidor", details: error });
    }
  } else if (role === "professor") {
    try {
      const { data: videos, error: videoError } = await supabase
        .from("videos")
        .select("*")
        .eq("professor_id", userId);

      if (videoError) {
        console.error("Erro ao buscar vídeos do professor:", videoError);
        return res
          .status(500)
          .json({ error: "Erro ao buscar vídeos", details: videoError });
      }

      return res.status(200).json(videos);
    } catch (error) {
      console.error("Erro geral:", error);
      return res
        .status(500)
        .json({ error: "Erro interno no servidor", details: error });
    }
  } else {
    return res.status(400).json({ error: "Role inválido" });
  }
};

exports.getVideos = async (req, res) => {
  const { data, error } = await supabase
    .from("videos")
    .select("*")
    .order("criado_em", { ascending: false });

  if (error) {
    return res.status(500).json({ error: "Erro ao buscar vídeos" });
  }

  res.status(200).json(data);
};

exports.addVideo = async (req, res) => {
  const { titulo, url, descricao, professor_id } = req.body;

  if (!titulo || !url || !professor_id) {
    return res
      .status(400)
      .json({ error: "Título, URL e professor_id são obrigatórios" });
  }

  const { data: existingVideo, error: existingError } = await supabase
    .from("videos")
    .select("*")
    .eq("titulo", titulo)
    .single();

  if (existingVideo) {
    return res
      .status(400)
      .json({ error: "Vídeo com este título já foi cadastrado" });
  }

  const { data, error } = await supabase
    .from("videos")
    .insert([{ titulo, url, descricao, professor_id }])
    .select();

  if (error) {
    return res
      .status(500)
      .json({ error: "Erro ao cadastrar o vídeo", details: error });
  }

  return res
    .status(201)
    .json({ message: "Vídeo cadastrado com sucesso", video: data });
};

exports.updateVideo = async (req, res) => {
  const { id } = req.params;
  const { titulo, url, descricao } = req.body;

  const { data, error } = await supabase
    .from("videos")
    .update({ titulo, url, descricao })
    .eq("id", id)
    .select();

  if (error) {
    return res.status(500).json({ error: "Erro ao editar vídeo" });
  }

  res.status(200).json(data);
};

exports.deleteVideo = async (req, res) => {
  const { id } = req.params;

  const { error } = await supabase.from("videos").delete().eq("id", id);

  if (error) {
    return res.status(500).json({ error: "Erro ao excluir vídeo" });
  }

  res.status(204).json({ message: "Vídeo excluído com sucesso" });
};
