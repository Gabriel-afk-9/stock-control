@echo off
REM Estocaí - sobe o ambiente local (SQLite) e inicia a aplicacao.
REM Executa a partir da raiz do projeto (estocai/).

cd /d "%~dp0.."

IF NOT EXIST .env (
  echo [estocai] .env nao encontrado. Copiando .env.example -> .env
  copy .env.example .env
)

echo [estocai] Gerando cliente Prisma...
call npx prisma generate

echo [estocai] Aplicando migrations (SQLite)...
call npx prisma migrate deploy

echo [estocai] Populando o banco (seed)...
call npx prisma db seed

echo [estocai] Iniciando a aplicacao em http://localhost:3000 ...
call npm run dev
