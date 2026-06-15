# Etapa 5 — ANALYZE (GATE antes de implementar)

Gate de qualidade. Nao pule em N2/N3.

```text
Rode o gate de consistencia antes de liberar a implementacao:

1) CONSISTENCIA entre docs:
   - Todo requisito da spec tem ao menos uma task? (sem requisito orfao)
   - Toda task aponta um requisito? (sem task fantasma)
   - spec / architecture / NOW nao se contradizem?
   - O plano respeita as proibicoes da spec?

2) ENCODING (PT-BR): rode o validador nos arquivos de texto alterados:
   node .sdd/validators/validate-encoding.cjs <arquivos alterados>
   (Windows, se node global falhar, use o caminho explicito do node.)

3) SECRETS: grep agressivo nos arquivos staged por:
   pk_live_  sk_live_  sbp_  ghp_  sk-ant-  service_role  e tokens longos.
   Achou? PARA. Nao implementa/commita ate remover.

Saida: relatorio PASS/FAIL por item. Qualquer FAIL critico bloqueia o implement.
```
