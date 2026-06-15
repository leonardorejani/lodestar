#!/usr/bin/env node
/**
 * validate-encoding.cjs — Guardrail de encoding PT-BR (anti-mojibake).
 *
 * Uso:
 *   node validate-encoding.cjs arquivo1.md arquivo2.ts ...
 *
 * Falha (exit 1) se encontrar:
 *   - Replacement char U+FFFD (encoding ja corrompido na leitura)
 *   - Padroes classicos de mojibake (UTF-8 lido como Latin-1): Ã©, Ã£, Ã§, etc.
 *
 * Portavel: nao depende de PATH especifico. Cross-platform.
 */

const fs = require('fs');

// Sequencias de mojibake mais comuns em PT-BR (UTF-8 interpretado como Latin-1/ANSI).
// Ex.: "ç" vira "Ã§", "ã" vira "Ã£", "é" vira "Ã©".
const MOJIBAKE = [
  'Ã¡', 'Ã ', 'Ã¢', 'Ã£', 'Ã¤', // a com acentos
  'Ã©', 'Ã¨', 'Ãª', 'Ã«',       // e
  'Ã­', 'Ã¬', 'Ã®', 'Ã¯',       // i
  'Ã³', 'Ã²', 'Ã´', 'Ãµ', 'Ã¶', // o
  'Ãº', 'Ã¹', 'Ã»', 'Ã¼',       // u
  'Ã§', 'Ã‡',                    // c cedilha
  'Ã‰', 'Ãƒ', 'Ã•', 'Ã‘',       // maiusculas
  'Â´', 'Âº', 'Âª', 'Â°', 'Â§',  // simbolos com Â espurio
  'â€™', 'â€œ', 'â€', 'â€“', 'â€”', // aspas/travessoes
  'â‚¬', 'Ã—',
];

const REPLACEMENT = '�'; // caractere de substituicao (perda de dado)

function checkFile(path) {
  let content;
  try {
    content = fs.readFileSync(path, 'utf8');
  } catch (err) {
    return { path, error: `nao foi possivel ler: ${err.message}`, issues: [] };
  }

  const issues = [];
  const lines = content.split(/\r?\n/);

  lines.forEach((line, idx) => {
    if (line.includes(REPLACEMENT)) {
      issues.push({ line: idx + 1, kind: 'replacement-char (U+FFFD)', sample: snippet(line, REPLACEMENT) });
    }
    for (const m of MOJIBAKE) {
      if (line.includes(m)) {
        issues.push({ line: idx + 1, kind: `mojibake "${m}"`, sample: snippet(line, m) });
      }
    }
  });

  return { path, error: null, issues };
}

function snippet(line, needle) {
  const i = line.indexOf(needle);
  const start = Math.max(0, i - 20);
  const end = Math.min(line.length, i + 20);
  return (start > 0 ? '…' : '') + line.slice(start, end).trim() + (end < line.length ? '…' : '');
}

function main() {
  const files = process.argv.slice(2);
  if (files.length === 0) {
    console.error('Uso: node validate-encoding.cjs <arquivo> [arquivo...]');
    process.exit(2);
  }

  let totalIssues = 0;
  let hadError = false;

  for (const f of files) {
    const res = checkFile(f);
    if (res.error) {
      console.error(`✗ ${f}: ${res.error}`);
      hadError = true;
      continue;
    }
    if (res.issues.length === 0) {
      console.log(`✓ ${f}`);
    } else {
      console.error(`✗ ${f} — ${res.issues.length} problema(s):`);
      for (const it of res.issues) {
        console.error(`    L${it.line}: ${it.kind}  →  ${it.sample}`);
      }
      totalIssues += res.issues.length;
    }
  }

  if (totalIssues > 0 || hadError) {
    console.error(`\nFALHOU: ${totalIssues} problema(s) de encoding. Corrija (salve em UTF-8) e revalide.`);
    process.exit(1);
  }
  console.log('\nOK: encoding PT-BR integro.');
}

main();
