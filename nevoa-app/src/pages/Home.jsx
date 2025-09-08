import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api"; // seu axios centralizado
import TaskCard from "../components/TaskCard"; // componente inline edit
import "../css/Home.css";

function Home() {
  const navigate = useNavigate();
  const [projetos, setProjetos] = useState([]);

  // Overlay Novo Projeto
  const [showNewProject, setShowNewProject] = useState(false);
  const [novoProjeto, setNovoProjeto] = useState({ nome: "", descricao: "" });

  // Overlay Edição Projeto
  const [selectedProjeto, setSelectedProjeto] = useState(null);
  const [projetoTasks, setProjetoTasks] = useState([]); // Tasks do projeto selecionado

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
      return;
    }
    fetchProjetos();
  }, [navigate]);

  const fetchProjetos = () => {
    const token = localStorage.getItem("token");
    api.get("/projects", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => setProjetos(res.data))
      .catch(err => console.error(err));
  };

  // Saudação
  const hora = new Date().getHours();
  let saudacao = "Boa noite";
  if (hora >= 5 && hora < 12) saudacao = "Bom dia";
  else if (hora >= 12 && hora < 18) saudacao = "Boa tarde";

  // Novo Projeto
  const handleInputChange = e => {
    setNovoProjeto({ ...novoProjeto, [e.target.name]: e.target.value });
  };
  const handleCadastrar = () => {
    const token = localStorage.getItem("token");
    api.post("/projects", novoProjeto, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(() => {
        fetchProjetos();
        setShowNewProject(false);
        setNovoProjeto({ nome: "", descricao: "" });
      })
      .catch(err => console.error(err));
  };

  // Selecionar projeto e carregar tasks
  const handleSelectProjeto = projeto => {
    setSelectedProjeto(projeto);

    const token = localStorage.getItem("token");
    api.get(`/tasks/project/${projeto.id}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => setProjetoTasks(res.data))
      .catch(err => console.error(err));
  };

  // Edição Task Inline
  const updateTaskAPI = (task) => {
    const token = localStorage.getItem("token");
    api.put(`/tasks/${task.id}`, task, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(() => {
        fetchProjetoTasks(selectedProjeto.id);
      })
      .catch(err => console.error(err));
  };

  const fetchProjetoTasks = (projectId) => {
    const token = localStorage.getItem("token");
    api.get(`/tasks/project/${projectId}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => setProjetoTasks(res.data))
      .catch(err => console.error(err));
  };

  // Edição Projeto
  const handleEditChange = e => {
    setSelectedProjeto({ ...selectedProjeto, [e.target.name]: e.target.value });
  };
  const handleSaveProjeto = () => {
    const token = localStorage.getItem("token");
    api.put(`/projects/${selectedProjeto.id}`, selectedProjeto, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(() => {
        fetchProjetos();
        setSelectedProjeto(null);
      })
      .catch(err => console.error(err));
  };

  return (
    <div className="home-container">
      <h1 className="home-greeting">{saudacao} 👋</h1>

      {/* Botão Novo Projeto */}
      <button className="btn-new-project" onClick={() => setShowNewProject(true)}>
        + Novo Projeto
      </button>

      {/* Lista de Projetos */}
      {projetos.length === 0 ? (
        <p className="no-projects">Nenhum projeto cadastrado ainda 😔</p>
      ) : (
        <div className="cards-container">
          {projetos.map(projeto => (
            <div className="card" key={projeto.id} onClick={() => handleSelectProjeto(projeto)}>
              <h3>{projeto.nome}</h3>
              <p>{projeto.descricao}</p>
            </div>
          ))}
        </div>
      )}

      {/* Overlay Novo Projeto */}
      {showNewProject && (
        <div className="overlay">
          <div className="overlay-content">
            <button className="close-overlay" onClick={() => setShowNewProject(false)}>✕</button>
            <h2>Cadastrar Projeto</h2>
            <input
              type="text"
              name="nome"
              placeholder="Nome do projeto"
              value={novoProjeto.nome}
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="descricao"
              placeholder="Descrição"
              value={novoProjeto.descricao}
              onChange={handleInputChange}
            />
            <div className="overlay-buttons">
              <button onClick={handleCadastrar}>Cadastrar</button>
            </div>
          </div>
        </div>
      )}

      {/* Overlay Edição Projeto */}
      {selectedProjeto && (
        <div className="overlay">
          <div className="overlay-content">
            <button className="close-overlay" onClick={() => setSelectedProjeto(null)}>✕</button>
            <h2>Editar Projeto</h2>
            <input
              type="text"
              name="nome"
              value={selectedProjeto.nome}
              onChange={handleEditChange}
              onBlur={handleSaveProjeto}
              onKeyDown={e => e.key === "Enter" && handleSaveProjeto()}
            />
            <input
              type="text"
              name="descricao"
              value={selectedProjeto.descricao}
              onChange={handleEditChange}
              onBlur={handleSaveProjeto}
              onKeyDown={e => e.key === "Enter" && handleSaveProjeto()}
            />

            {/* Lista de Tasks */}
            <div className="tasks-container">
              {projetoTasks.map(task => (
                <TaskCard key={task.id} task={task} onUpdate={updateTaskAPI} />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;
