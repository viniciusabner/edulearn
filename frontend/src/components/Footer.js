import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faInstagram,
  faLinkedinIn,
} from "@fortawesome/free-brands-svg-icons";
import { faEnvelope, faPhone } from "@fortawesome/free-solid-svg-icons";
import "../styles/Footer.scss";

function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <h5>Sobre EduLearn</h5>
            <p>
              EduLearn é uma plataforma de ensino online onde alunos e
              professores se conectam para uma experiência de aprendizado
              dinâmica e personalizada.
            </p>
          </div>
          <div className="col-md-4">
            <h5>Links Úteis</h5>
            <ul className="list-unstyled">
              <li>
                <a href="/about">Sobre Nós</a>
              </li>
              <li>
                <a href="/terms">Termos de Serviço</a>
              </li>
              <li>
                <a href="/privacy">Política de Privacidade</a>
              </li>
              <li>
                <a href="/contact">Contato</a>
              </li>
            </ul>
          </div>
          <div className="col-md-4">
            <h5>Contato</h5>
            <p>
              <FontAwesomeIcon icon={faPhone} /> +55 11 99999-9999
            </p>
            <p>
              <FontAwesomeIcon icon={faEnvelope} /> contato@edulearn.com
            </p>

            <h5>Redes Sociais</h5>
            <ul className="social-icons">
              <li>
                <a href="https://facebook.com">
                  <FontAwesomeIcon icon={faFacebookF} />
                </a>
              </li>
              <li>
                <a href="https://instagram.com">
                  <FontAwesomeIcon icon={faInstagram} />
                </a>
              </li>
              <li>
                <a href="https://linkedin.com">
                  <FontAwesomeIcon icon={faLinkedinIn} />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="row mt-3">
        <div className="col text-center">
          <p>
            &copy; {new Date().getFullYear()} EduLearn. Todos os direitos
            reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
