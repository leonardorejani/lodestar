# architecture.md — <NOME DO SISTEMA>

> Decisoes arquiteturais tomadas (nao hipoteses). spec.md vence em conflito.
> Mudanca de arquitetura = atualizar este doc (ADR) + sinalizar no PR.

## 1) Visao geral (1 paragrafo)
<O que o sistema faz em alto nivel e como as partes se conectam>

## 2) Diagrama de componentes
```
<ASCII ou Mermaid>

Exemplo:
graph TD
  Client[React/Vite] --> Edge[Supabase Edge Functions]
  Client --> Auth[Supabase Auth]
  Edge --> DB[(Postgres + RLS)]
  Edge --> Ext[APIs externas]
```

## 3) Stack e responsabilidades
| Camada | Tecnologia | Responsabilidade |
|---|---|---|
| Frontend | <React+Vite+TS> | <UI, estado, chamadas> |
| API/Backend | <Edge Functions/Deno> | <regras server-side, integracoes> |
| Banco | <Postgres/Supabase> | <persistencia, RLS> |
| Auth | <Supabase Auth> | <sessao, roles> |
| Deploy | <Vercel/Supabase> | <build, hosting> |

## 4) Decisoes arquiteturais (ADRs)
### ADR-001: <titulo>
- **Contexto:** <por que foi necessario>
- **Decisao:** <o que foi decidido>
- **Consequencias:** <trade-offs aceitos>

### ADR-002: <titulo>
- **Contexto:**
- **Decisao:**
- **Consequencias:**

## 5) Contratos entre servicos (se aplicavel)
- <Servico A> -> <Servico B>: <protocolo, formato, garantias>

## 6) Fluxo de dados critico
<Caminho dos dados nas operacoes sensiveis: auth, pagamento, multi-tenant>
1. ...

## 7) Seguranca arquitetural
- Boundary de auth: <onde>
- Multi-tenant: <como o isolamento e garantido — RLS por tenant_id, fail-closed>
- Dados sensiveis (repouso/transito): <...>
- Segredos: <env vars, vault; service_role so server-side>

## 8) Escalabilidade e limites conhecidos
- Gargalo atual: <...>
- Limite aceito no MVP: <...>
- O que quebra primeiro ao escalar: <...>

## 9) Fora de escopo arquitetural
- <ex: sem cache distribuido no MVP>
- <ex: sem multi-region>
