# AGENTS.md — Roteador do projeto

> Coringa pra qualquer agente executor (Codex, Cursor, Gemini, MiniMax, etc.).
> Aponta pra fonte da verdade oficial.

## Fonte da verdade (prioridade)
1. `docs/spec.md` — contratos, regras, restricoes, limites
2. `docs/architecture.md` — decisoes arquiteturais, ADRs
3. `docs/NOW.md` — tarefa atual (uma por vez) + DoD
4. `docs/PRD_v1.md` — escopo do produto
5. `docs/summary.md` — historico de milestones

## Regras de aplicacao
- Antes de implementar: leia `docs/NOW.md` e confirme constraints em `docs/spec.md`.
- Conflito entre documentos -> siga `docs/spec.md`.
- Sem escopo fora de PRD/spec/NOW sem sinalizar.
- Mudou contrato/regra/limite -> atualize `docs/spec.md` no mesmo PR.
- Mudou decisao arquitetural -> atualize `docs/architecture.md` no mesmo PR.

## Divisao planejador/executor (opcional, reduz custo)
- Planejamento e revisao: modelo forte (Claude Opus/Sonnet).
- Execucao de codigo: modelo mais barato (Codex/MiniMax/Qwen).
- O planejador produz spec/plano/tasks; o executor implementa contra eles.

## Encoding (PT-BR)
- Escreva em PT-BR com acentuacao correta. Nunca converta pra ASCII "por seguranca".
- Salve em UTF-8. Valide textos alterados com `.sdd/validators/validate-encoding.cjs`.
