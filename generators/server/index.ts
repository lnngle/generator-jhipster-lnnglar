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
        this.log(chalk.yellow('🔧 Initializing ruoyi-vue-pro backend generation...'));
        this.ruoyiModules = this.config.get('ruoyiModules') || ['system', 'infra'];
      }
    };
  }

  get default() {
    return {
      ...writeFiles(),
      
      async setupProject() {
        // Copy ruoyi-vue-pro template structure
        this.log(chalk.blue('📦 Setting up ruoyi-vue-pro project structure...'));
      }
    };
  }

  get writing() {
    return {
      async writeProjectFiles() {
        const files = [
          'pom.xml',
          'README.md',
          '.gitignore',
          'application.yml',
          'application-dev.yml',
          'application-prod.yml'
        ];

        files.forEach(file => {
          const templateFile = this.templatePath(`server/${file}.ejs`);
          this.copyTpl(templateFile, this.destinationPath(file), this.config.getAll());
        });

        // Generate directory structure
        const directories = [
          'src/main/java/cn/iocoder/yudao',
          'src/main/java/cn/iocoder/yudao/server',
          'src/main/java/cn/iocoder/yudao/module',
          'src/main/java/cn/iocoder/yudao/framework',
          'src/main/java/cn/iocoder/yudao/module/system',
          'src/main/java/cn/iocoder/yudao/module/infra',
          'src/main/resources',
          'src/main/resources/admin-ui',
          'src/test/java/cn/iocoder/yudao'
        ];

        directories.forEach(dir => {
          this.fs.mkdirp(this.destinationPath(dir));
        });
      },

      async writeFrameworkFiles() {
        this.log(chalk.blue('⚙️  Writing framework files...'));
        
        const frameworkFiles = [
          'Main.java.ejs',
          'YudaoServerApplication.java.ejs',
          'SwaggerConfiguration.java.ejs',
          'WebConfiguration.java.ejs'
        ];

        frameworkFiles.forEach(file => {
          const templateFile = this.templatePath(`server/framework/${file}`);
          const targetPath = file.replace('.ejs', '');
          const targetDir = targetPath.includes('Application') ? 
            'src/main/java/cn/iocoder/yudao/server/' : 
            'src/main/java/cn/iocoder/yudao/framework/';
          
          this.copyTpl(
            templateFile, 
            this.destinationPath(`${targetDir}${targetPath}`), 
            this.config.getAll()
          );
        });
      }
    };
  }

  get end() {
    return {
      async endServer() {
        this.log(chalk.green('✅ ruoyi-vue-pro backend generated successfully!'));
      }
    };
  }
};