---
name: lodestar
description: "Conduz Spec-Driven Development (SDD) em qualquer projeto. Invocada quando o usuario roda /lodestar:init (ou qualquer /lodestar:*), pede 'iniciar SDD', 'aplicar spec-driven', 'criar specs do projeto', 'documentar projeto pra IA', 'spec como fonte da verdade', menciona 'lodestar', 'sdd', 'spec kit', 'specify/plan/tasks/implement' — mesmo que so descreva querer estruturar um projeto pra codar com IA sem perder o controle. Gera docs vivos (spec/PRD/architecture/NOW), conduz o fluxo specify->clarify->plan->tasks->analyze->implement->archive em 3 niveis adaptativos (micro->sistema), faz engenharia reversa dos docs em projeto existente, e no N3 instala a camada de qualidade/engenharia (CI/PR/merge/deploy, rules, validators) via /lodestar:harden. NAO use pra plano pontual de uma unica task (use planning)."
---

# lodestar — Spec-Driven Development

A spec e a estrela que guia o projeto. A IA implementa contra a spec, nunca contra a propria imaginacao.

Combina o melhor de tres mundos:
- **Governance** (GitHub Spec Kit): constituicao + fluxo `specify -> clarify -> plan -> tasks -> analyze -> implement`.
- **Continuity** (OpenSpec): `spec.md` como fonte da verdade VIVA + `changes/` com delta specs arquivados na spec ao fechar (a spec cresce com o projeto, nao envelhece).
- **Execution** (arsenal local): pipeline multi-agente, agentes especializados, validators portaveis.

PT-BR, temperado pra TS/React/Vite/Supabase, **adaptativo em 3 niveis**.

---

## Conceito central

**A spec e a lei. O codigo e consequencia.**

1. Voce especifica o comportamento (`docs/spec.md`).
2. A IA implementa contra a spec.
3. Toda mudanca de regra/contrato atualiza a spec **no mesmo PR**.
4. Conflito entre documento e pedido -> a spec vence (ou voce muda a spec explicitamente).

---

## Comandos (plugin)

| Comando | Etapa | Produz |
|---|---|---|
| `/lodestar:init` | bootstrap | detecta stack/nivel e gera todos os docs (novo ou engenharia reversa) |
| `/lodestar:specify` | 1 · o QUE/PORQUE | requisitos + comportamento na spec / `changes/<feat>/spec.md` |
| `/lodestar:clarify` | 2 · ambiguidades | perguntas que travam decisoes ANTES de planejar |
| `/lodestar:plan` | 3 · o COMO | plano tecnico + ADRs (`architecture.md`) |
| `/lodestar:tasks` | 4 · decomposicao | tarefas verificaveis (`NOW.md`) |
| `/lodestar:analyze` | 5 · GATE | consistencia entre docs + encoding + secrets |
| `/lodestar:implement` | 6 · executa | codigo (solo / agentes / pipeline) |
| `/lodestar:checklist` | 7 · aceite | Definition of Done testavel |
| `/lodestar:archive` | 8 · fecha | merge do delta na spec viva + summary |

**Regra de ouro:** nunca pular `/lodestar:analyze` antes de implementar em N2/N3. Em N1 o analyze e so o validador de encoding.

No dia a dia o usuario so pede ("implementa a feature X") e a skill roteia pela etapa certa, parando pra clarificar quando precisa.

---

## Os 3 niveis (adaptativo)

Detalhe completo em `NIVEIS.md` (na raiz do plugin). Resumo:

| Nivel | Quando | Docs gerados |
|---|---|---|
| **N1 micro** | script, POC, micro-app | `spec.md` + `NOW.md` + `CLAUDE.md` |
| **N2 cresceu** | app real com features | N1 + `PRD_v1.md` + `architecture.md` + `roadmap.md` + `summary.md` + `licoes.md` + `changes/` |
| **N3 sistema serio** | multi-tenant, time, prod | N2 + camada de qualidade via `/lodestar:harden` (constituicao equalizada, rules, CI, validators, deploy) |

Comeca no menor nivel que serve e oferece escalar quando o projeto pede. Nunca impoe overhead.

---

## Engine deterministico

O plugin traz scripts Node (sem deps) pra a parte mecanica:

- `scripts/scaffold.mjs --level N1|N2|N3 --dest <dir>` — instancia os templates do nivel em `<dir>/docs/`.
- `scripts/check-docs.mjs` — valida integridade (encoding + docs consistentes + sem requisito orfao).
- `validators/validate-encoding.cjs <arquivos>` — guardrail anti-mojibake PT-BR.

Os comandos chamam esses scripts pra trabalho deterministico; o modelo cuida do julgamento e da interacao. Caminho no plugin: `${CLAUDE_PLUGIN_ROOT}`.

---

## Como executar o /lodestar:init

1. **Detectar o terreno:** stack (package.json/deno.json/pyproject), git (branch/remote/fork), codebase existente vs vazia, docs ja existentes (nao sobrescrever sem diff), Supabase (RLS/migrations).
2. **Escolher o nivel:** sugerir pelo que detectou (POC->N1, app->N2, multi-tenant/prod->N3) e confirmar via AskUserQuestion.
3. **Novo vs Existente:**
   - Novo -> gera docs a partir do que o usuario descrever.
   - Existente -> LE a codebase e faz engenharia reversa (documenta o real, **nunca inventa feature nem propoe refactor**; marca o que ja esta "Done" e sugere a proxima NOW).
4. **Gerar:** rodar `scaffold.mjs` pro nivel; preencher os docs com o conteudo detectado/descrito.
5. **Fechar:** rodar `check-docs.mjs` (gate). Mostrar o mapa criado. Em N3, oferecer rodar `/lodestar:harden` pra blindar a engenharia (CI/PR/merge/deploy, rules, validators).

---

## Integracoes (reaproveita, nao duplica)

- **Camada de qualidade (`/lodestar:harden`)**: no N3 o lodestar instala a malha de engenharia (constituicao equalizada, rules, CI, PR flow, merge seguro, deploy por stack, validators, hooks) — tudo interno ao plugin.
- **Agentes especializados** (builder-frontend, builder-backend, reviewer): `/lodestar:implement` despacha pra eles quando existirem no projeto; senao usa o pipeline multi-agente.
- **planning**: `/lodestar:tasks` pode invocar a skill `planning` em N2+.

---

## Disciplina git (embutida)

- 1 mudanca de escopo = 1 entrada em `changes/<feature>/` = 1 branch = 1 PR.
- Mudou regra/contrato/schema -> atualiza `spec.md` no mesmo PR.
- Mudou decisao arquitetural -> atualiza `architecture.md` (ADR) no mesmo PR.
- Commits em PT-BR, curtos, sem atribuir a IA. Em FORK, confirmar repo antes de push/PR.
- Ao fechar a feature -> `/lodestar:archive`: o delta e mergeado na `spec.md` viva.

---

## Anti-patterns que a skill evita

- Impor N3 num micro-projeto (comeca no menor nivel que serve).
- Sobrescrever `CLAUDE.md`/docs existentes sem mostrar diff.
- Em projeto existente: inventar feature ou propor refactor (so documenta o real).
- Implementar sem passar pelo gate `analyze` (N2/N3).
- Rodar `/lodestar:harden` num micro-projeto (a camada de qualidade e so pra N3).
- Deixar a spec envelhecer: toda feature fechada e arquivada na spec viva.
