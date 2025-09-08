import { useState } from "react";
import { useNavigate } from "react-router-dom"
import api from "../api/api";
import "../css/style.css";

function Login() {
  const navigate = useNavigate();
  const [isRegister, setIsRegister] = useState(false);
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    senha: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const toggleForm = () => {
    setIsRegister(!isRegister);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/auth/login", {
        email: formData.email,
        senha: formData.senha,
      });

      localStorage.setItem("token", response.data.token);
      navigate("/home");

      console.log("Login bem-sucedido");
    } catch (error) {
      console.error("Erro ao fazer login:", error.response?.data || error);
    }
  };

  // Função para cadastro
  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/auth/register", {
        nome: formData.nome,
        email: formData.email,
        senha: formData.senha,
      });
      console.log("Usuário cadastrado:", response.data);

      // depois de cadastrar, já pode logar ou voltar para tela de login
      setIsRegister(false);
    } catch (error) {
      console.error("Erro ao cadastrar:", error.response?.data || error);
    }
  };

  return (
    <div className="container">
      <div className={`form-container ${isRegister ? "flip" : ""}`}>
        {/* Login Form */}
        <form className="form front" onSubmit={handleLogin}>
          <h1>Login</h1>
          <input
            type="email"
            name="email"
            placeholder="Digite seu e-mail"
            value={formData.email}
            onChange={handleChange}
          />
          <input
            type="password"
            name="senha"
            placeholder="Digite sua senha"
            value={formData.senha}
            onChange={handleChange}
          />
          <button type="submit">Entrar</button>
          <p className="switch" onClick={toggleForm}>
            Não tem conta? Cadastre-se
          </p>
        </form>

        {/* Register Form */}
        <form className="form back" onSubmit={handleRegister}>
          <h1>Cadastro</h1>
          <input
            type="text"
            name="nome"
            placeholder="Nome"
            value={formData.nome}
            onChange={handleChange}
          />
          <input
            type="email"
            name="email"
            placeholder="E-mail"
            value={formData.email}
            onChange={handleChange}
          />
          <input
            type="password"
            name="senha"
            placeholder="Senha"
            value={formData.senha}
            onChange={handleChange}
          />
          <button type="submit">Cadastrar</button>
          <p className="switch" onClick={toggleForm}>
            Já tem conta? Faça login
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
