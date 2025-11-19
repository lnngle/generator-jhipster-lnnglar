# generator-jhipster-lnnglar

[![npm version](https://badge.fury.io/js/generator-jhipster-lnnglar.svg)](https://badge.fury.io/js/generator-jhipster-lnnglar)
[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)

一个强大的 JHipster Blueprint，基于 JHipster 8.x 构建，集成 ruoyi-vue-pro 后端和 yudao-ui-admin-vue3 前端，提供完整的企业级应用开发解决方案。

## 🚀 特性

- ✨ **基于 JHipster 8.x**：最新的 JHipster 框架支持
- 🔧 **现代 JavaScript**：使用 ES 模块和现代 JavaScript 开发
- 🚀 **后端框架**：ruoyi-vue-pro (若依增强版)
- 🎨 **前端框架**：yudao-ui-admin-vue3 (Element Plus + Vue 3)
- ⚡ **构建工具**：Vite + TypeScript (前端)，Maven (后端)
- 🛠️ **CRUD 生成**：从 JDL 自动生成前后端完整 CRUD 功能
- 📦 **模块化设计**：支持可选模块（system、infra 等）
- 🐳 **容器化支持**：内置 Docker 和 Kubernetes 配置

## 📋 系统要求

- **Node.js**: ^18.19.0 || >= 20.6.1
- **Java**: 17 或更高版本
- **Maven**: 3.8 或更高版本
- **JHipster**: 8.11.0

## 📦 安装

### 全局安装

```bash
npm install -g generator-jhipster-lnnglar
```

### 局部安装

```bash
npm install --save-dev generator-jhipster-lnnglar
```

## 🚀 快速开始

### 1. 创建项目

```bash
# 创建项目目录
mkdir my-lnnglar-project
cd my-lnnglar-project

# 运行生成器
jhipster --blueprints lnnglar
```

### 2. 选择配置

生成器会引导您选择：

- 启用的 ruoyi 模块（system, infra 等）
- 是否生成 Docker/K8s 配置
- 数据库配置
- 前端框架选项

### 3. 启动应用

```bash
# 启动后端
mvn spring-boot:run

# 启动前端（新终端）
cd src/main/resources/admin-ui
npm install
npm run dev
```

访问应用：

- 前端：http://localhost:80
- 后端：http://localhost:48080
- API 文档：http://localhost:48080/doc.html

## 🏗️ Blueprint 项目结构

```
generator-jhipster-lnnglar/
├── cli/                                    # CLI 入口点
│   ├── cli.cjs                           # 主 CLI 文件
│   ├── cli-customizations.cjs            # CLI 自定义配置
│   └── commands.cjs                      # CLI 命令定义
├── generators/                            # 生成器目录
│   ├── client/                           # 前端生成器
│   │   ├── generator.js                 # 前端生成逻辑
│   │   ├── index.js                     # 入口文件
│   │   └── templates/                   # 前端模板文件
│   │       ├── src/                     # Vue 3 源码模板
│   │       │   ├── api/                 # API 接口模板
│   │       │   ├── router/              # 路由配置模板
│   │       │   ├── stores/              # 状态管理模板
│   │       │   └── utils/               # 工具函数模板
│   │       ├── package.json.ejs         # 前端依赖模板
│   │       ├── vite.config.ts.ejs       # Vite 配置模板
│   │       └── tsconfig.json.ejs        # TypeScript 配置模板
│   ├── server/                           # 后端生成器
│   │   ├── generator.js                 # 后端生成逻辑
│   │   ├── index.js                     # 入口文件
│   │   └── templates/                   # 后端模板文件
│   │       ├── Application.java.ejs      # Spring Boot 启动类
│   │       ├── pom.xml.ejs              # Maven 配置模板
│   │       ├── application.yml.ejs      # 应用配置模板
│   │       ├── modules/                 # 模块模板
│   │       │   ├── system/              # 系统模块
│   │       │   └── infra/               # 基础设施模块
│   │       ├── docker/                  # Docker 配置
│   │       └── k8s/                     # Kubernetes 配置
│   └── entity/                           # 实体生成器
│       ├── generator.js                 # 实体生成逻辑
│       ├── index.js                     # 入口文件
│       └── templates/                   # 实体模板文件
├── .blueprint/                           # Blueprint 配置
│   ├── cli/                             # Blueprint CLI 样例
│   └── generate-sample/                 # 示例生成器
├── index.js                              # 主入口文件
├── package.json                          # 项目配置
├── eslint.config.js                      # ESLint 配置
├── vitest.config.ts                      # 测试配置
└── README.md                             # 项目说明
```

## 🏗️ 生成项目结构

生成后的项目结构：

```
your-project/
├── src/main/java/cn/iocoder/yudao/          # 后端 Java 代码
│   ├── server/                              # 服务器启动配置
│   ├── framework/                          # 框架核心代码
│   └── module/                             # 业务模块
│       ├── system/                         # 系统管理模块
│       └── infra/                          # 基础设施模块
├── src/main/resources/                      # 后端资源文件
│   ├── mapper/                            # MyBatis Mapper XML
│   └── admin-ui/                          # 前端 Vue 项目
│       ├── src/                           # 前端源码
│       │   ├── api/                      # API 接口
│       │   ├── views/                    # 页面组件
│       │   ├── components/               # 公共组件
│       │   ├── router/                   # 路由配置
│       │   ├── stores/                   # 状态管理
│       │   └── utils/                    # 工具函数
│       ├── package.json                  # 前端依赖
│       └── vite.config.ts                # Vite 配置
├── pom.xml                                 # Maven 配置
├── docker/                                 # Docker 配置
└── k8s/                                    # Kubernetes 配置
```

## 🛠️ 使用 JDL 生成实体

### 1. 创建 JDL 文件

```bash
# 创建 user.jdl 文件
cat > user.jdl << EOF
entity User {
  name String required
  email String required unique
  age Integer
  status Integer
  avatar String
  description String
}

relationship ManyToOne {
  User{department(name) to Department}
}

service User with serviceClass
paginate User with pagination
dto User with mapstruct
EOF
```

### 2. 导入 JDL

```bash
# 导入 JDL 并生成代码
jhipster import-jdl user.jdl --blueprints lnnglar
```

### 3. 生成的文件

后端文件：

- `UserDO.java` - 数据实体
- `UserBaseVO.java` - 基础 VO
- `UserRespVO.java` - 响应 VO
- `UserPageReqVO.java` - 分页查询 VO
- `UserConvert.java` - 转换器
- `UserMapper.java` - MyBatis Mapper
- `UserService.java` - 服务接口
- `UserServiceImpl.java` - 服务实现
- `UserController.java` - REST 控制器
- `UserMapper.xml` - SQL 映射

前端文件：

- `src/views/system/user/index.vue` - 列表页
- `src/views/system/user/form.vue` - 表单页
- `src/api/system/user/index.ts` - API 接口

## 📋 支持的模块

| 模块   | 描述                         | 状态 |
| ------ | ---------------------------- | ---- |
| system | 系统管理（用户、角色、菜单） | ✅   |
| infra  | 基础设施（配置、字典、日志） | ✅   |
| bpm    | 工作流引擎                   | 🚧   |
| pay    | 支付模块                     | 🚧   |
| report | 报表模块                     | 🚧   |
| member | 会员管理                     | 🚧   |

## 🔧 开发工具配置

本项目配备了完整的开发工具链：

- **ESLint**: 代码质量检查和规范
- **Prettier**: 代码格式化
- **Vitest**: 单元测试框架
- **Husky**: Git hooks 管理
- **lint-staged**: 提交前代码检查

### 开发脚本

```bash
# 代码检查
npm run lint

# 代码格式化
npm run prettier:format

# 运行测试
npm test

# EJS 模板检查
npm run ejslint
```

## 🔧 配置选项

### 数据库配置

在 `application.yml` 中配置：

```yaml
spring:
  datasource:
    url: jdbc:mysql://localhost:3306/your_db?useUnicode=true&characterEncoding=UTF-8&serverTimezone=Asia/Shanghai
    username: root
    password: your_password
```

### 前端配置

在 `vite.config.ts` 中配置：

```typescript
export default defineConfig({
  server: {
    proxy: {
      '/admin-api': {
        target: 'http://localhost:48080',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/admin-api/, ''),
      },
    },
  },
})
```

## 🚀 开发指南

### 添加新模块

1. 在 `generators/server/writing.ts` 中添加模块配置
2. 创建相应的模板文件
3. 更新模块选择逻辑

### 自定义模板

所有模板文件位于 `generators/*/templates/` 目录：

- `generators/server/templates/` - 后端模板
- `generators/client/templates/` - 前端模板
- `generators/entity/templates/` - 实体模板

## 🚀 本地发布和使用

### 当前状态
⚠️ **注意**: 项目正在进行模块系统兼容性优化，正在从ES modules转换为CommonJS以解决运行时问题。

### 方法一：直接全局安装（推荐）

```bash
# 1. 进入项目目录
cd generator-jhipster-lnnglar

# 2. 安装依赖
npm install

# 3. 打包项目
npm pack

# 4. 全局安装打包文件
npm install -g generator-jhipster-lnnglar-0.1.0.tgz

# 5. 验证安装
npm list -g generator-jhipster-lnnglar
```

### 方法二：开发调试模式

```bash
# 1. 进入项目目录
cd generator-jhipster-lnnglar

# 2. 安装依赖
npm install

# 3. 全局链接
npm link

# 4. 如果链接有问题，再使用方法一
npm pack && npm install -g generator-jhipster-lnnglar-0.1.0.tgz
```

### 验证和使用

```bash
# 1. 验证JHipster能找到blueprint
jhipster --blueprints lnnglar --help

# 2. 创建新项目
mkdir my-lnnglar-app
cd my-lnnglar-app

# 3. 创建配置文件
cat > .yo-rc.json << EOF
{
  "baseName": "myapp",
  "packageName": "com.mycompany.myapp",
  "packageFolder": "com/mycompany/myapp",
  "applicationType": "monolith",
  "serverPort": 8080,
  "authenticationType": "jwt",
  "databaseType": "mysql",
  "buildTool": "maven",
  "clientFramework": "vue",
  "ruoyiModules": ["system", "infra"]
}
EOF

# 4. 生成项目（如果遇到错误，这是已知的兼容性问题，正在修复中）
jhipster --blueprints lnnglar
```

### 🐛 已知问题和解决方案

**问题**: 运行时出现模块导入错误  
**状态**: 正在修复中  
**临时解决方案**: 

1. 等待模块系统兼容性修复完成
2. 或者使用直接复制模板的方式生成项目

**开发环境要求**:
- Node.js: ^18.19.0 || >= 20.6.1
- 确保使用 CommonJS 模块格式（当前已转换）

### 调试技巧

```bash
# 使用 Node.js 调试模式
DEBUG=jhipster:* jhipster --blueprints lnnglar

# 查看生成器日志
jhipster --blueprints lnnglar --debug

# 检查已安装的generators
yo --generators
```

## 📝 自定义 Blueprint

### 添加新的生成器

1. 在 `generators/` 目录下创建新的生成器目录
2. 创建 `generator.js` 和 `index.js` 文件
3. 在 `templates/` 目录下添加模板文件

### 修改模板

所有 EJS 模板位于对应的 `templates/` 目录：

- **后端模板**: `generators/server/templates/`
- **前端模板**: `generators/client/templates/`
- **实体模板**: `generators/entity/templates/`

### 自定义 CLI 命令

在 `cli/` 目录下修改 CLI 配置：

- `cli.cjs`: 主要 CLI 逻辑
- `cli-customizations.cjs`: 自定义配置
- `commands.cjs`: 命令定义

## 🤝 贡献

欢迎贡献代码！我们遵循标准的开源贡献流程。

### 开发流程

1. Fork 项目
2. 创建特性分支：`git checkout -b feature/amazing-feature`
3. 提交更改：`git commit -m 'Add amazing feature'`
4. 推送分支：`git push origin feature/amazing-feature`
5. 提交 Pull Request

### 代码规范

- 使用 ESLint 和 Prettier 保持代码风格一致
- 所有新功能需要添加测试用例
- 遵循 JHipster 8.x 的最佳实践
- 更新相关文档

### 提交信息规范

使用约定式提交格式：

- `feat:` 新功能
- `fix:` 修复问题
- `docs:` 文档更新
- `style:` 代码格式调整
- `refactor:` 代码重构
- `test:` 测试相关
- `chore:` 构建工具或辅助工具的变动

## 📄 许可证

本项目采用 Apache-2.0 许可证。详见 [LICENSE](LICENSE) 文件。

## 🙏 致谢

- [JHipster](https://www.jhipster.tech/) - 优秀的应用生成平台
- [ruoyi-vue-pro](https://github.com/YunaiV/ruoyi-vue-pro) - 优秀的后端管理框架
- [yudao-ui-admin-vue3](https://gitee.com/yudaocode/yudao-ui-admin-vue3) - 现代化的前端管理界面

## 📞 支持

- 🐛 问题反馈：[GitHub Issues](https://github.com/lnnglar/generator-jhipster-lnnglar/issues)
- 💬 讨论：[GitHub Discussions](https://github.com/lnnglar/generator-jhipster-lnnglar/discussions)
- 📖 文档：[项目 Wiki](https://github.com/lnnglar/generator-jhipster-lnnglar/wiki)

## 🔗 相关链接

- [JHipster 官网](https://www.jhipster.tech/)
- [JHipster 文档](https://www.jhipster.tech/documentation-archive-v8)
- [ruoyi-vue-pro](https://github.com/YunaiV/ruoyi-vue-pro)
- [yudao-ui-admin-vue3](https://gitee.com/yudaocode/yudao-ui-admin-vue3)

## 📊 项目状态

![GitHub stars](https://img.shields.io/github/stars/lnnglar/generator-jhipster-lnnglar)
![GitHub forks](https://img.shields.io/github/forks/lnnglar/generator-jhipster-lnnglar)
![GitHub issues](https://img.shields.io/github/issues/lnnglar/generator-jhipster-lnnglar)
![GitHub license](https://img.shields.io/github/license/lnnglar/generator-jhipster-lnnglar)

---

**Made with ❤️ by lnnglar team**
