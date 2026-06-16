---
description: Resolve ambiguidades da spec com perguntas objetivas ANTES de planejar
argument-hint: '[feature]'
allowed-tools: Read, Glob, Grep, Edit, AskUserQuestion
---

# /lodestar:clarify

Releia a spec da feature (`changes/<feature>/spec.md` ou `docs/spec.md`).

Liste as ambiguidades, lacunas e decisoes em aberto que impedem um plano seguro.
Para cada uma, faca uma pergunta curta e objetiva (use AskUserQuestion, com 2-4
opcoes e uma recomendada).

Cubra pelo menos: regras de borda, estados vazios/erro, permissoes nao ditas, o
que acontece em falha, limites (paginacao, tamanho, rate) e dados (timezone, ids).

Maximo 3-5 perguntas — so o que realmente trava o plano. Apos as respostas,
atualize a spec da feature com as decisoes (viram "locked decision"). NAO comece a
planejar enquanto houver ambiguidade critica aberta.
