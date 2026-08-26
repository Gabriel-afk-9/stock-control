

Atue como um **Staff Frontend Engineer**, **Software Architect** e especialista em **Next.js**, **React**, **TypeScript**, **Clean Architecture**, **Domain-Driven Design (DDD)**, **Feature-First Architecture**, **SOLID**, **Clean Code**, **Design Patterns** e arquitetura de aplicações web escaláveis.

## Contexto

Estou desenvolvendo um sistema web de **Controle de Estoque e Almoxarifado** utilizando:

- Next.js (App Router)
- React
- TypeScript

Durante o desenvolvimento tentei aplicar diversas boas práticas de arquitetura, porém o projeto evoluiu de forma gradual e hoje percebo que existem inconsistências.

Algumas partes seguem Feature First.

Outras seguem organização por camadas.

Algumas responsabilidades estão bem definidas.

Outras ficaram misturadas.

Também existem módulos que poderiam ser melhor organizados.

Vou fornecer a árvore completa do projeto para análise.

```text
stock-control/
├─ stock-control-app/
│  ├─ public/
│  │  ├─ assets/
│  │  │  └─ background.png
│  │  └─ logo.ico
│  ├─ src/
│  │  ├─ application/
│  │  │  ├─ dtos/
│  │  │  ├─ repositories/
│  │  │  │  ├─ IProductRepository.ts
│  │  │  │  └─ IUserRepository.ts
│  │  │  ├─ services/
│  │  │  │  └─ ICryptoService.ts
│  │  │  └─ usecases/
│  │  │     ├─ auth/
│  │  │     │  └─ LoginUseCase.ts
│  │  │     └─ inventory/
│  │  │        ├─ DeleteProductUseCase.ts
│  │  │        └─ ListProductsUseCase.ts
│  │  ├─ domain/
│  │  │  ├─ entities/
│  │  │  │  ├─ Product.ts
│  │  │  │  └─ User.ts
│  │  │  └─ exceptions/
│  │  │     └─ DomainError.ts
│  │  ├─ infrastructure/
│  │  │  ├─ auth/
│  │  │  │  └─ session.ts
│  │  │  ├─ database/
│  │  │  │  ├─ prisma/
│  │  │  │  │  ├─ migrations/
│  │  │  │  │  │  ├─ 20260224155714_init/
│  │  │  │  │  │  │  └─ migration.sql
│  │  │  │  │  │  └─ migration_lock.toml
│  │  │  │  │  ├─ client.ts
│  │  │  │  │  ├─ dev.db
│  │  │  │  │  ├─ schema.prisma
│  │  │  │  │  └─ seed.ts
│  │  │  │  └─ repositories/
│  │  │  │     ├─ PrismaProductRepository.ts
│  │  │  │     └─ PrismaUserRepository.ts
│  │  │  └─ security/
│  │  │     └─ BcryptCryptoService.ts
│  │  ├─ lib/
│  │  │  ├─ auth-middleware.ts
│  │  │  ├─ errorHandler.ts
│  │  │  ├─ globals.d.ts
│  │  │  ├─ prisma.ts
│  │  │  └─ utils.ts
│  │  ├─ presentation/
│  │  │  ├─ actions/
│  │  │  │  ├─ authAction.ts
│  │  │  │  └─ inventoryAction.ts
│  │  │  ├─ app/
│  │  │  │  ├─ (auth)/
│  │  │  │  │  └─ login/
│  │  │  │  │     └─ page.tsx
│  │  │  │  ├─ dashboard/
│  │  │  │  │  ├─ alerts/
│  │  │  │  │  │  └─ page.tsx
│  │  │  │  │  ├─ inventory/
│  │  │  │  │  │  └─ page.tsx
│  │  │  │  │  ├─ monthly-requests/
│  │  │  │  │  │  └─ page.tsx
│  │  │  │  │  ├─ request/
│  │  │  │  │  │  └─ page.tsx
│  │  │  │  │  ├─ settings/
│  │  │  │  │  │  └─ page.tsx
│  │  │  │  │  ├─ users/
│  │  │  │  │  │  └─ page.tsx
│  │  │  │  │  ├─ layout.tsx
│  │  │  │  │  └─ page.tsx
│  │  │  │  ├─ globals.css
│  │  │  │  ├─ layout.tsx
│  │  │  │  └─ page.tsx
│  │  │  ├─ components/
│  │  │  │  ├─ dashboard/
│  │  │  │  │  ├─ Sidebar.tsx
│  │  │  │  │  └─ UnauthorizedAlert.tsx
│  │  │  │  └─ ui/
│  │  │  │     ├─ avatar.tsx
│  │  │  │     ├─ badge.tsx
│  │  │  │     ├─ button.tsx
│  │  │  │     ├─ card.tsx
│  │  │  │     ├─ form.tsx
│  │  │  │     ├─ input.tsx
│  │  │  │     ├─ label.tsx
│  │  │  │     └─ table.tsx
│  │  │  ├─ hooks/
│  │  │  └─ middlewares/
│  │  │     ├─ authMiddleware.ts
│  │  │     └─ roleMiddleware.ts
│  │  ├─ shared/
│  │  │  └─ utils/
│  │  └─ proxy.ts
│  ├─ .env
│  ├─ .gitignore
│  ├─ components.json
│  ├─ eslint.config.mjs
│  ├─ next-env.d.ts
│  ├─ next.config.ts
│  ├─ package-lock.json
│  ├─ package.json
│  ├─ postcss.config.mjs
│  ├─ README.md
│  └─ tsconfig.json
└─ README.md

```

