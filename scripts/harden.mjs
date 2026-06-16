#!/usr/bin/env node
// harden.mjs — instala a camada de qualidade/engenharia do lodestar (N3) num projeto.
// Uso: node harden.mjs --dest <dir> [--stack vercel|supabase-functions|docker-ghcr|npm-publish|static-pages]
//                      [--projeto X --repo Y --owner Z --mantenedor W] [--force]
import { existsSync, mkdirSync, readFileSync, writeFileSync, readdirSync, statSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join, resolve } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const Q = join(__dirname, '..', 'quality');

const args = process.argv.slice(2);
const flag = (n, d) => { const i = args.indexOf(n); return i >= 0 && args[i + 1] ? args[i + 1] : d; };
const dest = resolve(flag('--dest', '.'));
const stack = flag('--stack', 'static-pages');
const force = args.includes('--force');

const SUBS = {
  '{{PROJETO}}': flag('--projeto', ''),
  '{{PROJETO_UPPER}}': (flag('--projeto', '') || '').toUpperCase(),
  '{{REPO}}': flag('--repo', ''),
  '{{REPO_OWNER}}': flag('--owner', ''),
  '{{MANTENEDOR}}': flag('--mantenedor', ''),
  '{{STACK}}': stack,
};

const DEPLOY = ['vercel', 'supabase-functions', 'docker-ghcr', 'npm-publish', 'static-pages'];
if (!DEPLOY.includes(stack)) { console.error(`stack invalida: ${stack} (use ${DEPLOY.join(' | ')})`); process.exit(2); }

const created = [], skipped = [], warned = [];

function render(srcAbs) {
  let c = readFileSync(srcAbs, 'utf8');
  for (const [k, v] of Object.entries(SUBS)) if (v) c = c.split(k).join(v);
  return c;
}
function place(srcAbs, destRel, { neverOverwrite = false } = {}) {
  const out = join(dest, destRel);
  if (existsSync(out) && !force) {
    if (neverOverwrite) warned.push(destRel + ' (ja existe — mescle manualmente)');
    else skipped.push(destRel);
    return;
  }
  mkdirSync(dirname(out), { recursive: true });
  writeFileSync(out, render(srcAbs));
  created.push(destRel);
}
const unT = (name) => name.replace(/\.template$/, '');

// rules -> .claude/rules/
for (const f of readdirSync(join(Q, 'rules'))) place(join(Q, 'rules', f), join('.claude/rules', unT(f)));
// agents -> .claude/agents/
for (const f of readdirSync(join(Q, 'agents'))) place(join(Q, 'agents', f), join('.claude/agents', unT(f)));
// settings -> .claude/
place(join(Q, 'settings.json.template'), '.claude/settings.json');
// workflows (exceto deploy/) -> .github/workflows/
for (const f of readdirSync(join(Q, 'workflows'))) {
  if (f === 'deploy') continue;
  place(join(Q, 'workflows', f), join('.github/workflows', unT(f)));
}
// deploy escolhido -> .github/workflows/deploy.yml
place(join(Q, 'workflows/deploy', `${stack}.yml.template`), '.github/workflows/deploy.yml');
// validators -> scripts/validators/
for (const f of readdirSync(join(Q, 'validators'))) place(join(Q, 'validators', f), join('scripts/validators', unT(f)));
// hooks -> scripts/hooks/  (lefthook.yml fica na raiz)
for (const f of readdirSync(join(Q, 'hooks'))) place(join(Q, 'hooks', f), join('scripts/hooks', unT(f)));
place(join(Q, 'lefthook.yml.template'), 'lefthook.yml');
// scripts auxiliares -> scripts/
for (const f of readdirSync(join(Q, 'scripts'))) place(join(Q, 'scripts', f), join('scripts', unT(f)));
// PR template -> .github/
place(join(Q, 'PULL_REQUEST_TEMPLATE.md.template'), '.github/PULL_REQUEST_TEMPLATE.md');
// CLAUDE.md — NUNCA sobrescreve (pode ja existir do /lodestar:init); avisa pra mesclar a equalizacao
place(join(Q, 'CLAUDE.md.template'), 'CLAUDE.md', { neverOverwrite: true });

console.log(`⭐ lodestar harden — camada de qualidade -> ${dest}  (deploy: ${stack})\n`);
created.forEach((f) => console.log('  + ' + f));
skipped.forEach((f) => console.log('  = ' + f + ' (mantido)'));
warned.forEach((f) => console.log('  ! ' + f));

const ph = Object.entries(SUBS).filter(([, v]) => !v).map(([k]) => k);
if (ph.length) console.log(`\nPlaceholders nao preenchidos (passe via flags ou edite): ${ph.join(', ')}`);
console.log(`\n${created.length} criado(s). Depois: configure o token OAuth do CI e rode o smoke test do PR.`);
