stock-control-app
├── README.md
├── components.json
├── eslint.config.mjs
├── next-env.d.ts
├── next.config.ts
├── package-lock.json
├── package.json
├── postcss.config.mjs
├── public
│   ├── assets
│   │   └── background.png
│   └── logo.ico
├── src
│   ├── application
│   │   ├── dtos
│   │   ├── repositories
│   │   │   ├── IProductRepository.ts
│   │   │   └── IUserRepository.ts
│   │   ├── services
│   │   │   └── ICryptoService.ts
│   │   └── usecases
│   │       ├── auth
│   │       │   └── LoginUseCase.ts
│   │       └── inventory
│   │           ├── DeleteProductUseCase.ts
│   │           └── ListProductsUseCase.ts
│   ├── domain
│   │   ├── entities
│   │   │   ├── Product.ts
│   │   │   └── User.ts
│   │   └── exceptions
│   │       └── DomainError.ts
│   ├── infrastructure
│   │   ├── auth
│   │   │   └── session.ts
│   │   ├── database
│   │   │   ├── prisma
│   │   │   │   ├── client.ts
│   │   │   │   ├── dev.db
│   │   │   │   ├── migrations
│   │   │   │   │   ├── 20260224155714_init
│   │   │   │   │   │   └── migration.sql
│   │   │   │   │   └── migration_lock.toml
│   │   │   │   ├── schema.prisma
│   │   │   │   └── seed.ts
│   │   │   └── repositories
│   │   │       ├── PrismaProductRepository.ts
│   │   │       └── PrismaUserRepository.ts
│   │   └── security
│   │       └── BcryptCryptoService.ts
│   ├── lib
│   │   ├── auth-middleware.ts
│   │   ├── errorHandler.ts
│   │   ├── globals.d.ts
│   │   ├── prisma.ts
│   │   └── utils.ts
│   ├── presentation
│   │   ├── actions
│   │   │   ├── authAction.ts
│   │   │   └── inventoryAction.ts
│   │   ├── app
│   │   │   ├── (auth)
│   │   │   │   └── login
│   │   │   │       └── page.tsx
│   │   │   ├── dashboard
│   │   │   │   ├── alerts
│   │   │   │   │   └── page.tsx
│   │   │   │   ├── inventory
│   │   │   │   │   └── page.tsx
│   │   │   │   ├── layout.tsx
│   │   │   │   ├── monthly-requests
│   │   │   │   │   └── page.tsx
│   │   │   │   ├── page.tsx
│   │   │   │   ├── request
│   │   │   │   │   └── page.tsx
│   │   │   │   ├── settings
│   │   │   │   │   └── page.tsx
│   │   │   │   └── users
│   │   │   │       └── page.tsx
│   │   │   ├── globals.css
│   │   │   ├── layout.tsx
│   │   │   └── page.tsx
│   │   ├── components
│   │   │   ├── dashboard
│   │   │   │   ├── Sidebar.tsx
│   │   │   │   └── UnauthorizedAlert.tsx
│   │   │   └── ui
│   │   │       ├── avatar.tsx
│   │   │       ├── badge.tsx
│   │   │       ├── button.tsx
│   │   │       ├── card.tsx
│   │   │       ├── form.tsx
│   │   │       ├── input.tsx
│   │   │       ├── label.tsx
│   │   │       └── table.tsx
│   │   ├── hooks
│   │   └── middlewares
│   │       ├── authMiddleware.ts
│   │       └── roleMiddleware.ts
│   ├── proxy.ts
│   └── shared
│       └── utils
└── tsconfig.json