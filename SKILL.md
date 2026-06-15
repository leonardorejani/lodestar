---
name: sdd-init
description: "Inicializa e conduz Spec-Driven Development (SDD) em qualquer projeto. Invocada quando o usuario roda /sdd-init, ou pede 'iniciar SDD', 'aplicar spec-driven', 'criar specs do projeto', 'documentar projeto pra IA', 'spec como fonte da verdade', menciona 'sdd-init', 'spec kit', 'spec-driven', 'specify/plan/tasks/implement' — mesmo que so descreva querer estruturar um projeto pra codar com IA sem perder o controle. Gera docs vivos (spec/PRD/architecture/NOW), conduz o fluxo specify->clarify->plan->tasks->analyze->implement->archive em 3 niveis adaptativos (micro->sistema), e em projeto existente faz engenharia reversa dos docs a partir da codebase. NAO use pra montar infra de CI/PR/deploy (delega pra setup-projeto-qualidade) nem pra plano pontual de uma unica task (use planning)."
---

# SDD Init — Spec-Driven Development Kit

Kit proprio de Spec-Driven Development. Combina o melhor de tres mundos:

- **Governance** (GitHub Spec Kit): constituicao + fluxo `specify -> clarify -> plan -> tasks -> analyze -> implement`.
- **Continuity** (OpenSpec): `spec.md` como fonte da verdade VIVA + `changes/` com delta specs que sao arquivados na spec ao fechar (a spec cresce com o projeto, nao envelhece).
- **Execution** (arsenal local): pipeline 4-agentes, agentes especializados, GSD, validators portaveis.

Tudo em PT-BR, adaptado a stack TS/React/Vite/Supabase, **adaptativo em 3 niveis**.

---

## Conceito central

**A spec e a lei. O codigo e consequencia.**

1. Voce especifica o comportamento (`docs/spec.md`).
2. A IA implementa contra a spec, nunca contra a propria imaginacao.
3. Toda mudanca de regra/contrato atualiza a spec **no mesmo PR**.
4. Conflito entre documento e pedido -> a spec vence (ou voce muda a spec explicitamente).

---

## Os 3 niveis (adaptativo)

Detalhe completo em `NIVEIS.md`. Resumo:

| Nivel | Quando | Docs gerados |
|---|---|---|
| **N1 micro** | script, POC, micro-app | `spec.md` + `NOW.md` + `CLAUDE.md` |
| **N2 cresceu** | app real com features | N1 + `PRD_v1.md` + `architecture.md` + `roadmap.md` + `summary.md` + `licoes.md` + `changes/` |
| **N3 sistema serio** | multi-tenant, time, prod | N2 + constituicao equalizada + validators no CI + pipeline 4-agentes + delega `setup-projeto-qualidade` |

O `/sdd-init` **comeca no menor nivel que serve** e oferece escalar quando o projeto pede. Nunca impoe overhead.

---

## O fluxo SDD (8 etapas)

Cada etapa tem um prompt copy-paste em `prompts/`. Em uso normal o usuario so pede ("implementa X") e a skill roteia pela etapa certa.

| # | Etapa | Prompt | Produz |
|---|---|---|---|
| 0 | **bootstrap** | `00-bootstrap-novo.md` / `00-bootstrap-existente.md` | todos os docs do nivel |
| 1 | **specify** | `01-specify.md` | requisitos + comportamento (o QUE e PORQUE) na `spec.md` / `changes/<feat>/spec.md` |
| 2 | **clarify** | `02-clarify.md` | perguntas que resolvem ambiguidades ANTES de planejar |
| 3 | **plan** | `03-plan.md` | plano tecnico + ADRs (`architecture.md`) |
| 4 | **tasks** | `04-tasks.md` | decomposicao verificavel (`NOW.md` / `tasks/todo.md`) |
| 5 | **analyze** | `05-analyze.md` | GATE: consistencia entre docs + encoding + secrets |
| 6 | **implement** | `06-implement.md` | codigo (solo, 4-agentes, ou agentes especializados) |
| 7 | **checklist** | `07-checklist.md` | Definition of Done testavel amarrada aos requisitos |
| 8 | **archive** | `08-archive.md` | merge do delta na `spec.md` viva + `summary.md` |

**Regra de ouro:** nunca pular a etapa 5 (analyze) antes de implementar em N2/N3. Em N1 o analyze e so o validador de encoding.

---

## Como executar o /sdd-init

Quando o usuario roda `/sdd-init` (ou pede pra iniciar SDD), siga:

