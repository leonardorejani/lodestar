---
description: Decompoe o plano em tarefas pequenas, ordenadas e verificaveis
argument-hint: '[feature]'
allowed-tools: Read, Glob, Grep, Write, Edit
---

# /lodestar:tasks

Com o plano pronto, decomponha em tarefas.

Regras de decomposicao:
- Cada tarefa < 30 min, com criterio claro de "feito".
- Ordenar por dependencia. Marcar quais podem rodar em paralelo.
- Cada tarefa aponta o(s) requisito(s) da spec que atende (rastreabilidade).
- Fase final sempre inclui: testes + review + checklist de aceite.

Saida:
- N1: escreva direto em `docs/NOW.md` (objetivo + criterios de pronto).
- N2+: pode usar a skill `planning` e salvar em `tasks/todo.md`, mantendo
  `NOW.md` com a task ativa do momento.

Nao comece a implementar aqui. So decomponha.
