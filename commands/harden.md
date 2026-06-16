---
description: Blinda a engenharia do projeto (N3) — instala constituicao equalizada, rules, CI/PR/merge, validators, hooks e deploy
argument-hint: '[--stack vercel|supabase-functions|docker-ghcr|npm-publish|static-pages]'
allowed-tools: Read, Glob, Grep, Write, Edit, Bash, AskUserQuestion
---

# /lodestar:harden

Instala a **camada de qualidade/engenharia** do lodestar no repositorio ATUAL.
E o nivel N3: depois de ter as specs (`/lodestar:init`), isto blinda o repo com
constituicao equalizada, rules, GitHub Actions (CI + review de IA + merge seguro),
validators portaveis, hooks e deploy por stack.

Argumentos crus: `$ARGUMENTS`

## Passos

1. **Detectar.** Stack (Vite/Next/Vercel, Supabase functions, Docker, pacote npm,
   site estatico) -> define o template de deploy. Git/remote/owner. CLAUDE.md ja existe?

2. **Confirmar.** Mostre o que vai instalar e peca ok (a Fase de git pode ser
   destrutiva). Pergunte stack/owner/projeto se nao deu pra inferir (AskUserQuestion).

3. **Instalar (engine).**
   ```bash
   node "${CLAUDE_PLUGIN_ROOT}/scripts/harden.mjs" --dest . \
     --stack <stack> --projeto <nome> --repo <repo> --owner <owner> --mantenedor <nome>
   ```
   Instala em: `.claude/rules/` (7 rules), `.claude/agents/worker.md`,
   `.claude/settings.json`, `.github/workflows/` (ci, pr-auto-review,
   claude-mention, pr-auto-merge, deploy), `scripts/validators/`, `scripts/hooks/`,
   `lefthook.yml`, `.github/PULL_REQUEST_TEMPLATE.md`.

4. **CLAUDE.md (equalizacao).** O engine NUNCA sobrescreve o `CLAUDE.md` existente.
   Se ja existe (do `/lodestar:init`), **mescle** a equalizacao: adicione o indice
   com ponteiro pra TODAS as rules + os invariantes criticos no corpo (merge seguro,
   hierarquia P1-P5, catalisacao). Rule sem ponteiro = rule invisivel.

5. **Auth do CI.** Instrua o token OAuth pros jobs de IA:
   ```
   claude setup-token            # gera o token
   gh secret set CLAUDE_CODE_OAUTH_TOKEN -R <owner>/<repo>
   ```
   Sem o secret, os jobs de IA skipam sem quebrar o PR (graceful degradation).

6. **Smoke test.** Abra um PR trivial (mudanca em `docs/`) e confirme: CI verde,
   review comenta, auto-merge so atua em mudanca inerte. Item que falhar volta pro passo 3.

## Principios
- Analise antes de execucao. Aprovacao por onda (Fase de git e destrutiva).
- Sem secrets commitados (o validador `validate-no-secrets` pega).
- Equalizacao: toda rule tem ponteiro no CLAUDE.md (o `validate-claude-md-sync` quebra o CI se dessincronizar).
- Commits nunca atribuem a IA.
