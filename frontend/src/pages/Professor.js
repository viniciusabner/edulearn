import React, { useState } from "react";
import { Container, Button } from "react-bootstrap";
import CustomModal from "../components/CustomModal";
import ProfessorForm from "../components/ProfessorForm";
import ProfessorLoginModal from "../components/ProfessorLoginModal";

function Professor() {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  return (
    <Container className="text-justify mt-5">
      <h1>Olá professor!!!</h1>
      <p className="mt-5">
        <h3>Bem-vindo à Área do Professor da EduLearn!</h3> <br /> Aqui, você
        encontrará todas as ferramentas necessárias para gerenciar suas aulas
        online e oferecer o melhor conteúdo educacional para os seus alunos.
        Faça login para acessar seus vídeos, acompanhar o progresso dos alunos e
        adicionar novos materiais. Se ainda não tem uma conta, aproveite para se
        cadastrar e começar a compartilhar seus conhecimentos com o mundo!
      </p>
      <p className="mt-5">
        <h4>Escolha uma opção abaixo:</h4> <br />
        <strong>Login:</strong> Acesse sua conta para continuar seu trabalho.{" "}
        <br />
        <strong>Cadastro:</strong> Crie uma nova conta e comece a organizar suas
        aulas. Estamos aqui para ajudar a tornar o ensino mais acessível e
        eficiente.
      </p>
      <div className="mt-4">
        <Button className="m-2" onClick={() => setShowLogin(true)}>
          Login
        </Button>
        <Button className="m-2" onClick={() => setShowRegister(true)}>
          Cadastrar
        </Button>
      </div>

      <CustomModal
        show={showLogin}
        onHide={() => setShowLogin(false)}
        title="Login"
      >
        <ProfessorLoginModal onHide={() => setShowLogin(false)} />
      </CustomModal>

      <CustomModal
        show={showRegister}
        onHide={() => setShowRegister(false)}
        title="Cadastro"
      >
        <ProfessorForm />
      </CustomModal>
    </Container>
  );
}

export default Professor;
