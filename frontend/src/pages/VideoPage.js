import React, { useEffect, useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "../styles/VideoPage.scss";

function VideoPage() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [newVideo, setNewVideo] = useState({
    titulo: "",
    url: "",
    descricao: "",
  });
  const [editVideo, setEditVideo] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [userId, setUserId] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const role = localStorage.getItem("role");
    const professorId = localStorage.getItem("professorId");

    if (!role || !professorId) {
      navigate("/");
    } else {
      setUserRole(role);
      setUserId(professorId);
      fetchVideos(professorId, role);
    }
  }, [navigate]);

  const fetchVideos = async (userId, role) => {
    setLoading(true);
    try {
      const response = await fetch(
        `http://localhost:5000/api/videos/user/${userId}/${role}`
      );
      const data = await response.json();

      if (response.ok) {
        setVideos(data);
      } else {
        console.error("Erro ao buscar vídeos:", data.error);
      }
      setLoading(false);
    } catch (error) {
      console.error("Erro ao buscar vídeos:", error);
      setLoading(false);
    }
  };

  const handleAddVideo = async () => {
    if (!newVideo.titulo || !newVideo.url || !newVideo.descricao) {
      setErrorMessage("Todos os campos são obrigatórios.");
      return;
    }

    try {
      const professorId = localStorage.getItem("professorId");

      const response = await fetch("http://localhost:5000/api/videos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...newVideo,
          professor_id: professorId,
        }),
      });

      const video = await response.json();

      if (response.ok) {
        fetchVideos(professorId, userRole);
      }

      setVideos([...videos, video[0]]);
      setShowModal(false);
      setNewVideo({ titulo: "", url: "", descricao: "" });
      setErrorMessage("");
    } catch (error) {
      console.error("Erro ao adicionar vídeo:", error);
    }
  };

  const handleDeleteVideo = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/videos/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        fetchVideos(userId, userRole);
      }
    } catch (error) {
      console.error("Erro ao excluir vídeo:", error);
    }
  };

  const handleEditVideo = (video) => {
    setEditVideo(video);
    setShowEditModal(true);
  };

  const handleUpdateVideo = async () => {
    if (!editVideo.titulo || !editVideo.url || !editVideo.descricao) {
      setErrorMessage("Todos os campos são obrigatórios.");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:5000/api/videos/${editVideo.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(editVideo),
        }
      );

      if (response.ok) {
        fetchVideos(userId, userRole);
      }
      setShowEditModal(false);
      setEditVideo(null);
      setErrorMessage("");
    } catch (error) {
      console.error("Erro ao editar vídeo:", error);
    }
  };

  const getEmbedUrl = (url) => {
    const videoId = url?.split("v=")[1];
    const ampersandPosition = videoId?.indexOf("&");
    if (ampersandPosition !== -1) {
      return `https://www.youtube.com/embed/${videoId?.substring(
        0,
        ampersandPosition
      )}`;
    }
    return `https://www.youtube.com/embed/${videoId}`;
  };

  return (
    <div className="container-videos">
      <h1>Vídeos Educacionais</h1>

      {userRole === "professor" && (
        <Button
          className="btn-adicionar-video"
          onClick={() => setShowModal(true)}
        >
          Adicionar novo Vídeo
        </Button>
      )}

      {loading ? (
        <p>Carregando...</p>
      ) : (
        <ul className="lista-videos">
          {videos.map((video) => (
            <li className="content-videos" key={video?.id}>
              <h2>{video?.titulo}</h2>
              <p>{video?.descricao}</p>
              <iframe
                width="560"
                height="315"
                src={getEmbedUrl(video?.url)}
                title={video?.titulo}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>

              {userRole === "professor" && (
                <div className="botoes-videos">
                  <Button onClick={() => handleDeleteVideo(video.id)}>
                    Excluir
                  </Button>
                  <Button onClick={() => handleEditVideo(video)}>Editar</Button>
                </div>
              )}
              <hr className="hr" />
            </li>
          ))}
        </ul>
      )}

      {userRole === "professor" && (
        <Modal show={showModal} onHide={() => setShowModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Adicionar Vídeo</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group>
                <Form.Label>Título</Form.Label>
                <Form.Control
                  type="text"
                  value={newVideo.titulo}
                  onChange={(e) =>
                    setNewVideo({ ...newVideo, titulo: e.target.value })
                  }
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>URL do YouTube</Form.Label>
                <Form.Control
                  type="text"
                  value={newVideo.url}
                  onChange={(e) =>
                    setNewVideo({ ...newVideo, url: e.target.value })
                  }
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Descrição</Form.Label>
                <Form.Control
                  as="textarea"
                  value={newVideo.descricao}
                  onChange={(e) =>
                    setNewVideo({ ...newVideo, descricao: e.target.value })
                  }
                />
              </Form.Group>
            </Form>
            {errorMessage && <p className="text-danger mt-2">{errorMessage}</p>}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              Cancelar
            </Button>
            <Button variant="primary" onClick={handleAddVideo}>
              Adicionar
            </Button>
          </Modal.Footer>
        </Modal>
      )}

      {editVideo && (
        <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Editar Vídeo</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group>
                <Form.Label>Título</Form.Label>
                <Form.Control
                  type="text"
                  value={editVideo.titulo}
                  onChange={(e) =>
                    setEditVideo({ ...editVideo, titulo: e.target.value })
                  }
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>URL do YouTube</Form.Label>
                <Form.Control
                  type="text"
                  value={editVideo.url}
                  onChange={(e) =>
                    setEditVideo({ ...editVideo, url: e.target.value })
                  }
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Descrição</Form.Label>
                <Form.Control
                  as="textarea"
                  value={editVideo.descricao}
                  onChange={(e) =>
                    setEditVideo({ ...editVideo, descricao: e.target.value })
                  }
                />
              </Form.Group>
            </Form>
            {errorMessage && <p className="text-danger mt-2">{errorMessage}</p>}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowEditModal(false)}>
              Cancelar
            </Button>
            <Button variant="primary" onClick={handleUpdateVideo}>
              Atualizar
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
}

export default VideoPage;
