# Etapa 1 — SPECIFY (o QUE e o PORQUE)

Define o comportamento de uma feature. Foco em requisitos, NAO em implementacao.

```text
Feature: <nome>

Especifique o comportamento desta feature. Foco no QUE e PORQUE, nunca no COMO.

Produza (em changes/<feature>/spec.md se N2+, senao direto em docs/spec.md):
- User stories / fluxos esperados (Gherkin-lite: Dado/Quando/Entao)
- Regras de negocio que esta feature introduz
- Regras de dados afetadas (novas entidades/campos, multi-tenant, soft delete)
- Permissoes (quem pode o que)
- Proibicoes / fora de escopo desta feature
- Criterios de aceite testaveis

NAO decida stack, lib, ou estrutura de codigo aqui (isso e o /plan).
Se algo estiver ambiguo, NAO assuma: liste pra etapa clarify.
```
