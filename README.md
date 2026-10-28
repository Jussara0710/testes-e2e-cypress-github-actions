# Testes E2E - Automation Exercise com Cypress

Projeto prático de automação de testes End-to-End desenvolvido para validar os principais fluxos do e-commerce [Automation Exercise](https://automationexercise.com/). 

A estrutura utiliza o padrão **Page Object Model (POM)** para manter o código limpo e de fácil manutenção, além de rodar testes automatizados via **GitHub Actions** com relatórios visuais no **Mochawesome**.

🔗 **Repositório no GitHub:** [testes-e2e-cypress-github-actions](https://github.com/Jussara0710/testes-e2e-cypress-github-actions)

---

### 💻 Tecnologias
- **Cypress**
- **JavaScript / Node.js**
- **GitHub Actions** (CI/CD)
- **Cypress Mochawesome Reporter** (Relatórios em HTML)

---

### 🧪 Cenários Testados
- Cadastro de novo usuário com dados dinâmicos
- Login com credenciais válidas e inválidas
- Logout e persistência de sessão
- Busca e listagem de produtos
- Inclusão de itens no carrinho e fluxo de checkout
- Inscrição na newsletter
- Exclusão da conta criada (limpeza pós-teste)

---

### 🚀 Como Rodar Localmente

1. Clone o projeto e acesse a pasta:
```bash
git clone https://github.com/Jussara0710/testes-e2e-cypress-github-actions.git
cd testes-e2e-cypress-github-actions
```

2. Instale as dependências:
```bash
npm install
```

3. Execute os testes:
```bash
# Execução no terminal em segundo plano (gera o relatório)
npm test

# Ou abrir o painel interativo do Cypress
npx cypress open
```

---

### 📊 Relatório de Testes
Após rodar com `npm test`, o relatório com gráficos e evidências fica disponível em:
`cypress/reports/html/index.html` (basta dar dois cliques para abrir no navegador).
