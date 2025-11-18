# generator-jhipster-lnnglar

[![npm version](https://badge.fury.io/js/generator-jhipster-lnnglar.svg)](https://badge.fury.io/js/generator-jhipster-lnnglar)
[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)

一个强大的 JHipster Blueprint，集成 ruoyi-vue-pro 后端和 yudao-ui-admin-vue3 前端，提供完整的企业级应用开发解决方案。

## 🚀 特性

- ✨ **基于 JHipster**：延续 JHipster 的优秀开发体验
- 🚀 **后端框架**：ruoyi-vue-pro (若依增强版)
- 🎨 **前端框架**：yudao-ui-admin-vue3 (Element Plus)
- 🔧 **技术栈**：Spring Boot + MyBatis Plus + Vue 3 + TypeScript
- 📦 **模块化设计**：支持可选模块（system、infra、bpm、pay 等）
- 🛠️ **CRUD 生成**：从 JDL 自动生成前后端完整 CRUD 功能
- 📱 **响应式设计**：适配移动端和桌面端

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

- 启用的 ruoyi 模块（system, infra, bpm, pay 等）
- 是否生成 Docker/K8s 配置
- 数据库配置

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

## 🏗️ 项目结构

```
your-project/
├── src/main/java/cn/iocoder/yudao/          # 后端 Java 代码
│   ├── server/                              # 服务器启动配置
│   ├── framework/                          # 框架核心代码
│   └── module/                             # 业务模块
│       ├── system/                         # 系统管理模块
│       ├── infra/                          # 基础设施模块
│       ├── bpm/                            # 工作流模块
│       └── pay/                            # 支付模块
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
└── README.md                              # 项目说明
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

| 模块 | 描述 | 状态 |
|------|------|------|
| system | 系统管理（用户、角色、菜单） | ✅ |
| infra | 基础设施（配置、字典、日志） | ✅ |
| bpm | 工作流引擎 | 🚧 |
| pay | 支付模块 | 🚧 |
| report | 报表模块 | 🚧 |
| member | 会员管理 | 🚧 |

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
        rewrite: (path) => path.replace(/^\/admin-api/, '')
      }
    }
  }
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

### 本地开发

```bash
# 克隆项目
git clone https://github.com/your-username/generator-jhipster-lnnglar.git
cd generator-jhipster-lnnglar

# 安装依赖
npm install

# 构建项目
npm run build

# 链接本地包
npm link

# 测试
mkdir test-project
cd test-project
jhipster --blueprints lnnglar
```

## 🤝 贡献

欢迎贡献代码！请查看 [CONTRIBUTING.md](CONTRIBUTING.md) 了解详细信息。

### 开发流程

1. Fork 项目
2. 创建特性分支：`git checkout -b feature/amazing-feature`
3. 提交更改：`git commit -m 'Add amazing feature'`
4. 推送分支：`git push origin feature/amazing-feature`
5. 提交 Pull Request

## 📄 许可证

本项目采用 Apache-2.0 许可证。详见 [LICENSE](LICENSE) 文件。

## 🙏 致谢

- [JHipster](https://www.jhipster.tech/) - 优秀的应用生成平台
- [ruoyi-vue-pro](https://github.com/YunaiV/ruoyi-vue-pro) - 优秀的后端管理框架
- [yudao-ui-admin-vue3](https://gitee.com/yudaocode/yudao-ui-admin-vue3) - 现代化的前端管理界面

## 📞 支持

- 📧 邮箱：your.email@example.com
- 🐛 问题反馈：[GitHub Issues](https://github.com/your-username/generator-jhipster-lnnglar/issues)
- 💬 讨论：[GitHub Discussions](https://github.com/your-username/generator-jhipster-lnnglar/discussions)

---

**Made with ❤️ by generator-jhipster-lnnglar**