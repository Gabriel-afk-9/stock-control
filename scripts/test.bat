@echo off
REM Estocaí - roda os testes (Vitest).
cd /d "%~dp0.."

echo [estocai] Executando testes...
call npm test
