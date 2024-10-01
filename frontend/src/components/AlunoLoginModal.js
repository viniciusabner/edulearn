import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function AlunoLoginModal({ onHide }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/alunos/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, senha }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.removeItem("professorId");
        localStorage.setItem("professorId", data.alunoId);
        localStorage.setItem("role", "aluno");
        navigate("/videos");
      } else {
        setErrorMessage(data.error || "Erro ao fazer login");
      }
    } catch (error) {
      setErrorMessage("Erro ao conectar ao servidor");
    }
  };

  return (
    <Form onSubmit={handleLogin}>
      <Form.Group controlId="formEmail">
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="email"
          placeholder="Digite seu email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </Form.Group>

      <Form.Group controlId="formPassword">
        <Form.Label>Senha</Form.Label>
        <Form.Control
          type="password"
          placeholder="Digite sua senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          required
        />
      </Form.Group>

      {errorMessage && <p className="text-danger mt-2">{errorMessage}</p>}

      <Button variant="primary" type="submit">
        Entrar
      </Button>
    </Form>
  );
}

export default AlunoLoginModal;
