
# Front-end - Nevoa Project

Este é o front-end da aplicação Nevoa, construído com **React**, **Vite** e **Axios** para comunicação com a API.

## Pré-requisitos

- Node.js 18 ou superior
- npm
- Git

## Como rodar

1. Clone o repositório:

```bash
git clone https://github.com/seu-usuario/nevoa-frontend.git
cd nevoa-frontend
````

2. Instale as dependências: 

````bash
npm install
````

3. Configure a URL da API:

Se necessário, edite o arquivo src/api/index.js para alterar a baseURL:

````javascript
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080",
});

export default api;
````

4. Deve ser inicializado o serviço da API através do outro repositório.

5. Rodar o projeto:

````bash

npm run dev

````

6. Abra o navegador em http://localhost:5173

Funcionalidades principais

- Login e cadastro de usuários
- Listagem de projetos
- Criação e edição de projetos
- Adição e edição inline de tasks
- Overlay de cadastro e edição
- Responsivo para desktop e mobile
- Tecnologias
- React 18
- Vite
- Axios
- React Router
- CSS customizado
