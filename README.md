✅ Full Stack Todo List

Spring Boot + React

Projeto de gerenciamento de tarefas (Todo List) desenvolvido com arquitetura Full Stack desacoplada, utilizando uma API REST robusta no backend e uma interface moderna e dinâmica no frontend.

🚀 Tecnologias Utilizadas
🖥️ Backend

Java 17

Spring Boot 3

Spring Data JPA

H2 Database (banco de dados em memória)

Lombok

🌐 Frontend

React.js

Axios (comunicação com a API)

CSS3 (estilização responsiva)

☁️ Hospedagem

Vercel (Frontend)

🛠️ Como Executar o Projeto
▶️ Rodando o Backend (API)

Navegue até a pasta do backend

Execute o comando:

mvn spring-boot:run


A API estará disponível em:
📍 http://localhost:8080

▶️ Rodando o Frontend (React)

Navegue até a pasta do frontend

Instale as dependências:

npm install


Inicie a aplicação:

npm start

🌐 Deploy no Vercel

O frontend do projeto está hospedado no Vercel.
https://spring-react-todo.vercel.app

⚠️ Nota Importante
O backend roda localmente (http://localhost:8080).
Para que o frontend hospedado no Vercel funcione corretamente, é necessário:

Estar com o Spring Boot rodando localmente

Acessar o link do Vercel no mesmo navegador

Isso ocorre porque o frontend consome a API local.

📌 Endpoints da API
Método	Endpoint	Descrição
GET	/api/todos	Lista todas as tarefas
POST	/api/todos	Cria uma nova tarefa
PUT	/api/todos/{id}	Alterna o status da tarefa (concluída)
DELETE	/api/todos/{id}	Remove uma tarefa

👨‍💻 Autor

Desenvolvido por Marcus Rodrigues 🚀