Meu objetivo é transformar esse projeto em uma base de código profissional, preparada para crescer durante os próximos anos.

---

# Objetivo

Sua tarefa NÃO é simplesmente mover arquivos.

Quero que você faça uma **revisão arquitetural completa**.

Primeiro:

- analise toda a estrutura;
- entenda como o projeto funciona;
- identifique problemas;
- identifique inconsistências;
- identifique violações de arquitetura.

Somente depois proponha uma nova arquitetura.

A refatoração deve preservar totalmente o funcionamento da aplicação.

---

# Stack

Considere que o projeto utiliza:

- Next.js App Router
- React
- TypeScript
- Server Components
- Client Components
- Server Actions (quando fizer sentido)
- API Routes
- Fetch API

Caso exista alguma organização mais adequada para essa stack, proponha.

---

# Quero utilizar

- Clean Architecture
- Feature First
- Domain Driven Design (DDD)
- SOLID
- Clean Code
- Separation of Concerns
- Vertical Slice Architecture (quando fizer sentido)
- Composition over Inheritance
- Dependency Inversion
- Design Patterns

A arquitetura deve ser preparada para crescer.

---

# Quero eliminar

Quero remover completamente:

- arquivos duplicados;
- código legado;
- responsabilidades mal definidas;
- componentes gigantes;
- hooks fazendo regras de negócio;
- services misturados com componentes;
- páginas contendo lógica de negócio;
- validações espalhadas;
- tipos duplicados;
- interfaces repetidas;
- funções utilitárias espalhadas;
- dependências circulares;
- imports confusos;
- excesso de arquivos na raiz do projeto;
- acoplamento excessivo.

---

# Arquitetura desejada

Quero utilizar **Feature First** como estratégia principal.

As funcionalidades devem ser o principal critério de organização.

Exemplo:

```text
src/

app/

shared/

features/

    products/

    inventory/

    warehouse/

    suppliers/

    users/

    authentication/

    movements/

    dashboard/
```

Cada feature deve ser isolada.

Dentro de cada feature podem existir camadas próprias quando necessário.

Por exemplo:

```text
products/

    application/

    domain/

    infrastructure/

    presentation/

    components/

    hooks/

    services/

    dto/

    schemas/

    types/
```

Esse exemplo é apenas uma referência.

Caso exista uma organização melhor para Next.js, utilize-a.

---

# Organização

