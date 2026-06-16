---
description: GATE de qualidade antes de implementar — consistencia entre docs, encoding e secrets
argument-hint: '[feature]'
allowed-tools: Read, Glob, Grep, Bash
---

# /lodestar:analyze

Gate de qualidade. Nao pule em N2/N3.

1. **CONSISTENCIA entre docs:**
   - Todo requisito da spec tem ao menos uma task? (sem requisito orfao)
   - Toda task aponta um requisito? (sem task fantasma)
   - `spec` / `architecture` / `NOW` nao se contradizem?
   - O plano respeita as proibicoes da spec?

2. **ENCODING (PT-BR) + integridade:**
   ```bash
   node "${CLAUDE_PLUGIN_ROOT}/scripts/check-docs.mjs" .
   ```
   (roda o validador de encoding nos docs e checa a estrutura).

3. **SECRETS:** grep agressivo nos arquivos staged por `pk_live_`, `sk_live_`,
   `sbp_`, `ghp_`, `sk-ant-`, `service_role` e tokens longos. Achou? PARA — nao
   implementa/commita ate remover.

Saida: relatorio PASS/FAIL por item. Qualquer FAIL critico bloqueia o
`/lodestar:implement`.
