import React, { useState, useEffect } from "react";
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Header.scss";

function Header() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const alunoId = localStorage.getItem("alunoId");
  const professorId = localStorage.getItem("professorId");
  const role = localStorage.getItem("role");

  useEffect(() => {
    if (alunoId || professorId) {
      setUser({
        id: alunoId || professorId,
        role: role || "aluno",
      });
    }
  }, [alunoId, professorId, role]);

  const handleLogout = () => {
    localStorage.removeItem("alunoId");
    localStorage.removeItem("professorId");
    localStorage.removeItem("role");
    setUser(null);
    navigate("/");
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">
          <img className="logo" src="/logo192.png" alt="Logo" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <Nav.Link as={Link} to="/professor">
              Área do Professor
            </Nav.Link>
            <Nav.Link as={Link} to="/aluno">
              Área do Aluno
            </Nav.Link>

            {user && (
              <NavDropdown title="Usuário" id="basic-nav-dropdown">
                <NavDropdown.Item onClick={handleLogout}>Sair</NavDropdown.Item>
              </NavDropdown>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
