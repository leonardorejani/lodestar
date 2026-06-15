# Bootstrap B — Projeto EXISTENTE

Use uma vez. Le a codebase e faz engenharia reversa dos docs. NAO mexe no codigo.

```text
Leia toda a codebase (estrutura de pastas, configs, migrations, rotas, models, RLS,
componentes, README se existir). Use o agent Explore pra mapear em paralelo se for grande.

Tarefa: preencher os docs do SDD Kit com base no que JA existe.

1) docs/spec.md inferindo do codigo:
   - stack real (linguagens, frameworks, libs)
   - entidades (models/schemas/migrations encontrados)
   - fluxos obrigatorios (rotas/endpoints/handlers)
   - regras de negocio (validacoes, guards, logica)
   - regras de dados (ids, soft delete, timezone, multi-tenant/tenant_id)
   - permissoes por role (middleware/RLS encontrado)
   - proibicoes: o que NAO deve mudar sem decisao
   - criterios de aceite: o que ja funciona como "done"
2) docs/architecture.md: stack por camada (real), diagrama, ADRs inferidos
   (ex: "por que esse banco?", "por que essa estrutura?"), contratos entre servicos.
3) [N2+] docs/PRD_v1.md inferindo: o que o sistema faz, publico provavel,
   features ja implementadas, o que parece fora de escopo.
4) [N2+] docs/summary.md: o que ja esta "Done" (com data aproximada se der).
5) docs/NOW.md: a proxima task mais logica dado o estado atual.
6) CLAUDE.md (+ AGENTS.md em N2+) apontando pra fonte da verdade.

Regras CRITICAS:
- Documentar o que existe. NUNCA inventar feature. NUNCA propor refactor.
- Achou algo problematico? Registra em docs/licoes.md ou roadmap.md, nao muda o codigo.
- Sem evidencia? Deixa o placeholder do template.
- Para cada arquivo, devolva o conteudo completo pronto pra colar.
```
