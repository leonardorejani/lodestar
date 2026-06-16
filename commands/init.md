---
description: Inicializa o Spec-Driven Development neste repo — detecta a stack, escolhe o nivel e gera os docs vivos
argument-hint: '[--level N1|N2|N3] [--existing]'
allowed-tools: Read, Glob, Grep, Write, Edit, Bash, AskUserQuestion, Task
---

# /lodestar:init

Inicializa o SDD no repositorio ATUAL. Voce conduz com julgamento; o engine
deterministico faz o trabalho mecanico.

Argumentos crus: `$ARGUMENTS`

## Passos

1. **Detectar o terreno.** Stack (package.json / deno.json / pyproject), git
   (branch, remote, fork?), codebase existente vs vazia, docs ja existentes
   (`docs/spec.md`, `CLAUDE.md` — nao sobrescrever sem mostrar diff), Supabase
   (migrations/RLS). Reportar em tabela curta.

2. **Escolher o nivel** (ver `${CLAUDE_PLUGIN_ROOT}/NIVEIS.md`). Sugerir pelo que
   detectou e confirmar via AskUserQuestion. Respeitar `--level` se passado.

3. **Novo vs Existente:**
   - **Novo** (ou pasta vazia): pedir a visao do produto e gerar os docs.
   - **Existente** (`--existing` ou codebase presente): LER a codebase e fazer
     engenharia reversa dos docs. **Documentar o que existe — nunca inventar
     feature nem propor refactor.** Marcar o que ja esta "Done" e sugerir a
     proxima NOW. Use o agent Explore pra repos grandes.

4. **Gerar (engine).** Rodar o scaffold pro nivel escolhido:
   ```bash
   node "${CLAUDE_PLUGIN_ROOT}/scripts/scaffold.mjs" --level <N1|N2|N3> --dest .
   ```
   Depois preencher cada doc com o conteudo detectado/descrito (os arquivos
   saem como template; voce os personaliza).

5. **Fechar (gate).** Rodar a verificacao:
   ```bash
   node "${CLAUDE_PLUGIN_ROOT}/scripts/check-docs.mjs" .
   ```
   Mostrar o mapa do que foi criado e o proximo passo (`/lodestar:specify`).
   **Em N3**, oferecer rodar `/lodestar:harden` pra blindar a engenharia
   (CI/PR/merge/deploy, rules, validators, deploy por stack) — interno ao lodestar.

Detalhes da metodologia: skill `lodestar`.
