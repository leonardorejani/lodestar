# GUIA — Como aplicar o SDD Kit na pratica

Tutorial direto. Do zero ao primeiro ciclo completo.

---

## Instalacao (uma vez)

Nada a instalar. A skill ja vive em `~/.claude/skills/sdd-init/`. Em qualquer projeto:

```
/sdd-init
```

O comando detecta a stack, pergunta o nivel, e gera os docs. Fim.

---

## Caso A — Projeto NOVO (do zero)

1. Cria a pasta do projeto e abre o Claude nela.
2. Roda `/sdd-init`.
3. Responde: nivel sugerido (ex: N2) e descreve a visao do produto (10 min).
4. O comando gera `docs/` + `CLAUDE.md`. O unico arquivo que voce preenche de cabeca e o `PRD_v1.md` (em N2+).
5. Comeca o ciclo:

```
# 1. especifica a primeira feature
"specify: cadastro de usuario com login por email"

# 2. a IA te faz 2-4 perguntas pra travar ambiguidades (clarify)
#    responde rapido

# 3. plano tecnico + ADRs
"plan"

# 4. decompoe em tasks verificaveis -> NOW.md
"tasks"

# 5. GATE: consistencia + encoding + secrets
"analyze"

# 6. implementa (solo / 4-agentes / agentes do projeto)
"implement"

# 7. checklist de aceite (Definition of Done)
"checklist"

# 8. fecha: arquiva o delta na spec viva + atualiza summary
"archive"
```

Na pratica voce nem decora isso: pede *"implementa o cadastro de usuario"* e a skill roteia pelas etapas, parando pra clarificar quando precisa.

---

## Caso B — Projeto EXISTENTE (app em andamento)

O kit funciona com app quase-pronto. Ele NAO mexe no codigo — so cria a camada de specs por cima.

1. Abre o Claude na raiz do app.
2. Roda `/sdd-init`.
3. Escolhe "projeto existente". A skill LE a codebase (rotas, models, migrations, RLS, componentes) e faz **engenharia reversa**:
   - `spec.md` = o comportamento que o codigo JA tem
   - `architecture.md` = a stack/arquitetura real + ADRs inferidos
   - `summary.md` = o que ja esta "Done"
   - `NOW.md` = sugestao da proxima task logica
4. Voce revisa os docs (a IA documenta o real, nao inventa). Ajusta o que estiver impreciso.
5. A partir dai, **toda nova feature passa pelo fluxo SDD** — e a spec deixa de envelhecer.

> Importante: em projeto existente a regra e "documentar o que existe, nunca propor refactor nem inventar feature". Se algo estiver feio no codigo, isso vira uma entrada em `licoes.md` ou `roadmap.md`, nao uma mudanca silenciosa.

---

## O dia a dia (loop vibecoding)

**Regra mae: uma task por vez no `NOW.md`.**

1. Atualiza `NOW.md`: objetivo (1 frase) + criterio de pronto (3-7 bullets) + "nao fazer".
2. Pede pra IA implementar **apenas** o NOW.
3. Mudou regra/contrato/schema? Atualiza `spec.md` no mesmo PR.
4. Mudou decisao de arquitetura? Atualiza `architecture.md` (ADR) no mesmo PR.
5. Fechou a feature? Roda `archive` — o delta vai pra spec viva.
6. Tomou bronca/corrigiu algo? Registra em `licoes.md`.

---

## Como manter a IA no trilho (dica de ouro)

De vez em quando pergunta ao agente:
- *"de onde voce tirou essa decisao?"* (ele deve citar `docs/spec.md`, `architecture.md`, etc.)
- *"isso esta no escopo do NOW?"*

Se ele nao souber citar a fonte nos docs, ou esta inventando, ou a spec esta incompleta. Os dois se resolvem voltando pra spec.

---

## Quando escalar de nivel

Veja `NIVEIS.md`. Resumo: comeca pequeno, sobe quando doer.
- 2a feature/deploy -> N2
- multi-tenant/clientes/time -> N3
- CI/PR/deploy automatico -> N3 + `setup-projeto-qualidade` (o /sdd-init te oferece isso)
- execucao pesada multi-fase -> N3 + GSD

---

## Mapa mental dos arquivos

| Arquivo | Pergunta que responde | Quando muda |
|---|---|---|
| `spec.md` | "o que o sistema FAZ e o que e PROIBIDO?" | toda mudanca de regra |
| `PRD_v1.md` | "por que o produto existe? pra quem?" | mudanca de escopo (nova versao) |
| `architecture.md` | "como esta construido? por que assim?" | decisao arquitetural (ADR) |
| `roadmap.md` | "o que vem pela frente?" | replanejamento |
| `NOW.md` | "no que estou trabalhando AGORA?" | toda task |
| `summary.md` | "o que ja foi entregue?" | ao fechar milestone |
| `licoes.md` | "que erro nao posso repetir?" | apos correcao |
| `changes/<feat>/` | "o que esta mudando nesta feature?" | durante a feature; arquivado ao fechar |

---

## FAQ

**Preciso seguir as 8 etapas sempre?** Nao. Em N1 sao 3. Em N2/N3 use o que a feature pede; so nao pule `analyze` antes de implementar.

**E se eu ja uso GSD?** Use o SDD pra gerar `spec.md`/`PRD` e entregue pro `/gsd:plan-phase --prd`. SDD = entrada leve; GSD = execucao pesada.

**Funciona fora da minha stack?** Sim. Os templates vem temperados pra TS/React/Supabase, mas as secoes especificas viram "N/A" em outras stacks.

**Sobrescreve meu CLAUDE.md?** Nunca sem mostrar o diff e pedir ok.
