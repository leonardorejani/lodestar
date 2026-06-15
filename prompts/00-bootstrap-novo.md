# Bootstrap A — Projeto NOVO

Use uma vez, no inicio. Gera os docs do nivel a partir da visao do produto.

```text
Leia os templates em ~/.claude/skills/sdd-init/templates/ e o nivel escolhido em NIVEIS.md.

Contexto do produto que vou te dar:
<DESCREVA: o que e, pra quem, valor, fluxo principal, stack>

Tarefa:
1) Gerar docs/spec.md travando: stack, entidades, fluxos obrigatorios, regras de negocio,
   regras de dados (timezone/ids/soft delete/multi-tenant), permissoes por role, proibicoes,
   criterios de aceite.
2) [N2+] Gerar docs/PRD_v1.md a partir da visao (escopo entra/nao entra, metrica de sucesso).
3) [N2+] Gerar docs/architecture.md: stack por camada, diagrama, ADRs iniciais, contratos.
4) [N2+] Gerar docs/roadmap.md com 3-7 fases e docs/summary.md vazio.
5) Gerar docs/NOW.md com a 1a task (objetivo + criterio de pronto).
6) Gerar CLAUDE.md (e AGENTS.md em N2+) apontando pra fonte da verdade.
7) Instalar .sdd/validators/validate-encoding.cjs.

Regras:
- Nao inventar feature fora da visao. KISS. Sem arquitetura extra.
- Para cada arquivo, devolva o conteudo completo pronto pra colar.
- Rodar o gate analyze (encoding) ao final.
```
