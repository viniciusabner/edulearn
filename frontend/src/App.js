import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import Home from "./pages/Home";
import Professor from "./pages/Professor";
import Aluno from "./pages/Aluno";
import VideoPage from "./pages/VideoPage";
import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/professor" element={<Professor />} />
        <Route path="/aluno" element={<Aluno />} />
        <Route path="/videos" element={<VideoPage />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