Todo o código da aplicação deve ficar dentro de **src/**.

Quero reduzir ao máximo arquivos espalhados.

Cada pasta deve possuir uma responsabilidade clara.

Nada deve ficar em locais genéricos sem necessidade.

---

# Organização do App Router

Analise se a organização do diretório **app/** está adequada.

Verifique:

- rotas;
- layouts;
- loading;
- error;
- templates;
- providers;
- route groups;
- parallel routes;
- intercepting routes.

Caso exista uma organização melhor, proponha.

---

# Componentes React

Analise todos os componentes.

Verifique:

- componentes grandes;
- componentes reutilizáveis;
- componentes específicos;
- componentes compartilhados;
- responsabilidades.

Separe corretamente:

- UI
- lógica
- domínio
- estado

---

# Hooks

Verifique todos os hooks.

Eles não devem conter regras de negócio complexas.

Devem encapsular apenas comportamento relacionado ao React.

Caso exista lógica de domínio, mova-a para a camada correta.

---

# Services

Verifique todos os services.

Garanta que eles sejam responsáveis apenas por comunicação externa.

Não quero regras de negócio dentro de services.

---

# Domínio

Toda regra de negócio deve ficar isolada.

O domínio não deve depender de:

- React
- Next.js
- componentes
- hooks
- UI
- APIs

O domínio deve ser totalmente independente.

---

# Shared

Analise tudo que está em **shared**.

Verifique se realmente faz sentido ser compartilhado.

Caso algo pertença a uma feature específica, mova-o.

Evite criar um diretório shared gigante.

---

# Validações

Centralize validações.

Caso utilize Zod ou outra biblioteca, organize schemas adequadamente.

Não espalhe validações pelos componentes.

---

# Tipos

Centralize apenas os tipos realmente compartilhados.

Evite duplicações.

Evite interfaces espalhadas.

---

# SOLID

Analise rigorosamente:

- Single Responsibility Principle
- Open/Closed Principle
- Liskov Substitution Principle
- Interface Segregation Principle
- Dependency Inversion Principle

Explique onde existem violações.

Refatore quando necessário.

---

# Clean Code

Analise:

- nomes;
- responsabilidades;
- acoplamento;
- duplicação;
- tamanho de arquivos;
- tamanho de componentes;
- tamanho de hooks;
- legibilidade;
- organização.

---

# Performance

Sempre que possível, proponha melhorias relacionadas a:

- Server Components
- Client Components
- Suspense
- Lazy Loading
- Memoization
- Renderização
- Bundle Size

Sem prejudicar a arquitetura.

---

# Refatoração

Durante a refatoração:

- mova arquivos;
- renomeie módulos;
- atualize imports;
- preserve aliases;
- elimine duplicações;
- elimine código morto;
- preserve o comportamento da aplicação.

---

# Antes de modificar

Primeiro faça uma análise completa.

Explique:

- os problemas encontrados;
- quais princípios arquiteturais estão sendo violados;
- quais responsabilidades estão incorretas;
- quais módulos deveriam existir;
- quais módulos deveriam deixar de existir.

---

# Depois apresente

Antes de modificar qualquer código, apresente:

1. A nova árvore completa do projeto.
2. A responsabilidade de cada diretório.
3. A responsabilidade de cada feature.
4. O fluxo entre as camadas.
5. Como ocorrerá a comunicação entre as features.
6. Como as dependências serão organizadas.
7. Quais padrões de projeto serão utilizados.

Somente depois comece a refatoração.

---

# Resultado esperado

Quero que o projeto tenha a qualidade arquitetural encontrada em aplicações profissionais desenvolvidas por equipes experientes utilizando Next.js e TypeScript.

A arquitetura deve ser preparada para crescer continuamente, suportando novas funcionalidades sem perda de organização.

Sempre prefira decisões arquiteturais sólidas em vez de simplesmente mover arquivos.

Caso identifique oportunidades de melhoria além das solicitadas, explique-as e implemente-as quando fizer sentido, justificando cada decisão.