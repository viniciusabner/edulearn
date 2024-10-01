import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";

function ProfessorForm() {
  const [formData, setFormData] = useState({
    nome: "",
    cpf: "",
    email: "",
    senha: "",
    repetirSenha: "",
  });

  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validate = () => {
    let formErrors = {};
    if (!formData.nome) formErrors.nome = "Nome é obrigatório";
    if (!formData.cpf) formErrors.cpf = "CPF é obrigatório";
    if (!formData.email) formErrors.email = "E-mail é obrigatório";
    if (!formData.senha) formErrors.senha = "Senha é obrigatória";
    if (formData.senha !== formData.repetirSenha)
      formErrors.repetirSenha = "As senhas não coincidem";
    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      try {
        setLoading(true);

        const response = await fetch(
          "http://localhost:5000/api/professores/register",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
          }
        );

        const result = await response.json();
        if (response.ok) {
          setSuccessMessage("Professor cadastrado com sucesso");
          setFormData({
            nome: "",
            cpf: "",
            email: "",
            senha: "",
            repetirSenha: "",
          });
          setErrors({});
        } else {
          setErrors({ server: result.error });
        }
      } catch (error) {
        setErrors({ server: "Erro ao conectar com o servidor" });
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3">
        <Form.Label>Nome</Form.Label>
        <Form.Control
          type="text"
          name="nome"
          value={formData.nome}
          onChange={handleChange}
          isInvalid={!!errors.nome}
        />
        <Form.Control.Feedback type="invalid">
          {errors.nome}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>CPF</Form.Label>
        <Form.Control
          type="text"
          name="cpf"
          value={formData.cpf}
          onChange={handleChange}
          isInvalid={!!errors.cpf}
        />
        <Form.Control.Feedback type="invalid">
          {errors.cpf}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>E-mail</Form.Label>
        <Form.Control
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          isInvalid={!!errors.email}
        />
        <Form.Control.Feedback type="invalid">
          {errors.email}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Senha</Form.Label>
        <Form.Control
          type="password"
          name="senha"
          value={formData.senha}
          onChange={handleChange}
          isInvalid={!!errors.senha}
        />
        <Form.Control.Feedback type="invalid">
          {errors.senha}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Repetir Senha</Form.Label>
        <Form.Control
          type="password"
          name="repetirSenha"
          value={formData.repetirSenha}
          onChange={handleChange}
          isInvalid={!!errors.repetirSenha}
        />
        <Form.Control.Feedback type="invalid">
          {errors.repetirSenha}
        </Form.Control.Feedback>
      </Form.Group>

      {errors.server && <p className="text-danger">{errors.server}</p>}
      {successMessage && <p className="text-success">{successMessage}</p>}

      <Button type="submit" disabled={loading}>
        {loading ? "Cadastrando..." : "Cadastrar"}
      </Button>
    </Form>
  );
}

export default ProfessorForm;
