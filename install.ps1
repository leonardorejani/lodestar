# Fallback sem plugin: instala o lodestar como skill standalone (Windows PowerShell).
# Caminho recomendado e o plugin:
#   /plugin marketplace add leonardorejani/lodestar
#   /plugin install lodestar
$ErrorActionPreference = "Stop"

$dest = Join-Path $env:USERPROFILE ".claude\skills\lodestar"
$src  = $PSScriptRoot

Write-Host "lodestar - instalando a skill standalone"
Write-Host "   origem:  $src"
Write-Host "   destino: $dest"

New-Item -ItemType Directory -Force -Path $dest | Out-Null

Copy-Item -Force -Path (Join-Path $src 'skills\lodestar\SKILL.md') -Destination $dest
Copy-Item -Force -Path (Join-Path $src 'GUIA.md'),(Join-Path $src 'NIVEIS.md') -Destination $dest
foreach ($item in @('templates','scripts','validators')) {
    Copy-Item -Recurse -Force -Path (Join-Path $src $item) -Destination $dest
}
$examples = Join-Path $src 'examples'
if (Test-Path $examples) { Copy-Item -Recurse -Force -Path $examples -Destination $dest }

Write-Host ""
Write-Host "instalado em $dest"
Write-Host "   dica: o caminho completo (com os comandos /lodestar:*) e via plugin."
