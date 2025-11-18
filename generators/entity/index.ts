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
      async loadEntityConfig() {
        this.log(chalk.yellow('🏗️  Initializing entity generation from JDL...'));
        
        // Parse JDL entities
        if (this.options.entityName) {
          this.entityName = this.options.entityName;
          this.entityConfig = this.options.entityConfig;
          this.log(chalk.blue(`📝 Processing entity: ${this.entityName}`));
        }
      },

      async setupTemplates() {
        // Setup template context
        this.templateContext = {
          entityName: this.entityName,
          entityClass: this.entityClass || this.entityName,
          entityInstance: this.entityInstance || this.entityName.toLowerCase(),
          fields: this.entityConfig?.fields || [],
          relationships: this.entityConfig?.relationships || [],
          primaryKey: this.entityConfig?.primaryKey || {
            name: 'id',
            type: 'Long',
            field: 'id'
          }
        };
      }
    };
  }

  get default() {
    return {
      ...writeFiles()
    };
  }

  get writing() {
    return {
      async writeBackendFiles() {
        this.log(chalk.blue('🔧 Writing backend CRUD files...'));
        
        const backendFiles = [
          'DO.java.ejs',
          'BaseVO.java.ejs', 
          'RespVO.java.ejs',
          'PageReqVO.java.ejs',
          'Convert.java.ejs',
          'Mapper.java.ejs',
          'Service.java.ejs',
          'ServiceImpl.java.ejs',
          'Controller.java.ejs',
          'Mapper.xml.ejs'
        ];

        const backendPaths = {
          'DO.java': 'src/main/java/cn/iocoder/yudao/module/system/dal/dataobject/',
          'BaseVO.java': 'src/main/java/cn/iocoder/yudao/module/system/api/dto/',
          'RespVO.java': 'src/main/java/cn/iocoder/yudao/module/system/api/dto/',
          'PageReqVO.java': 'src/main/java/cn/iocoder/yudao/module/system/api/dto/',
          'Convert.java': 'src/main/java/cn/iocoder/yudao/module/system/convert/',
          'Mapper.java': 'src/main/java/cn/iocoder/yudao/module/system/dal/mysql/',
          'Mapper.xml': 'src/main/resources/mapper/system/',
          'Service.java': 'src/main/java/cn/iocoder/yudao/module/system/service/',
          'ServiceImpl.java': 'src/main/java/cn/iocoder/yudao/module/system/service/impl/',
          'Controller.java': 'src/main/java/cn/iocoder/yudao/module/system/controller/admin/'
        };

        backendFiles.forEach(file => {
          const templateFile = this.templatePath(`entity/backend/${file}`);
          const targetPath = `${backendPaths[file]}${this.entityName}${file}`;
          
          this.copyTpl(
            templateFile,
            this.destinationPath(targetPath),
            this.templateContext
          );
        });
      },

      async writeFrontendFiles() {
        this.log(chalk.blue('🎨 Writing frontend CRUD files...'));
        
        const frontendFiles = [
          'index.vue.ejs',
          'form.vue.ejs',
          'api.ts.ejs'
        ];

        const frontendPath = 'src/main/resources/admin-ui/src/views/system/';
        const apiPath = 'src/main/resources/admin-ui/src/api/system/';

        frontendFiles.forEach(file => {
          const templateFile = this.templatePath(`entity/frontend/${file}`);
          
          if (file === 'api.ts') {
            this.copyTpl(
              templateFile,
              this.destinationPath(`${apiPath}${this.entityInstance}/${file.replace('.ejs', '')}`),
              this.templateContext
            );
          } else {
            this.copyTpl(
              templateFile,
              this.destinationPath(`${frontendPath}${this.entityInstance}/${file.replace('.ejs', '')}`),
              this.templateContext
            );
          }
        });
      },

      async updateRouterConfig() {
        this.log(chalk.blue('🛣️  Updating router configuration...'));
        
        const routerTemplate = this.templatePath('entity/router/update.ts.ejs');
        const routerPath = 'src/main/resources/admin-ui/src/router/modules/system.ts';
        
        this.copyTpl(
          routerTemplate,
          this.destinationPath(routerPath),
          this.templateContext
        );
      },

      async updateMenuConfig() {
        this.log(chalk.blue('📋 Updating menu configuration...'));
        
        const menuTemplate = this.templatePath('entity/menu/menu.json.ejs');
        const menuPath = 'src/main/resources/admin-ui/src/config/menu.json';
        
        this.copyTpl(
          menuTemplate,
          this.destinationPath(menuPath),
          this.templateContext
        );
      }
    };
  }

  get end() {
    return {
      async endEntity() {
        this.log('');
        this.log(chalk.green.bold(`✅ Entity ${this.entityName} CRUD generated successfully!`));
        this.log('');
        this.log(chalk.blue('📝 Generated files:'));
        this.log('  🔧 Backend: DO, VO, Service, Controller, Mapper');
        this.log('  🎨 Frontend: List page, Form page, API');
        this.log('  🛣️  Router and Menu configuration updated');
      }
    };
  }
};