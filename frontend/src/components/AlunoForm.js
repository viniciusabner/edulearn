import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";

function AlunoForm({ onHide }) {
  const [formData, setFormData] = useState({
    nome: "",
    cpf: "",
    email: "",
    senha: "",
    professorId: "",
  });
  const [professores, setProfessores] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchProfessores = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/professores");
        const data = await response.json();
        setProfessores(data);
      } catch (error) {
        setErrorMessage("Erro ao carregar a lista de professores");
      }
    };
    fetchProfessores();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "http://localhost:5000/api/alunos/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();
      if (response.ok) {
        alert("Aluno cadastrado com sucesso!");
        setFormData({
          nome: "",
          cpf: "",
          email: "",
          senha: "",
          professor_id: "",
        });
        onHide();
      } else {
        setErrorMessage(data.error || "Erro ao cadastrar aluno");
      }
    } catch (error) {
      setErrorMessage("Erro ao conectar ao servidor");
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group>
        <Form.Label>Nome</Form.Label>
        <Form.Control
          type="text"
          name="nome"
          value={formData.nome}
          onChange={handleChange}
          required
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>CPF</Form.Label>
        <Form.Control
          type="text"
          name="cpf"
          value={formData.cpf}
          onChange={handleChange}
          required
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Senha</Form.Label>
        <Form.Control
          type="password"
          name="senha"
          value={formData.senha}
          onChange={handleChange}
          required
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Selecione o Professor</Form.Label>
        <Form.Control
          as="select"
          name="professorId"
          value={formData.professorId}
          onChange={handleChange}
          required
        >
          <option value="">Escolha um professor</option>
          {professores.map((professor) => (
            <option key={professor.id} value={professor.id}>
              {professor.nome}
            </option>
          ))}
        </Form.Control>
      </Form.Group>
      {errorMessage && <p className="text-danger">{errorMessage}</p>}
      <Button variant="primary" type="submit">
        Cadastrar
      </Button>
    </Form>
  );
}

export default AlunoForm;
