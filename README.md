# Stock Control System

Este projeto é um sistema de controle de estoque desenvolvido com **Next.js**, **TypeScript**, **TailwindCSS** e **Prisma ORM** utilizando **SQLite** como banco de dados. Ele oferece funcionalidades essenciais para o gerenciamento de almoxarifado, incluindo autenticação de usuários e controle detalhado de produtos.

## Funcionalidades

*   **Autenticação de Usuários:** Sistema de login para acesso seguro.
*   **Gerenciamento de Produtos:** Cadastro, visualização, edição e exclusão de produtos com os seguintes atributos:
    *   `id`: Identificador único do produto.
    *   `itemCode`: Código único do item (ex: "001", "002").
    *   `description`: Descrição detalhada do produto (opcional).
    *   `name`: Nome do produto.
    *   `unit`: Unidade de medida (ex: "CX" para caixa, "UN" para unidade).
    *   `quantity`: Quantidade atual em estoque.
    *   `minStock`: Estoque mínimo para alerta.
    *   `maxStock`: Estoque máximo.
    *   `category`: Categoria do produto.
    *   `updatedAt`: Data da última atualização.
*   **Controle de Estoque:** Monitoramento de quantidades em estoque, com definição de limites mínimos e máximos.

## Tecnologias Utilizadas

*   **Next.js:**
*   **TypeScript:**
*   **TailwindCSS:**
*   **Prisma ORM:**
*   **SQLite:**

## Como Rodar o Projeto Localmente

Para configurar e executar o projeto em sua máquina local, siga os passos abaixo:

### Pré-requisitos

Certifique-se de ter as seguintes ferramentas instaladas:

*   Node.js (versão 18 ou superior)
*   npm ou Yarn
*   Git

### Instalação

1.  **Clone o repositório:**

    ```bash
    git clone https://github.com/Gabriel-afk-9/stock-control.git
    cd stock-control/stock-control-app
    ```

2.  **Instale as dependências:**

    ```bash
    npm install
    # ou
    yarn install
    ```

3.  **Configure o banco de dados:**

    Crie um arquivo `.env` na raiz do diretório `stock-control-app` com a seguinte variável de ambiente:

    ```
    DATABASE_URL="file:./dev.db"
    ```

    Em seguida, gere o cliente Prisma e execute as migrações:

    ```bash
    npx prisma generate
    npx prisma migrate dev --name init
    npx prisma db seed
    ```

4.  **Execute o servidor de desenvolvimento:**

    ```bash
    npm run dev
    # ou
    yarn dev
    ```

    Abra [http://localhost:3000](http://localhost:3000) no seu navegador para ver o resultado.

## Estrutura do Projeto

```
stock-control/
├── stock-control-app/
│   ├── prisma/             # Esquemas e migrações do Prisma
│   │   └── schema.prisma
│   ├── public/             # Arquivos estáticos
│   ├── src/                # Código fonte da aplicação
│   │   ├── actions/        # Ações do servidor
│   │   ├── app/            # Rotas e componentes da aplicação (Next.js App Router)
│   │   │   ├── (auth)/login/ # Rotas de autenticação
│   │   │   ├── (dashboard)/dashboard/ # Rotas do dashboard
│   │   │   ├── lib/        # Funções utilitárias e bibliotecas
│   │   │   ├── globals.css # Estilos globais
│   │   │   ├── layout.tsx  # Layout principal da aplicação
│   │   │   └── page.tsx    # Página inicial
│   │   └── components/     # Componentes reutilizáveis
│   ├── .gitignore
│   ├── README.md
│   ├── package.json
│   └── tsconfig.json
└── README.md
```
