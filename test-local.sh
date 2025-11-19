#!/bin/bash
# 本地发布和测试脚本

echo "=== 本地发布 generator-jhipster-lnnglar ==="

# 1. 进入项目目录
cd "$(dirname "$0")"

# 2. 安装依赖
echo "安装依赖..."
npm install

# 3. 全局链接
echo "全局链接包..."
npm link

# 4. 验证链接
echo "验证链接..."
npm list -g generator-jhipster-lnnglar

# 5. 创建测试项目
echo "创建测试项目..."
cd ../
mkdir -p jhipster-lnnglar-test
cd jhipster-lnnglar-test

# 6. 初始化 JHipster 项目
echo "初始化 JHipster 项目..."
echo -e "\n\n\n\n\n\n\n\n\n\n" | jhipster --blueprints lnnglar

echo "=== 测试完成 ==="