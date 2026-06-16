# Changelog

Todas as mudancas relevantes deste projeto sao documentadas aqui.

Formato baseado em [Keep a Changelog](https://keepachangelog.com/pt-BR/1.1.0/),
versionamento segue [SemVer](https://semver.org/lang/pt-BR/).

## [1.0.0] — 2026-06-16

Primeiro release como **plugin** do Claude Code.

### Added

- **Plugin instalavel.** `/plugin marketplace add leonardorejani/lodestar` +
  `/plugin install lodestar`. Manifests em `.claude-plugin/`.
- **9 comandos namespaced** (`/lodestar:*`): `init`, `specify`, `clarify`,
  `plan`, `tasks`, `analyze`, `implement`, `checklist`, `archive` — o fluxo SDD
  completo.
- **Skill `lodestar`** como cerebro/metodologia que roteia os pedidos pela etapa
  certa do fluxo.
- **Engine deterministico** (Node, zero deps):
  - `scripts/scaffold.mjs` — instancia os templates do nivel (N1/N2/N3) num projeto.
  - `scripts/check-docs.mjs` — gate de integridade (nucleo SDD + encoding + placeholders).
  - `validators/validate-encoding.cjs` — guardrail anti-mojibake PT-BR.
- **3 niveis adaptativos** (N1 micro -> N2 app -> N3 sistema) documentados em `NIVEIS.md`.
- **Combo oficial com keepwright**: o N3 delega a infra de engenharia
  (CI/PR/merge/deploy) pro [keepwright](https://github.com/leonardocandiani/keepwright).
- **Templates temperados** pra TS/React/Vite/Supabase (RLS, Edge Functions, multi-tenant).
- **Exemplo real** `examples/linkfy/` — encurtador multi-tenant com docs preenchidos.
- **CI** (`.github/workflows/ci.yml`): valida estrutura do plugin, encoding e secrets.
- **Governanca OSS**: CONTRIBUTING, CODE_OF_CONDUCT, AUTHORS, issue/PR templates.

### Origem

- Governance + `clarify`/`analyze` inspirados no [GitHub Spec Kit](https://github.com/github/spec-kit).
- Spec viva + `changes/`/`archive` inspirados no [OpenSpec](https://github.com/Fission-AI/OpenSpec).
- Empacotamento de plugin + estrutura OSS inspirados no [keepwright](https://github.com/leonardocandiani/keepwright).

[1.0.0]: https://github.com/leonardorejani/lodestar/releases/tag/v1.0.0
