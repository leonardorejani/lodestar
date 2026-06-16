#!/usr/bin/env node
// scaffold.mjs — instancia os templates do nivel escolhido num projeto.
// Uso: node scaffold.mjs --level N1|N2|N3 --dest <dir> [--force]
import { existsSync, mkdirSync, copyFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join, resolve } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const TEMPLATES = join(__dirname, '..', 'templates');

const args = process.argv.slice(2);
const flag = (name, def) => {
  const i = args.indexOf(name);
  return i >= 0 && args[i + 1] ? args[i + 1] : def;
};
const level = String(flag('--level', 'N2')).toUpperCase();
const dest = resolve(flag('--dest', '.'));
const force = args.includes('--force');

const LEVELS = {
  N1: { docs: ['spec.md', 'NOW.md'], root: ['CLAUDE.md'], changes: false },
  N2: {
    docs: ['spec.md', 'NOW.md', 'PRD_v1.md', 'architecture.md', 'roadmap.md', 'summary.md', 'licoes.md'],
    root: ['CLAUDE.md', 'AGENTS.md'], changes: true,
  },
  N3: {
    docs: ['spec.md', 'NOW.md', 'PRD_v1.md', 'architecture.md', 'roadmap.md', 'summary.md', 'licoes.md'],
    root: ['CLAUDE.md', 'AGENTS.md'], changes: true,
  },
};

if (!LEVELS[level]) {
  console.error(`nivel invalido: ${level} (use N1 | N2 | N3)`);
  process.exit(2);
}

const plan = LEVELS[level];
const created = [], skipped = [];

function place(srcName, destPath) {
  const src = join(TEMPLATES, srcName);
  if (!existsSync(src)) { console.error(`! template ausente: ${srcName}`); return; }
  if (existsSync(destPath) && !force) { skipped.push(destPath); return; }
  mkdirSync(dirname(destPath), { recursive: true });
  copyFileSync(src, destPath);
  created.push(destPath);
}

for (const f of plan.docs) place(f, join(dest, 'docs', f));
for (const f of plan.root) place(f, join(dest, f));

if (plan.changes) {
  const cdir = join(dest, 'changes');
  mkdirSync(cdir, { recursive: true });
  const keep = join(cdir, '.gitkeep');
  if (!existsSync(keep)) { writeFileSync(keep, ''); created.push(keep); }
}

console.log(`⭐ lodestar scaffold — nivel ${level} -> ${dest}\n`);
created.forEach((f) => console.log('  + ' + f));
skipped.forEach((f) => console.log('  = ' + f + ' (ja existe, mantido)'));

if (level === 'N3') {
  console.log('\nN3 — pra blindar a engenharia (CI/PR/merge/deploy), rode:');
  console.log('  /lodestar:harden');
}

console.log(`\n${created.length} criado(s), ${skipped.length} mantido(s). Proximo: /lodestar:specify`);
