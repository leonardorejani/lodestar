# Instala o lodestar como skill /sdd-init do Claude Code (Windows PowerShell).
$ErrorActionPreference = "Stop"

$dest = Join-Path $env:USERPROFILE ".claude\skills\sdd-init"
$src  = $PSScriptRoot

Write-Host "lodestar - instalando a skill /sdd-init"
Write-Host "   origem:  $src"
Write-Host "   destino: $dest"

New-Item -ItemType Directory -Force -Path $dest | Out-Null

$items = @('SKILL.md','GUIA.md','NIVEIS.md','templates','prompts','validators')
foreach ($item in $items) {
    Copy-Item -Recurse -Force -Path (Join-Path $src $item) -Destination $dest
}

# exemplos sao opcionais
$examples = Join-Path $src 'examples'
if (Test-Path $examples) { Copy-Item -Recurse -Force -Path $examples -Destination $dest }

Write-Host ""
Write-Host "instalado em $dest"
Write-Host "   abra o Claude Code num projeto e rode:  /sdd-init"
