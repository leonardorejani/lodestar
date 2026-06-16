---
description: Valida a feature contra os criterios de aceite (Definition of Done)
argument-hint: '[feature]'
allowed-tools: Read, Glob, Grep, Bash
---

# /lodestar:checklist

Monte e rode o checklist de aceite desta feature, amarrado aos criterios da spec.

Para cada criterio de aceite da spec/feature:
- [ ] Esta implementado?
- [ ] Tem teste cobrindo (quando aplicavel)?
- [ ] Estados de borda/erro/vazio tratados?
- [ ] Permissoes/RLS conferidas?
- [ ] Sem regressao no que ja funcionava?

Tambem:
- [ ] Docs atualizados (`spec`/`architecture`) se algo mudou?
- [ ] Encoding e secrets ok (gate `analyze` passou)?
- [ ] "Would a staff engineer approve this?"

Item nao marcado = nao esta "done". Volta pro `/lodestar:implement`.
