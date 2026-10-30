# Testes E2E - Automation Exercise

[![Execução de Testes Cypress](https://github.com/Jussara0710/testes-e2e-cypress-github-actions/actions/workflows/cypress.yml/badge.svg)](https://github.com/Jussara0710/testes-e2e-cypress-github-actions/actions/workflows/cypress.yml)

Suíte de testes ponta a ponta desenvolvida com Cypress para validar os principais fluxos do site [Automation Exercise](https://automationexercise.com/). 

O projeto adota o padrão Page Object Model (POM) para manutenção dos seletores e fluxos, execução em esteira de CI via GitHub Actions e geração de relatórios com Mochawesome.

### Tecnologias
- Cypress
- JavaScript
- Node.js
- Mochawesome Reporter
- GitHub Actions

### Cenários cobertos
- Cadastro de novo usuário e validação de e-mail já cadastrado
- Login (sucesso e credenciais inválidas)
- Logout e controle de sessão
- Listagem e detalhes de produto
- Busca de produtos
- Fluxo de compra / checkout
- Inscrição na newsletter
- Exclusão de conta para limpeza da base

### Como rodar o projeto

1. Clone o repositório:
```bash
git clone [https://github.com/Jussara0710/testes-e2e-cypress-github-actions.git](https://github.com/Jussara0710/testes-e2e-cypress-github-actions.git)
cd testes-e2e-cypress-github-actions