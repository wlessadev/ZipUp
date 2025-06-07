# ZipUp

Aplicação desenvolvida como parte do teste técnico para a vaga de Desenvolvedor Frontend Júnior na HBI (Leopoldina/MG).

## 📌 Descrição

ZipUp é uma aplicação web responsiva criada com Next.js 13.3.2. O objetivo do projeto é construir uma página de cadastro de usuário com preenchimento automático de endereço via API pública do ViaCEP. Além disso, foi desenvolvida uma versão mobile com React Native (Expo) como diferencial.

---

## ⚙️ Tecnologias Utilizadas

- **Next.js 13.3.2** – Estrutura baseada em React com suporte nativo a rotas e renderização otimizada
- **React Hook Form** – Gerenciamento de formulários com performance e simplicidade
- **Axios** – Requisições HTTP de forma simples e performática
- **MUI (Material UI)** – Componentes visuais prontos, responsivos e personalizáveis
- **React Native (Expo)** – Versão mobile que consome a mesma API ViaCEP

---

## 🧠 Escolhas Técnicas

### ✔️ Next.js 13.3.2
Escolhido por ser um diferencial proposto no teste e por oferecer uma estrutura robusta para desenvolvimento web moderno, com suporte à renderização no servidor e organização por rotas automáticas.

### ✔️ React Hook Form
Biblioteca leve, moderna e altamente performática para controle de formulários. Integra-se muito bem ao MUI e mantém o código mais enxuto.

### ✔️ MUI
Oferece uma experiência de design consistente e profissional, além de componentes acessíveis e responsivos com ótima integração ao React Hook Form.

### ✔️ Axios
Escolhido por sua sintaxe simples, controle de erros embutido e ampla adoção no ecossistema React para consumir APIs, como a ViaCEP.

---

## 💻 Funcionalidades

- **Página Inicial**
  - Banner com nome do projeto
  - Exibição da data atual

- **Página de Cadastro**
  - Campos: nome, e-mail, data de nascimento, celular, CEP, endereço, número, bairro, cidade e UF
  - Preenchimento automático do endereço ao digitar o CEP
  - Validação do CEP com mensagens de erro se inválido
  - Exibição do resumo dos dados cadastrados abaixo do formulário

---

## 📱 Versão Mobile (Diferencial)

Criada com **React Native (Expo)**, com tela de entrada de CEP e exibição dos dados de endereço vindos da API ViaCEP.

---
