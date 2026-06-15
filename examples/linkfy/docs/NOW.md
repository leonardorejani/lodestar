# NOW — Linkfy

> Uma task por vez. Este e o foco atual da IA.

## Estado atual
- Pronto:
  - Criar link curto + slug unico
  - Redirect 302 + click_event
  - RLS fail-closed por workspace_id
- Em andamento:
  - Limite de plano (free = 50 links)

## Proxima task (apenas 1)
- **Objetivo:** Bloquear criacao de link quando workspace free atingir 50 links.
- **Feature/change:** changes/plan-limits
- **Arquivos provaveis:** supabase/functions/create-link/index.ts, src/hooks/useCreateLink.ts
- **Criterio de pronto (testavel):**
  - [ ] Free plan com 50 links: POST retorna 403 + mensagem clara
  - [ ] Free plan com 49 links: cria normal (chega a 50)
  - [ ] Paid plan: sem limite
  - [ ] UI mostra contador "X/50" e desabilita o botao no limite
- **Notas rapidas:** contar so links com active=true.

## Nao fazer / armadilhas
- Nao mexer no fluxo de redirect.
- Nao adicionar analytics (fora de escopo, ver spec.md secao 10).
