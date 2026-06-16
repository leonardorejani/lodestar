#!/usr/bin/env node
// check-docs.mjs — gate de integridade dos docs SDD num projeto.
// Uso: node check-docs.mjs [dir]   (default: cwd)
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { join, resolve, relative } from 'node:path';

const target = resolve(process.argv[2] || '.');
const docs = join(target, 'docs');

let problems = 0;
const ok = (cond, msg) => { console.log(`${cond ? '✓' : '✗'} ${msg}`); if (!cond) problems++; };
const has = (...cands) => cands.some((p) => existsSync(p));

// 1. nucleo SDD presente
ok(has(join(docs, 'spec.md'), join(target, 'spec.md')), 'spec.md presente (a fonte da verdade)');
ok(has(join(docs, 'NOW.md'), join(target, 'NOW.md')), 'NOW.md presente (1 task por vez)');
ok(existsSync(join(target, 'CLAUDE.md')), 'CLAUDE.md presente (constituicao/roteador)');

// 2. encoding PT-BR (anti-mojibake) em todos os .md sob docs/
const MOJI = ['Ã©', 'Ã£', 'Ã§', 'Ã¡', 'Ã³', 'Ãª', 'Ãº', 'Ã­', 'Ã´', 'Ã¢', 'â€™', 'â€œ', '�'];
let encIssues = 0;
function scan(dir) {
  if (!existsSync(dir)) return;
  for (const e of readdirSync(dir)) {
    const p = join(dir, e);
    if (statSync(p).isDirectory()) scan(p);
    else if (e.endsWith('.md')) {
      const c = readFileSync(p, 'utf8');
      const bad = MOJI.find((m) => c.includes(m));
      if (bad) { console.log(`  ✗ encoding "${bad}" em ${relative(target, p)}`); encIssues++; }
    }
  }
}
scan(docs);
ok(encIssues === 0, `encoding PT-BR dos docs (${encIssues} problema(s))`);

// 3. spec ainda com placeholders crus? (aviso, nao falha)
const specPath = has(join(docs, 'spec.md')) ? join(docs, 'spec.md') : join(target, 'spec.md');
if (existsSync(specPath)) {
  const spec = readFileSync(specPath, 'utf8');
  const ph = (spec.match(/<[^>\n]{1,40}>/g) || []).length;
  if (ph > 0) console.log(`  ! spec.md ainda tem ${ph} placeholder(s) <...> pra preencher`);
}

console.log('');
if (problems > 0) { console.error(`check-docs: ${problems} problema(s) — corrija antes de implementar.`); process.exit(1); }
console.log('check-docs: tudo certo. ⭐');
