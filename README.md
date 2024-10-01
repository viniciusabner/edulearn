# EduLearn - Plataforma de Ensino Online

Descrição do Projeto: 
EduLearn é uma plataforma de ensino online que permite que professores criem conteúdos educacionais em vídeo e compartilhem com seus alunos. Alunos podem se cadastrar e visualizar os vídeos disponibilizados por seus respectivos professores, promovendo um ambiente de aprendizado personalizado. A aplicação possui um sistema de login/cadastro para professores e alunos, gerenciamento de vídeos, e controle de acesso baseado no papel (aluno/professor).

# 1. Instruções de Instalação

1.1. Clonando o Repositório
Abra o terminal ou prompt de comando.

Clone o repositório do projeto no GitHub para o seu computador local:

git clone https://github.com/usuario/edulearn.git
Navegue até a pasta do projeto:

cd edulearn
1.2. Instalando as Dependências
O projeto é dividido em Frontend e Backend, sendo necessário instalar as dependências para ambos.

1.2.1. Frontend
Acesse o diretório do frontend:

cd frontend
Instale as dependências usando o npm ou yarn:

npm install
ou
yarn install

1.2.2. Backend
Acesse o diretório do backend:

cd backend
Instale as dependências:

npm install
ou
yarn install

# 2. Configuração das Chaves de Acesso

2.1. Supabase
Supabase é usado para o gerenciamento de vídeos e dados dos usuários (professores e alunos).

Acesse o console do Supabase.
Crie um novo projeto.
Configure a autenticação de email/senha e crie as tabelas necessárias (professores, alunos, videos).
Copie a API URL e a Chave de Serviço (Service Role Key) do Supabase.

No arquivo backend/.env, insira as chaves da seguinte forma:
SUPABASE_URL=your-supabase-url
SUPABASE_KEY=your-service-role-key

2.3. Firestore / SQL / MongoDB (Banco de Dados)
O banco de dados utilizado no EduLearn é o Supabase (PostgreSQL), mas para outras opções de banco de dados, siga as instruções específicas da tecnologia desejada.

# 3. Execução do Projeto

3.1. Executando o Frontend
Navegue até o diretório do frontend:

cd frontend
Execute o servidor de desenvolvimento:

npm start
Acesse a aplicação no seu navegador no endereço:

http://localhost:3000

3.2. Executando o Backend
Navegue até o diretório do backend:

cd backend
Certifique-se de que o arquivo .env está configurado com as chaves do Supabase.

Execute o servidor backend:

npm start
O backend será executado em:

http://localhost:5000

3.3. Fluxo Completo de Uso
Aqui está um passo a passo de como simular o fluxo completo da aplicação:

# Professor:
Acesse a área de Professor.
Faça o Cadastro ou Login.
Após o login, o professor pode adicionar, editar ou excluir vídeos educacionais que seus alunos poderão assistir.

# Aluno:
Acesse a área de Aluno.
Faça o Cadastro vinculando-se a um professor específico.
Após o login, o aluno poderá visualizar apenas os vídeos cadastrados pelo seu professor.

# 4. Exemplo de Arquivos de Configuração

4.1. Arquivo .env.example para o Backend
SUPABASE_URL=your-supabase-url
SUPABASE_KEY=your-supabase-key

4.2. Estrutura de Banco de Dados no Supabase
Certifique-se de criar as seguintes tabelas no Supabase:

Tabela: professores
id: Chave primária (UUID)
nome: Texto
cpf: Texto
email: Texto
senha: Texto (armazenada com hash)

Tabela: alunos
id: Chave primária (UUID)
nome: Texto
cpf: Texto
email: Texto
senha: Texto (armazenada com hash)
professor_id: Chave estrangeira (referência à tabela professores)

Tabela: videos
id: Chave primária (UUID)
titulo: Texto
descricao: Texto
url: Texto
professor_id: Chave estrangeira (referência à tabela professores)

# 5. Tecnologias Utilizadas
React: Utilizado para o frontend.
Bootstrap: Estilização da interface.
Supabase: Backend como serviço e banco de dados PostgreSQL.
Node.js: Backend utilizando o framework Express.
bcrypt.js: Utilizado para hash de senhas.

# 6. Considerações Finais
Este projeto foi desenvolvido com o intuito de facilitar a criação e consumo de conteúdos educacionais em vídeo por professores e alunos. Ele está preparado para ser escalável, utilizando tecnologias modernas e seguras. Certifique-se de configurar corretamente as variáveis de ambiente e chaves de acesso antes de rodar o projeto.

Se houver qualquer dúvida ou problema durante a configuração ou execução, por favor, entre em contato com o time de desenvolvimento.