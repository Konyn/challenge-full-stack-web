# Arquitetura do Projeto

Este projeto utiliza a arquitetura Model-View-Controller (MVC) para melhor organização, manutenção, escalabilidade e testabilidade do código.

## Backend (AdonisJS)

O backend foi desenvolvido com AdonisJS, seguindo o padrão MVC para modularidade e escalabilidade. Testes unitários foram implementados utilizando Sinon.

- Banco de dados utilizado MySQL

**Para executar o backend:**

1. **Instalação de dependências:** `pnpm install`
2. **Configuração do `.env`:** Renomeie o arquivo `.env.example` para `.env` e configure as credenciais de acesso ao banco de dados.
3. **Inicialização do servidor:** `pnpm run dev` (o servidor ficará disponível em `http://localhost:3333`)
4. **Migrações e Seeders:**
   - `node ace migrate:run` (cria as tabelas do banco de dados)
   - `node ace db:seed` (popular as tabelas com dados iniciais - um usuário, estudantes e cursos)

## Frontend (Vue.js, Vuetify, Axios, Vue Router, Maska)

O frontend foi construído com:

- Vue.js e Vuetify para a interface do usuário.
- Axios e Vue Router para gerenciamento de rotas e requisições HTTP.
- Maska para máscaras de formatação.

O projeto inclui sistema de rotas, store, autenticação e CRUD de estudantes.

**Para executar o frontend:**

1. **Instalação de dependências:** `pnpm install`
2. **Inicialização do servidor de desenvolvimento:** `pnpm run dev`

**Observação:** O backend precisa estar configurado e rodando para o frontend funcionar corretamente.

## Melhorias Futuras

### Frontend

- **Implementar testes:** Implementar testes unitários e de integração.
- **Melhorar a componentização:** Refatorar o código para melhorar a reutilização de componentes.
- **Melhorar a responsividade:** Aprimorar a responsividade para diferentes dispositivos.
- **Adicionar novas rotas e funcionalidades:** Implementar rotas para criação de cursos e cadastro de alunos em cursos.
- **Melhorar o tratamento de erros:** Implementar um tratamento de erros mais robusto e informativo.
- **Adicionar erro ta tela de login:** Adicionar erro notificando o usúario sobre o login.

### Backend

- **Melhorar o tratamento de erros:** Implementar um tratamento de erros mais robusto e consistente.
- **Padronizar as respostas:** Implementar um padrão consistente para as respostas da API.
- **Implementar armazenamento de imagens:** Implementar o armazenamento de imagens de cursos na nuvem (armazenando apenas a URL pública).
- **Melhorar os testes:** Aprimorar a cobertura e a qualidade dos testes.
- **Erro em testes:** Devido a alguns ajustes feito nas controller 5 testes acabaram quebrando.
- **Explorar mais recursos do AdonisJS:** Explorar mais profundamente os recursos do framework AdonisJS para otimizar o código.

## Não foram entregues

- **Testes:** Não foram implementados teste no frontend

## Considerações Finais

Este projeto foi uma oportunidade incrível para aprender coisas novas e explorar meus limites. Aprendi e conheci os frameworks AdonisJS e Vuetify; inicialmente, foi um pouco estressante, mas, à medida que compreendi seu funcionamento, tornou-se cada vez mais interessante e divertido explorar suas documentações. Foi um grande aprendizado.
