import Generator from 'yeoman-generator';
import chalk from 'chalk';

module.exports = class extends Generator {
  constructor(args: string | string[], options: Generator.GeneratorOptions, features: Generator.GeneratorFeatures) {
    super(args, options, features);
  }

  get initializing() {
    return {
      async loadSharedConfig() {
        this.log(chalk.yellow('📋 Loading JHipster configuration...'));
      }
    };
  }

  get prompting() {
    return {
      async askForModules() {
        const answers = await this.prompt([
          {
            type: 'checkbox',
            name: 'ruoyiModules',
            message: 'Select ruoyi-vue-pro modules to include:',
            choices: [
              { name: 'System Management (系统管理)', value: 'system', checked: true },
              { name: 'Infrastructure (基础设施)', value: 'infra', checked: true },
              { name: 'Workflow (工作流)', value: 'bpm' },
              { name: 'Payment (支付)', value: 'pay' },
              { name: 'Report (报表)', value: 'report' },
              { name: 'Member (会员)', value: 'member' }
            ]
          },
          {
            type: 'confirm',
            name: 'enableK8s',
            message: 'Generate Kubernetes configuration?',
            default: false
          },
          {
            type: 'confirm',
            name: 'generateDocker',
            message: 'Generate Docker configuration?',
            default: true
          }
        ]);

        this.config.set('ruoyiModules', answers.ruoyiModules);
        this.config.set('enableK8s', answers.enableK8s);
        this.config.set('generateDocker', answers.generateDocker);
      }
    };
  }

  get configuring() {
    return {
      async saveConfig() {
        this.config.set('blueprintVersion', require('../../package.json').version);
        this.log(chalk.green('✅ Configuration saved'));
      }
    };
  }

  get writing() {
    return {
      async writeFiles() {
        this.log(chalk.blue('📁 Writing project files...'));
        
        // Compose with server generator
        await this.composeWith(
          require.resolve('../server'),
          this.options
        );

        // Compose with client generator  
        await this.composeWith(
          require.resolve('../client'),
          this.options
        );
      },

      async writeREADME() {
        const readmeContent = this.templatePath('README.md.ejs');
        this.copyTpl(readmeContent, this.destinationPath('README.md'), this.config.getAll());
      }
    };
  }

  get end() {
    return {
      async endGenerator() {
        this.log('');
        this.log(chalk.green.bold('🎉 Lnnglar project generated successfully!'));
        this.log('');
        this.log(chalk.blue('📝 Next steps:'));
        this.log('  1. cd ' + this.options.destinationPath);
        this.log('  2. Backend: mvn spring-boot:run');
        this.log('  3. Frontend: cd src/main/resources/admin-ui && npm install && npm run dev');
        this.log('');
        this.log(chalk.yellow('📚 Documentation: https://github.com/your-username/generator-jhipster-lnnglar'));
      }
    };
  }
};