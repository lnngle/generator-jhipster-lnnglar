import * as Generator from 'yeoman-generator';
import chalk from 'chalk';
import { BaseBlueprintGenerator } from 'generator-jhipster';
import { writeFiles } from './writing';

export default class extends BaseBlueprintGenerator {
  constructor(args: string | string[], options: Generator.GeneratorOptions, features: Generator.GeneratorFeatures) {
    super(args, options, features);
  }

  get initializing() {
    return {
      async loadConfig() {
        this.log(chalk.yellow('🎨 Initializing yudao-ui-admin-vue3 frontend generation...'));
        this.ruoyiModules = this.config.get('ruoyiModules') || ['system', 'infra'];
      }
    };
  }

  get default() {
    return {
      ...writeFiles(),
      
      async setupVueProject() {
        this.log(chalk.blue('📦 Setting up Vue 3 project structure...'));
      }
    };
  }

  get writing() {
    return {
      async writePackageFiles() {
        this.log(chalk.blue('📝 Writing package.json and configuration files...'));
        
        const packageFiles = [
          'package.json.ejs',
          'vite.config.ts.ejs',
          'tsconfig.json.ejs',
          'tsconfig.node.json.ejs',
          'env.d.ts.ejs',
          'index.html.ejs'
        ];

        packageFiles.forEach(file => {
          const templateFile = this.templatePath(`client/${file}`);
          const targetPath = file.replace('.ejs', '');
          const targetDir = 'src/main/resources/admin-ui/';
          
          this.copyTpl(
            templateFile,
            this.destinationPath(`${targetDir}${targetPath}`),
            this.config.getAll()
          );
        });
      },

      async writeSourceFiles() {
        this.log(chalk.blue('📁 Writing Vue source files...'));
        
        // Create Vue directory structure
        const vueDirectories = [
          'src',
          'src/api',
          'src/views',
          'src/components',
          'src/utils',
          'src/router',
          'src/stores',
          'src/assets',
          'src/assets/images',
          'src/assets/styles',
          'src/hooks',
          'src/directives',
          'src/config',
          'src/enums',
          'src/types',
          'src/layout',
          'public'
        ];

        vueDirectories.forEach(dir => {
          this.fs.mkdirp(this.destinationPath(`src/main/resources/admin-ui/${dir}`));
        });

        // Write main Vue files
        const vueFiles = [
          'src/main.ts.ejs',
          'src/App.vue.ejs',
          'src/api/index.ts.ejs',
          'src/utils/request.ts.ejs',
          'src/router/index.ts.ejs',
          'src/stores/index.ts.ejs',
          'src/layout/index.vue.ejs',
          'src/components/AppHeader.vue.ejs',
          'src/components/AppSidebar.vue.ejs'
        ];

        vueFiles.forEach(file => {
          const templateFile = this.templatePath(`client/${file}`);
          const targetPath = file.replace('.ejs', '');
          const targetDir = 'src/main/resources/admin-ui/';
          
          this.copyTpl(
            templateFile,
            this.destinationPath(`${targetDir}${targetPath}`),
            this.config.getAll()
          );
        });
      },

      async writeModuleViews() {
        this.log(chalk.blue('📦 Writing module views...'));
        
        const modules = this.config.get('ruoyiModules') || ['system', 'infra'];
        
        modules.forEach(module => {
          const modulePath = `src/views/${module}`;
          this.fs.mkdirp(this.destinationPath(`src/main/resources/admin-ui/${modulePath}`));
          
          const moduleFiles = [
            'index.vue.ejs',
            'components/README.md'
          ];
          
          moduleFiles.forEach(file => {
            const templateFile = this.templatePath(`client/modules/${module}/${file}`);
            const targetPath = `${modulePath}/${file.replace('.ejs', '')}`;
            this.copyTpl(
              templateFile,
              this.destinationPath(`src/main/resources/admin-ui/${targetPath}`),
              this.config.getAll()
            );
          });
        });
      }
    };
  }

  get end() {
    return {
      async endClient() {
        this.log(chalk.green('✅ yudao-ui-admin-vue3 frontend generated successfully!'));
        this.log('');
        this.log(chalk.yellow('📋 Frontend setup:'));
        this.log('  cd src/main/resources/admin-ui');
        this.log('  npm install');
        this.log('  npm run dev');
      }
    };
  }
};