# Etapa 8 — ARCHIVE (a spec viva cresce)

Fecha a feature. O delta vira parte da fonte da verdade.

```text
A feature <nome> esta concluida e aceita. Arquive:

1) MERGE do delta: leve as decisoes/regras de changes/<feature>/spec.md
   pra docs/spec.md (a fonte da verdade viva). Remova duplicacao; a spec
   reflete o comportamento ATUAL completo do sistema.
2) Mova changes/<feature>/ pra changes/_archive/<feature>/ (ou apague se
   tudo ja esta na spec).
3) Atualize docs/summary.md: milestone/feature em Done com data + 1 linha.
4) Atualize docs/roadmap.md: marque a fase, traga a proxima pra "em andamento".
5) Limpe docs/NOW.md pra a proxima task.
6) Se houve correcao/aprendizado no caminho: registre em docs/licoes.md.

Resultado: a spec nunca envelhece — toda feature fechada esta refletida nela.
```
