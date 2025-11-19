const { GeneratorBaseApplication } = require('generator-jhipster')

module.exports = class extends GeneratorBaseApplication {
  constructor(args, opts, features) {
    super(args, opts, features)
  }

  get [Symbol.for('jhipster-blueprint')]() {
    return this
  }

  get writing() {
    return {
      async write() {
        this.log('🎨 Writing yudao-ui-admin-vue3 frontend (minimal test)...')
        
        // Just write a simple file to test
        this.fs.write('test-client.txt', 'Hello from lnnglar client blueprint!')
      },
    }
  }

  async writePackageJson() {
    const templateData = {
      baseName: this.jhipsterConfig.baseName,
      packageName: this.jhipsterConfig.packageName,
    }

    this.fs.copyTpl(this.templatePath('package.json.ejs'), this.destinationPath('package.json'), templateData)
  }

  async writeViteConfig() {
    const templateData = {
      baseName: this.jhipsterConfig.baseName,
    }

    const configFiles = [
      'vite.config.ts.ejs',
      'tsconfig.json.ejs',
      'tsconfig.node.json.ejs',
      '.env.ejs',
      '.env.development.ejs',
      '.env.production.ejs',
      'index.html.ejs',
    ]

    configFiles.forEach(file => {
      this.fs.copyTpl(this.templatePath(file), this.destinationPath(file.replace('.ejs', '')), templateData)
    })
  }

  async writeVueFiles() {
    const templateData = {
      baseName: this.jhipsterConfig.baseName,
    }

    // Create necessary directories
    this.fs.mkdirp(this.destinationPath('src'))
    this.fs.mkdirp(this.destinationPath('src/views'))
    this.fs.mkdirp(this.destinationPath('src/layouts'))
    this.fs.mkdirp(this.destinationPath('src/components'))

    const vueFiles = ['src/App.vue.ejs', 'src/main.ts.ejs', 'src/views/Login.vue.ejs', 'src/layouts/index.vue.ejs']

    vueFiles.forEach(file => {
      this.fs.copyTpl(this.templatePath(file), this.destinationPath(file.replace('.ejs', '')), templateData)
    })
  }

  async writeApiFiles() {
    const templateData = {
      baseName: this.jhipsterConfig.baseName,
    }

    // Create API directories
    this.fs.mkdirp(this.destinationPath('src/api'))
    this.fs.mkdirp(this.destinationPath('src/api/system'))

    const apiFiles = ['src/api/system/user.ts.ejs', 'src/api/system/types.ts.ejs']

    apiFiles.forEach(file => {
      this.fs.copyTpl(this.templatePath(file), this.destinationPath(file.replace('.ejs', '')), templateData)
    })
  }

  async writeRouterFiles() {
    // Create router directory
    this.fs.mkdirp(this.destinationPath('src/router'))

    const routerContent = `import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import { useUserStore } from '@/stores/modules/user'

const routes: RouteRecordRaw[] = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/Login.vue'),
    meta: { title: '登录' }
  },
  {
    path: '/',
    name: 'Layout',
    component: () => import('@/layouts/index.vue'),
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: () => import('@/views/Dashboard.vue'),
        meta: { title: '仪表盘', icon: 'dashboard' }
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior: () => ({ left: 0, top: 0 })
})

export default router

export function setupRouter(app: any) {
  // 设置路由守卫
  router.beforeEach(async (to, from, next) => {
    const userStore = useUserStore()
    
    if (to.path === '/login') {
      next()
      return
    }
    
    if (!userStore.isLoggedIn) {
      next('/login')
      return
    }
    
    next()
  })
}`

    this.fs.write(this.destinationPath('src/router/index.ts'), routerContent)
  }

  async writeStoreFiles() {
    // Create stores directory
    this.fs.mkdirp(this.destinationPath('src/stores'))
    this.fs.mkdirp(this.destinationPath('src/stores/modules'))

    const storeFiles = ['src/stores/modules/user.ts.ejs']

    storeFiles.forEach(file => {
      this.fs.copyTpl(this.templatePath(file), this.destinationPath(file.replace('.ejs', '')), {
        baseName: this.jhipsterConfig.baseName,
      })
    })
  }
}
