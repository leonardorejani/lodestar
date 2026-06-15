# Etapa 3 — PLAN (estrategia tecnica + ADRs)

Agora sim o COMO. Spec ja travada e clarificada.

```text
Com a spec da feature travada, produza o plano tecnico.

1) Abordagem tecnica: como implementar dentro da stack travada (sem trocar stack).
2) Arquivos a criar vs modificar (lista).
3) Mudancas de dados: migrations, RLS, novos campos (descreva, nao execute).
4) Contratos: assinaturas de funcao/endpoint, formato de payload, retornos.
5) Riscos e mitigacoes.
6) ADRs: toda decisao arquitetural relevante vira um ADR em docs/architecture.md
   (contexto + decisao + consequencias).

Regras:
- KISS. A coisa mais simples que satisfaz a spec.
- Se o plano exigir mudar regra/contrato -> aponte a atualizacao da spec no mesmo PR.
- Em projeto grande com GSD: pode entregar a spec pro /gsd:plan-phase --prd.
```
