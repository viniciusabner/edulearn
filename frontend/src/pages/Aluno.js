import React, { useState } from "react";
import { Container, Button } from "react-bootstrap";
import CustomModal from "../components/CustomModal";
import AlunoForm from "../components/AlunoForm";
import AlunoLoginModal from "../components/AlunoLoginModal";

function Aluno() {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  return (
    <Container className="text-justify mt-5 text-light">
      <h1>Olá Aluno!!!</h1>
      <p className="mt-5">
        <h3>Bem-vindo à Área do Aluno da EduLearn! </h3>
        <br /> Estamos felizes em tê-lo conosco! Aqui, você poderá acessar suas
        aulas, assistir aos vídeos educativos e acompanhar seu progresso nos
        conteúdos disponibilizados pelo seu professor. Faça login para começar a
        aprender ou cadastre-se e junte-se a uma turma para aproveitar ao máximo
        nossos recursos de ensino.
      </p>
      <p className="mt-5">
        <h4>Escolha uma opção abaixo:</h4> <br />
        <strong>Login:</strong> Acesse sua conta e continue sua jornada de
        aprendizado. <br />
        <strong>Cadastro:</strong> Ainda não tem uma conta? Inscreva-se e comece
        a explorar novos conhecimentos.
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
        <AlunoLoginModal />
      </CustomModal>

      <CustomModal
        show={showRegister}
        onHide={() => setShowRegister(false)}
        title="Cadastro de Aluno"
      >
        <AlunoForm onHide={() => setShowRegister(false)} />
      </CustomModal>
    </Container>
  );
}

export default Aluno;
