---
description: Especifica o comportamento de uma feature (o QUE e o PORQUE), sem decidir implementacao
argument-hint: '<descricao da feature>'
allowed-tools: Read, Glob, Grep, Write, Edit, AskUserQuestion
---

# /lodestar:specify

Feature: `$ARGUMENTS`

Especifique o comportamento desta feature. Foco no **o QUE e o PORQUE**, nunca no COMO.

Produza (em `changes/<feature>/spec.md` se N2+, senao direto em `docs/spec.md`):
- User stories / fluxos esperados (Gherkin-lite: Dado / Quando / Entao)
- Regras de negocio que esta feature introduz
- Regras de dados afetadas (novas entidades/campos, multi-tenant, soft delete)
- Permissoes (quem pode o que)
- Proibicoes / fora de escopo desta feature
- Criterios de aceite testaveis

NAO decida stack, lib ou estrutura de codigo aqui (isso e o `/lodestar:plan`).
Se algo estiver ambiguo, NAO assuma: liste pra `/lodestar:clarify`.
