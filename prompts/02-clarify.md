# Etapa 2 — CLARIFY (resolver ambiguidades ANTES de planejar)

O ponto mais valioso do Spec Kit. Evita "IA viajou".

```text
Releia a spec da feature (changes/<feature>/spec.md ou docs/spec.md).

Liste as ambiguidades, lacunas e decisoes em aberto que impedem um plano seguro.
Para cada uma, faca uma pergunta curta e objetiva (use AskUserQuestion se possivel,
com 2-4 opcoes e uma recomendada).

Cubra pelo menos: regras de borda, estados vazios/erro, permissoes nao ditas,
o que acontece em falha, limites (paginacao, tamanho, rate), e dados (timezone, ids).

Maximo 3-5 perguntas — so o que realmente trava o plano.
Apos as respostas: atualize a spec da feature com as decisoes (vira "locked decision").
NAO comece a planejar enquanto houver ambiguidade critica aberta.
```