### Passo 1 — Detectar o terreno
```
1. Stack: package.json (Node/TS/Vite/Next) | deno.json (Deno/Supabase fn) | pyproject (Python) | etc.
2. Git: tem .git? branch? remote? E fork? (se fork, confirmar repo antes de qualquer op remota)
3. Codigo: ja existe codebase ou pasta vazia? (define novo vs existente)
4. Docs: ja existe docs/spec.md, CLAUDE.md, .specify/, openspec/? (nao sobrescrever sem diff)
5. Stack Supabase? (migrations/, supabase/, RLS) -> ativa secoes especificas nos templates
```
Reportar em tabela curta e pedir confirmacao do que pode mexer.

### Passo 2 — Escolher o nivel
Sugerir o nivel pela deteccao (POC -> N1, app -> N2, multi-tenant/prod -> N3) e confirmar com o usuario via AskUserQuestion. Pode comecar N1 e escalar depois.

### Passo 3 — Novo vs Existente
- **Pasta vazia / projeto novo** -> usar `prompts/00-bootstrap-novo.md`: gera os docs a partir do que o usuario descrever. Unico input manual: visao do produto (PRD em N2+).
- **Codebase existente** -> usar `prompts/00-bootstrap-existente.md`: LER a codebase (rotas, models, migrations, RLS, componentes) e fazer engenharia reversa dos docs. **Documentar o que existe, nunca inventar feature nem propor refactor.** Marcar o que ja esta "Done" e sugerir a proxima `NOW`.

### Passo 4 — Gerar os arquivos
Copiar os `templates/` do nivel escolhido pra dentro de `docs/` do projeto, preenchendo com o conteudo detectado/descrito. Em N1, so `spec.md` + `NOW.md` + `CLAUDE.md` na raiz. Instalar `validators/validate-encoding.cjs` em `.sdd/` do projeto.

### Passo 5 — Fechar o setup
- Rodar o gate `analyze` (encoding + consistencia) uma vez.
- Mostrar ao usuario o mapa do que foi criado + como continuar (apontar pro `GUIA.md`).
- Em N3, oferecer: *"quer blindar a engenharia (CI/PR/merge/deploy)? rodo o `setup-projeto-qualidade` agora"*.

---

## Integracoes (reaproveita o arsenal, nao duplica)

- **`setup-projeto-qualidade`**: o SDD cuida de spec/plano/execucao; o setup-qualidade cuida da malha de engenharia (git, CI, PR flow, merge seguro, deploy, validators no CI). N3 **delega** pra ele, nao reescreve. Sao complementares.
- **Agentes especializados** (`builder-frontend`, `builder-backend`, `reviewer`, `code-reviewer`, `security-checker`): a etapa `implement` despacha pra eles quando existirem no projeto. Caso contrario, usa o pipeline 4-agentes do `docs/workflow.md`.
- **GSD**: se o projeto for grande e ja usar GSD, o SDD pode gerar a `spec.md`/`PRD` e entregar pro `/gsd:plan-phase --prd`. O SDD e a porta de entrada leve; o GSD e a execucao pesada.
- **`planning`**: a etapa `tasks` pode invocar a skill `planning` pra decompor em N2+.
- **`tasks/lessons.md`**: a etapa `archive` cataloga licoes (alinhado as regras do usuario).

---

## Disciplina git (embutida)

- 1 mudanca de escopo = 1 entrada em `changes/<feature>/` = 1 branch = 1 PR.
- Mudou regra/contrato/schema -> atualiza `spec.md` **no mesmo PR**.
- Mudou decisao arquitetural -> atualiza `architecture.md` (ADR) **no mesmo PR**.
- Commits em PT-BR, curtos, sem atribuir a IA. Em FORK, confirmar repo antes de push/PR.
- Ao fechar a feature -> `archive`: o delta de `changes/<feature>/spec.md` e mergeado na `docs/spec.md` viva.

---

## Anti-patterns que a skill evita

- Impor N3 num micro-projeto (comeca no menor nivel que serve).
- Sobrescrever `CLAUDE.md`/docs existentes sem mostrar diff.
- Em projeto existente: inventar feature ou propor refactor (so documenta o real).
- Implementar sem passar pelo gate `analyze` (N2/N3).
- Duplicar o que `setup-projeto-qualidade` ja faz.
- Deixar a spec envelhecer: toda feature fechada e arquivada na spec viva.

---

## Como o LLM usa esta skill

1. Le este `SKILL.md` + `NIVEIS.md` por completo.
2. Lista `templates/` e `prompts/` pra saber o disponivel.
3. Executa o `/sdd-init` (Passos 1-5 acima) — deteccao, nivel, novo/existente, geracao, gate.
4. Em uso continuo, roteia o pedido do usuario pela etapa certa do fluxo (specify/clarify/plan/tasks/analyze/implement/checklist/archive) usando os `prompts/`.
5. Aponta pro `GUIA.md` pra qualquer duvida de aplicacao pratica.
