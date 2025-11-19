# 本地发布和测试脚本 (PowerShell)

Write-Host "=== 本地发布 generator-jhipster-lnnglar ===" -ForegroundColor Green

# 1. 进入项目目录
Set-Location $PSScriptRoot

# 2. 安装依赖
Write-Host "安装依赖..." -ForegroundColor Yellow
npm install

# 3. 全局链接
Write-Host "全局链接包..." -ForegroundColor Yellow
npm link

# 4. 验证链接
Write-Host "验证链接..." -ForegroundColor Yellow
npm list -g generator-jhipster-lnnglar

# 5. 创建测试项目
Write-Host "创建测试项目..." -ForegroundColor Yellow
Set-Location ../
New-Item -ItemType Directory -Force -Path "jhipster-lnnglar-test" | Out-Null
Set-Location "jhipster-lnnglar-test"

# 6. 检查是否可以找到blueprint
Write-Host "检查blueprint是否可用..." -ForegroundColor Yellow
jhipster --blueprints lnnglar --help

Write-Host "=== 测试完成 ===" -ForegroundColor Green