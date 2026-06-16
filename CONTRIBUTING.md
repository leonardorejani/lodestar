# Contribuindo com o lodestar

Valeu pelo interesse! O lodestar segue o espirito **KISS**: o minimo que mantem a
IA no trilho. Mantenha as contribuicoes nesse espirito.

## Como contribuir

1. Abra uma issue descrevendo a ideia/bug antes de um PR grande.
2. Fork + branch a partir da `main` (`feat/...`, `fix/...`, `docs/...`).
3. Faca mudancas pequenas e focadas (uma coisa por PR).
4. Rode os checks locais antes de abrir o PR (abaixo).
5. Abra o PR preenchendo o template.

## Checks locais

```bash
# integridade dos docs/templates + encoding
node scripts/check-docs.mjs .

# encoding PT-BR (anti-mojibake) em arquivos que voce mexeu
node validators/validate-encoding.cjs <arquivos.md>
```

O CI roda os mesmos checks. PR com encoding quebrado ou estrutura invalida nao passa.

## Padroes

- **PT-BR** com acentuacao correta. Nunca converta pra ASCII "por seguranca".
- **Commits** curtos, em portugues, sem atribuir a IA.
- **Templates/prompts**: mudanca de comportamento exige atualizar o `CHANGELOG.md`.
- **Escopo**: o lodestar faz SDD (spec/plano/execucao) E a camada de qualidade
  no N3 (CI/PR/merge/deploy via `/lodestar:harden`). Tudo num produto so.

## O que evitamos

- Inflar o kit com features que ninguem pediu.
- Acoplar a uma stack so (os templates sao temperados, mas o fluxo e generico).
- Inflar a camada de qualidade (N3) alem do necessario.

Obrigado por manter o lodestar simples e util. 🤙
