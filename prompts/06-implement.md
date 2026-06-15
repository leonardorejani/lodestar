# Etapa 6 — IMPLEMENT (executa contra a spec)

So depois do gate analyze passar.

```text
Implemente APENAS o que esta em docs/NOW.md, contra a spec travada.

Como executar (escolha pelo tamanho):
- Tarefa simples: implementa direto, mudancas pequenas e reversiveis (KISS).
- Feature media: despacha pros agentes do projeto se existirem
  (builder-frontend, builder-backend, reviewer) — um por frente, em paralelo.
- Feature complexa: usa o pipeline 4-agentes (Investigar -> Analisar -> Planejar -> Refinar)
  do docs/workflow.md, ou entrega pro /gsd:execute-phase se o projeto usa GSD.

Durante:
- Trata erros e estados vazios. Valida inputs criticos. Logs basicos onde precisa.
- Mudou regra/contrato/schema -> atualiza docs/spec.md no mesmo PR.
- Mudou decisao arquitetural -> atualiza docs/architecture.md (ADR) no mesmo PR.
- Nao inventa feature. Nao refatora em massa sem pedido.

Disciplina git: 1 feature = 1 branch = 1 PR. Commit PT-BR, curto, sem atribuir a IA.
Em FORK: confirma o repo antes de qualquer push/PR.
```
