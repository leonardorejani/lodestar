# Niveis do SDD Kit (adaptativo)

O kit comeca no menor nivel que serve e escala sob demanda. Voce nunca paga overhead que nao precisa.

---

## N1 — Micro

**Quando:** script, POC, prova de conceito, micro-app de 1-2 telas, automacao.

**Docs:**
- `docs/spec.md` — comportamento + regras + proibicoes (a lei)
- `docs/NOW.md` — 1 task por vez
- `CLAUDE.md` — roteador minimo (aponta pra spec + NOW)

**Fluxo:** `specify -> clarify -> implement`. O `analyze` aqui e so o validador de encoding.

**Sobe pra N2 quando:** aparece a 2a feature, ou voce precisa de roadmap/historico, ou outra pessoa entra no projeto.

---

## N2 — Cresceu

**Quando:** app real com varias features, deploy, usuarios.

**Docs (N1 +):**
- `docs/PRD_v1.md` — produto/escopo (versione por arquivo: v2, v3...)
- `docs/architecture.md` — ADRs, stack, contratos
- `docs/roadmap.md` — milestones/fases
- `docs/summary.md` — historico leve (so milestones fechados)
- `docs/licoes.md` — licoes pos-correcao (anti-repeticao de erro)
- `changes/<feature>/` — delta specs (estilo OpenSpec): so o que muda; arquivado na spec ao fechar

**Fluxo completo:** `specify -> clarify -> plan -> tasks -> analyze -> implement -> checklist -> archive`.

**Gate `analyze` (obrigatorio antes do implement):**
- encoding PT-BR ok (validador)
- spec/architecture/NOW consistentes entre si
- nenhum requisito orfao (todo item do spec tem task; toda task aponta requisito)
- grep de secrets

**Sobe pra N3 quando:** multi-tenant, dados sensiveis, time, CI/CD, ou o custo de um erro em prod ficou alto.

---

## N3 — Sistema serio

**Quando:** multi-tenant, producao com clientes, time, compliance.

**Docs (N2 +):**
- **Constituicao equalizada** — `CLAUDE.md` vira indice com ponteiro pra TODA rule + invariantes criticos no corpo (impossiveis de ignorar). Rule sem ponteiro = rule invisivel.
- **Validators no CI** — encoding + sync do CLAUDE.md + secrets rodando no pipeline.
- **Pipeline 4-agentes** na execucao (Investigar -> Analisar -> Planejar -> Refinar) e/ou agentes especializados do projeto.

**Delegacao:** N3 chama a skill `setup-projeto-qualidade` pra montar a infra de engenharia (git, CI/CD, PR flow, merge seguro com duplo gate, deploy por stack, hooks, CODEOWNERS). O SDD **nao reimplementa** isso.

**Integracao GSD:** projetos grandes podem usar o SDD como porta de entrada (gera `spec.md`/`PRD`) e entregar pro `/gsd:plan-phase --prd` pra execucao multi-fase com waves.

---

## Tabela de decisao rapida

| Pergunta | Sim -> |
|---|---|
| E so um script/POC? | N1 |
| Tem mais de uma feature ou deploy? | N2 |
| E multi-tenant / tem clientes / time? | N3 |
| Vai ter CI/CD, PR flow, deploy automatico? | N3 + `setup-projeto-qualidade` |
| Execucao multi-fase pesada com paralelismo? | N3 + GSD |

Na duvida: comeca em N2. Cobre 80% dos casos sem overhead exagerado.
