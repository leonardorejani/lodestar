# spec.md — <NOME DO SISTEMA>

> Fonte da verdade VIVA. Descreve o comportamento ATUAL do sistema.
> Se algo nao esta aqui, NAO e requisito. A spec vence qualquer conflito.
> Toda mudanca de regra/contrato atualiza este arquivo no mesmo PR.

## 0) Regras do documento
- Define comportamento e restricoes (nao e tutorial nem historico).
- `NOW.md` e contexto operacional, nao muda requisitos.
- `summary.md` registra milestones (historico leve).
- Mudancas chegam via `changes/<feature>/` e sao arquivadas aqui ao fechar.

## 1) Stack travada
- Frontend: <ex: React 18 + Vite + TypeScript + Tailwind + shadcn/ui>
- Backend/API: <ex: Supabase Edge Functions (Deno)>
- Database: <ex: Postgres (Supabase) + RLS>
- Auth: <ex: Supabase Auth>
- Deploy: <ex: Vercel (front) + Supabase (back)>
- Regra: sem trocar stack sem decisao explicita (ADR).

## 2) Principios de implementacao (KISS)
- Implementar o minimo que atenda os criterios de aceite.
- Codigo simples e legivel > abstracoes espertas.
- Sem DDD/CQRS/microservices no MVP.
- Refatorar so quando houver dor real (bug, complexidade, repeticao critica).

## 3) Glossario (opcional)
- <termo>: <definicao curta>

## 4) Entidades principais (conceito, nao schema completo)
- <Entidade A>: campos essenciais (id, owner_id, status, created_at)
- <Entidade B>: ...

## 5) Fluxos obrigatorios (Gherkin-lite)
### Fluxo: <nome>
- Dado que <pre-condicao>
- Quando <acao>
- Entao <resultado>
- E <regras adicionais>

## 6) Regras de negocio (nao negociaveis)
- Regra 1: <...>
- Regra 2: <...>

## 7) Regras de dados / persistencia
- IDs: <uuid | bigint | ...>
- Soft delete: <sim/nao> + como
- Timezone: <ex: America/Sao_Paulo; armazenar UTC>
- Datas: definicao de "hoje", "mes", "periodo"
- Multi-tenant (se aplicavel): chave canonica = <ex: tenant_id>
- Auditoria/historico (se existir): <...>

## 8) Seguranca e permissoes
- Auth obrigatorio: <...>
- Permissoes por role:
  - <role 1>: pode <...> / nao pode <...>
  - <role 2>: pode <...> / nao pode <...>
- RLS (Supabase): <sim/nao> + politica geral (ex: fail-closed por tenant_id)
- Segredos: nunca no client; service_role so em Edge Functions.

## 9) Requisitos nao-funcionais (so os que importam)
- Performance: <limite simples>
- UX: <ex: acoes criticas pedem confirmacao>
- Confiabilidade: <ex: operacoes idempotentes>

## 10) Proibicoes (anti-"IA viajou")
- Proibido adicionar features fora do escopo definido.
- Proibido trocar stack.
- Proibido criar/alterar schema sem atualizar este spec.md.
- Proibido alterar regra de negocio sem atualizar este spec.md.
- Proibido refatorar em massa sem pedido explicito.
- Proibido expor service_role/secrets no frontend.

## 11) Criterios de aceite (checklist do estado atual)
- [ ] <criterio 1 testavel>
- [ ] <criterio 2 testavel>
