#!/usr/bin/env bash
# Fallback sem plugin: instala o lodestar como skill standalone do Claude Code.
# Caminho recomendado e o plugin:
#   /plugin marketplace add leonardorejani/lodestar
#   /plugin install lodestar
set -e

DEST="${HOME}/.claude/skills/lodestar"
SRC="$(cd "$(dirname "$0")" && pwd)"

echo "⭐ lodestar — instalando a skill standalone"
echo "   origem:  $SRC"
echo "   destino: $DEST"

mkdir -p "$DEST"
cp "$SRC/skills/lodestar/SKILL.md" "$DEST"/
cp "$SRC/GUIA.md" "$SRC/NIVEIS.md" "$DEST"/
cp -r "$SRC/templates" "$SRC/scripts" "$SRC/validators" "$DEST"/
[ -d "$SRC/examples" ] && cp -r "$SRC/examples" "$DEST"/ || true

echo ""
echo "✅ instalado em $DEST"
echo "   dica: o caminho completo (com os comandos /lodestar:*) e via plugin."
echo "   abra o Claude Code num projeto e descreva o que quer especificar."
