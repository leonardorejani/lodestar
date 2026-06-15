# <NOME DO SISTEMA> — Instrucoes do projeto (SDD)

> Constituicao do projeto. Sempre carregada pela IA. Aponta pra fonte da verdade.

## Diretiva primaria
Siga os documentos na ordem de prioridade. Em conflito, obedeca o de maior prioridade.

## Fonte da verdade (prioridade)
1. `docs/spec.md` — contratos, regras, restricoes, limites (a lei)
2. `docs/architecture.md` — decisoes arquiteturais, ADRs
3. `docs/NOW.md` — tarefa atual (uma por vez) + DoD
4. `docs/PRD_v1.md` — escopo e intencao do produto
5. `docs/roadmap.md` / `docs/summary.md` — fases e historico

## Modo de operacao (KISS)
- Comece lendo `docs/NOW.md` e confirme objetivo + constraints na `docs/spec.md`.
- Solucoes minimas. A coisa mais simples que satisfaz a spec.
- Em duvida: 1-3 perguntas curtas (clarify); senao, assuma o razoavel e siga.

## Fluxo SDD
`specify -> clarify -> plan -> tasks -> analyze -> implement -> checklist -> archive`
- Mudou regra/contrato/schema -> atualize `docs/spec.md` no mesmo PR.
- Mudou decisao de arquitetura -> atualize `docs/architecture.md` (ADR) no mesmo PR.
- Fechou feature -> `archive`: merge do delta de `changes/<feature>/` na `spec.md` viva.
- Tomou correcao -> registre em `docs/licoes.md`.

## Guardrails
- Sem scope creep alem de PRD/spec/NOW. Falta algo? Sinalize explicitamente.
- Nao inventar feature, nao trocar stack, nao refatorar em massa sem pedido.
- Nunca expor secrets/service_role no frontend.
- Commits em PT-BR, curtos, sem atribuir a IA. Em FORK, confirmar repo antes de push.

<!-- N3: ao escalar, este arquivo vira indice equalizado com ponteiro pra TODAS as
     rules em .claude/rules/ + invariantes criticos no corpo. Rode setup-projeto-qualidade. -->
