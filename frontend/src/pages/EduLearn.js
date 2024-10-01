import React from "react";
import { Container } from "react-bootstrap";

function EduLearn() {
  return (
    <Container className="mt-5 text-light">
      <h1>Bem-vindo à EduLearn!!!</h1>
      <img className="m-5" src="/logo192.png" alt="Logo" />
      <p>
        A EduLearn é uma plataforma de ensino online projetada para conectar
        alunos e professores de todo o mundo. Oferecemos uma vasta gama de
        cursos em diversas áreas do conhecimento, permitindo que cada aluno
        possa aprender no seu próprio ritmo, em qualquer lugar e a qualquer
        momento. Com a EduLearn, acreditamos que a educação deve ser acessível e
        personalizada, garantindo que os alunos tenham acesso ao conteúdo mais
        atualizado e relevante.
      </p>
      <p>
        Nossa missão é capacitar professores a compartilharem seu conhecimento e
        experiência de maneira eficiente, enquanto os alunos têm a oportunidade
        de aprender diretamente com especialistas. Através de uma interface
        intuitiva e interativa, os alunos podem acompanhar suas aulas,
        participar de discussões, e acessar materiais didáticos de forma prática
        e segura.
      </p>
    </Container>
  );
}

export default EduLearn;
