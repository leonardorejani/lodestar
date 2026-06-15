#!/usr/bin/env bash
# Instala o lodestar como skill /sdd-init do Claude Code.
set -e

DEST="${HOME}/.claude/skills/sdd-init"
SRC="$(cd "$(dirname "$0")" && pwd)"

echo "⭐ lodestar — instalando a skill /sdd-init"
echo "   origem:  $SRC"
echo "   destino: $DEST"

mkdir -p "$DEST"
cp -r \
  "$SRC/SKILL.md" \
  "$SRC/GUIA.md" \
  "$SRC/NIVEIS.md" \
  "$SRC/templates" \
  "$SRC/prompts" \
  "$SRC/validators" \
  "$DEST"/

# exemplos sao opcionais (uteis de referencia)
[ -d "$SRC/examples" ] && cp -r "$SRC/examples" "$DEST"/ || true

echo ""
echo "✅ instalado em $DEST"
echo "   abra o Claude Code num projeto e rode:  /sdd-init"
