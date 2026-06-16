---
description: Executa a task atual contra a spec (solo, agentes especializados ou pipeline)
argument-hint: '[feature]'
allowed-tools: Read, Glob, Grep, Write, Edit, Bash, Task
---

# /lodestar:implement

So depois do gate `/lodestar:analyze` passar.

Implemente APENAS o que esta em `docs/NOW.md`, contra a spec travada.

Como executar (escolha pelo tamanho):
- **Simples:** implementa direto, mudancas pequenas e reversiveis (KISS).
- **Media:** despacha pros agentes do projeto se existirem (builder-frontend,
  builder-backend, reviewer) — um por frente, em paralelo.
- **Complexa:** usa o pipeline multi-agente (Investigar -> Analisar -> Planejar ->
  Refinar) ou entrega pro executor de fases do projeto.

Durante:
- Trata erros e estados vazios. Valida inputs criticos. Logs basicos onde precisa.
- Mudou regra/contrato/schema -> atualiza `docs/spec.md` no mesmo PR.
- Mudou decisao arquitetural -> atualiza `docs/architecture.md` (ADR) no mesmo PR.
- Nao inventa feature. Nao refatora em massa sem pedido.

Disciplina git: 1 feature = 1 branch = 1 PR. Commit PT-BR, curto, sem atribuir a
IA. Em FORK: confirma o repo antes de qualquer push/PR.
