# Estocaí — Controle de Estoque e Almoxarifado

Sistema web de controle de estoque construído com **Next.js (App Router)**, **React**, **TypeScript**, **Prisma** e **SQLite** (dev) / **PostgreSQL** (produção), seguindo **Feature First + Clean Architecture + DDD**.

## Stack

- Next.js 16 (App Router, Server Actions, Server Components)
- React 19 / TypeScript 5
- Prisma 6 + SQLite (dev) / PostgreSQL (prod)
- Tailwind CSS 4 + shadcn/ui
- Zod (validação), jose (JWT), bcryptjs (hash), pino (logs), Vitest (testes)

## Arquitetura

Organização por funcionalidade (`feature-first`) com camadas internas:

```text
src/
├── app/                      # App Router (rotas, layouts, error/loading)
├── features/
│   ├── auth/                 # domain / application / infrastructure / presentation / main
│   ├── inventory/
│   └── users/
├── shared/
│   ├── kernel/               # User, UserRole, IUserRepository (contratos compartilhados)
│   ├── lib/                  # logger (pino), rate-limit, errorHandler
│   └── ui/                   # componentes de UI reutilizáveis (badge, button, table, ...)
└── core/                     # errors (DomainError), prisma client
```

Regras (ver `AGENTT.txt`): dependência aponta para dentro (Infra → App → Domain); domínio não conhece frameworks; casos de uso terminam em `UseCase` com contratos `Input`/`Output`; repositórios são interfaces no domínio.

## Pré-requisitos e instalação

```bash
cd stock-control-app
npm install
cp .env.example .env        # ou ajuste DATABASE_URL e JWT_SECRET
npx prisma migrate dev      # aplica migrations e gera o client
npm run dev
```

Variáveis de ambiente (`.env`):

```bash
DATABASE_URL="file:./dev.db"          # dev (SQLite)
JWT_SECRET="<secret com >= 32 caracteres>"   # obrigatório em produção
LOG_LEVEL="debug"                     # opcional (info em produção)
ADMIN_PASSWORD=...                    # usado pelo seed (opcional)
```

## Scripts

| Comando | Descrição |
|---|---|
| `npm run dev` | Servidor de desenvolvimento |
| `npm run build` | Build de produção (Next.js) |
| `npm run lint` | ESLint (flat config) |
| `npm run test` | Testes unitários (Vitest) |
| `npm run test:coverage` | Testes + relatório de cobertura |
| `npx tsc --noEmit` | Verificação de tipos |
| `npx prisma migrate dev` | Criar/editar migrations (dev) |
| `npx prisma db seed` | Popular dados iniciais |

## Modelo de dados

### User (`users`)
- `id` (uuid), `name`, `email` (único), `password` (hash bcrypt), `role`, `createdAt`
- **Roles:** `ADMIN` | `ALMOXARIFE` | `REQUISITOR` (union type único, ver `src/shared/kernel`)

### Product (`products`)
- `id` (uuid), `name`, `sku` (único), `quantity`, `price` (Decimal), `minStock` (default 10), `maxStock?`, `createdAt`, `updatedAt`
- **Status é derivado no domínio** (não persistido): calculado a partir de `quantity` vs `minStock`:
  - `OUT_OF_STOCK` quando `quantity <= 0`
  - `LOW_STOCK` quando `0 < quantity < minStock`
  - `IN_STOCK` caso contrário

## Segurança

- **Sessão JWT** assinada com HMAC (`jose`), cookie `httpOnly`/`secure`/`sameSite: lax`, payload `{ sub, role, name, email }`.
- **Autorização (RBAC):** guards server-side `requireSession()` (layout do dashboard) e `requireRole(...)` (Server Actions sensíveis). Verificação sempre no servidor.
- **Validação:** schemas **Zod** em toda Server Action (login, delete/create produto).
- **Rate limit:** tentativas de login limitadas (in-memory, 5/min).
- **Seed:** credenciais via `.env`, nunca hardcoded.

## Testes

- **Vitest** + Testing Library. Cobertura mínima de **80%** em `domain`/`application` (atualmente 100%).
- Domain: `Product` (status), `InvalidCredentialsError`, `ProductNotFoundError`.
- Application: `LoginUseCase`, `ListProductsUseCase`, `CreateProductUseCase`, `DeleteProductUseCase`.
- Infra: `PrismaProductRepository`, `PrismaUserRepository` (Prisma mockado).
- Server Actions: `loginAction`, `deleteProductAction`, `createProductAction` (mocks de `next/*`, guards e factories).

## CI

GitHub Actions (`.github/workflows/ci.yml`): em push/PR roda `prisma migrate deploy` → `lint` → `tsc --noEmit` → `test` → `build`.

## Produção

- Recomendado **PostgreSQL** para `Decimal` nativo (o SQLite armazena como float) e enums reais de role.
- Defina `JWT_SECRET` forte (>= 32 caracteres) e `NODE_ENV=production` (ativa cookie `secure` e logs `info`).
- Substitua o rate limit in-memory por solução distribuída (ex.: Upstash) em múltiplas instâncias.
