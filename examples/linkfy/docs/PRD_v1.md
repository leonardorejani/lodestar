# PRD — Linkfy (v1)

> Decisao de produto. Versione por arquivo (PRD_v2.md...). Nunca sobrescreva.

## 1. Visao geral
Encurtador de links multi-tenant pra times pequenos: cria links curtos,
redireciona rapido e conta cliques. Sem complexidade de analytics enterprise.

## 2. Problema / oportunidade
- Dor atual: encurtadores gratis nao tem workspace/time nem controle.
- Impacto: times perdem links em contas pessoais.
- Por que agora: stack serverless deixa o custo proximo de zero no MVP.

## 3. Publico-alvo
- Quem usa: times de marketing pequenos (2-5 pessoas).
- Contexto: criar e compartilhar links rastreaveis no dia a dia.

## 4. Objetivos do MVP (ate 3)
- Criar links curtos com slug unico.
- Redirect rapido e confiavel + contagem de cliques.
- Workspaces com papeis (owner/member).

## 5. Escopo funcional
### 5.1 Principais (MVP)
- [x] Criar/listar/desativar links
- [x] Redirect + contagem
- [ ] Limite por plano

### 5.2 Secundarias
- Dominio customizado

### 5.3 Fora de escopo (trava anti-IA)
- Nao fazer: analytics avancado (heatmap, funil)
- Nao fazer: API publica no MVP

## 6. Requisitos que travam decisoes
### 6.1 Nao negociaveis
- RLS fail-closed por workspace.
- Redirect publico nao exige auth.

### 6.2 Nao-funcionais (max 3)
- Seguranca: RLS obrigatorio, service_role so server-side.
- Performance: redirect < 100ms p95.
- UX: acoes destrutivas pedem confirmacao.

## 7. Fluxo principal
1. Usuario loga e entra/cria workspace.
2. Cola a URL longa.
3. Recebe `lk.fy/<slug>`.
4. Compartilha; cada acesso conta um clique.

## 8. Metrica de sucesso
Primeiro workspace com 10+ links ativos e 100+ cliques na semana.

## 9. Riscos e dependencias
- Risco: colisao de slug / Mitigacao: unique constraint + retry.
- Dependencia: Supabase Auth + Edge Functions.
