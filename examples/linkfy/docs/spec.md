# spec.md — Linkfy

> Fonte da verdade VIVA. Descreve o comportamento ATUAL do sistema.
> Se algo nao esta aqui, NAO e requisito. A spec vence qualquer conflito.

## 0) Regras do documento
- Define comportamento e restricoes (nao e tutorial nem historico).
- `NOW.md` e contexto operacional, nao muda requisitos.
- Mudancas chegam via `changes/<feature>/` e sao arquivadas aqui ao fechar.

## 1) Stack travada
- Frontend: React 18 + Vite + TypeScript + Tailwind + shadcn/ui
- Backend/API: Supabase Edge Functions (Deno)
- Database: Postgres (Supabase) + RLS
- Auth: Supabase Auth (email/senha + magic link)
- Deploy: Vercel (front) + Supabase (back)
- Regra: sem trocar stack sem ADR.

## 2) Principios de implementacao (KISS)
- Implementar o minimo que atenda os criterios de aceite.
- Sem DDD/CQRS/microservices no MVP.

## 3) Glossario
- Workspace: o tenant. Todo link pertence a um workspace.
- Slug: o codigo curto do link (ex: `lk.fy/abc123`).

## 4) Entidades principais
- workspace: id, owner_id, name, plan, created_at
- link: id, workspace_id, slug (unico), target_url, clicks, active, created_at
- click_event: id, link_id, ts, referrer, country

## 5) Fluxos obrigatorios (Gherkin-lite)
### Fluxo: criar link curto
- Dado que estou logado e tenho um workspace
- Quando informo uma target_url valida
- Entao o sistema gera um slug unico e salva o link no meu workspace
- E retorna a URL curta `lk.fy/<slug>`

### Fluxo: redirecionar
- Dado que existe um link ativo com slug X
- Quando alguem acessa `lk.fy/X`
- Entao redireciona (302) pra target_url
- E registra um click_event

## 6) Regras de negocio (nao negociaveis)
- Slug e unico globalmente (nao por workspace).
- Link inativo retorna 404, nao redireciona.
- Free plan: max 50 links por workspace.

## 7) Regras de dados / persistencia
- IDs: uuid
- Soft delete: sim (campo `active=false`), nunca DELETE fisico de link com clicks.
- Timezone: armazenar UTC; exibir America/Sao_Paulo.
- Multi-tenant: chave canonica = `workspace_id`.

## 8) Seguranca e permissoes
- Auth obrigatorio pra tudo, exceto o endpoint de redirect (publico).
- Permissoes por role:
  - owner: cria/edita/apaga links do seu workspace
  - member: cria/edita links, nao apaga
- RLS: fail-closed por `workspace_id`. Redirect usa Edge Function com service_role (server-side).
- Segredos: service_role NUNCA no client.

## 9) Requisitos nao-funcionais
- Redirect < 100ms (p95).
- Acoes destrutivas (apagar link) pedem confirmacao.

## 10) Proibicoes (anti-"IA viajou")
- Proibido feature de analytics avancado no MVP (so contagem de clicks).
- Proibido trocar stack.
- Proibido alterar schema/regra sem atualizar este spec.md.
- Proibido expor service_role no frontend.

## 11) Criterios de aceite (estado atual)
- [x] Criar link curto com slug unico
- [x] Redirect 302 + registro de click
- [x] RLS fail-closed por workspace
- [ ] Limite de 50 links no free plan
