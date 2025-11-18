import * as Generator from 'yeoman-generator';
import chalk from 'chalk';

export const writeFiles = () => {
  return {
    async writing() {
      const generator = this as any;
      
      // Write backend entity files
      await writeBackendEntities.call(generator);
      
      // Write frontend entity files  
      await writeFrontendEntities.call(generator);
      
      // Update configuration files
      await updateConfigurations.call(generator);
      
      // Write menu permissions
      await writeMenuPermissions.call(generator);
    }
  };
};

async function writeBackendEntities(this: any) {
  this.log(chalk.blue('🔧 Writing backend entity files...'));
  
  const entityFiles = [
    'dal/dataobject/<%= entityName %>DO.java.ejs',
    'api/dto/<%= entityName %>BaseVO.java.ejs',
    'api/dto/<%= entityName %>RespVO.java.ejs', 
    'api/dto/<%= entityName %>PageReqVO.java.ejs',
    'convert/<%= entityName %>Convert.java.ejs',
    'dal/mysql/<%= entityName %>Mapper.java.ejs',
    'resources/mapper/system/<%= entityName %>Mapper.xml.ejs',
    'service/<%= entityName %>Service.java.ejs',
    'service/impl/<%= entityName %>ServiceImpl.java.ejs',
    'controller/admin/<%= entityName %>Controller.java.ejs'
  ];
  
  const modulePath = 'system'; // Could be configurable
  
  entityFiles.forEach(file => {
    const templateFile = this.templatePath(`entity/backend/${file.split('/').pop()}`);
    const targetPath = `src/main/java/cn/iocoder/yudao/module/${modulePath}/${file.replace(/<%=.*?%>/g, (match: string) => {
      return this.templateContext[match.replace(/[<=%>]/g, '').trim()];
    })}`;
    
    this.copyTpl(templateFile, this.destinationPath(targetPath), this.templateContext);
  });
}

async function writeFrontendEntities(this: Generator.Generator) {
  this.log(chalk.blue('🎨 Writing frontend entity files...'));
  
  const frontendFiles = [
    'views/system/<%= entityInstance %>/index.vue.ejs',
    'views/system/<%= entityInstance %>/form.vue.ejs',
    'api/system/<%= entityInstance %>/index.ts.ejs'
  ];
  
  frontendFiles.forEach(file => {
    const templateFile = this.templatePath(`entity/frontend/${file.split('/').pop()}`);
    const targetPath = `src/main/resources/admin-ui/src/${file.replace(/<%=.*?%>/g, (match: string) => {
      return this.templateContext[match.replace(/[<=%>]/g, '').trim()];
    })}`;
    
    this.copyTpl(templateFile, this.destinationPath(targetPath), this.templateContext);
  });
}

async function updateConfigurations(this: Generator.Generator) {
  this.log(chalk.blue('⚙️  Updating configuration files...'));
  
  // Update router
  const routerTemplate = this.templatePath('entity/config/router.ts.ejs');
  const routerPath = 'src/main/resources/admin-ui/src/router/modules/system.ts';
  
  this.copyTpl(routerTemplate, this.destinationPath(routerPath), this.templateContext);
  
  // Update types
  const typesTemplate = this.templatePath('entity/config/types.ts.ejs');
  const typesPath = 'src/main/resources/admin-ui/src/types/system.ts';
  
  this.copyTpl(typesTemplate, this.destinationPath(typesPath), this.templateContext);
}

async function writeMenuPermissions(this: Generator.Generator) {
  this.log(chalk.blue('📋 Writing menu and permissions...'));
  
  // Menu configuration
  const menuTemplate = this.templatePath('entity/menu/menu.json.ejs');
  const menuPath = 'src/main/resources/admin-ui/src/config/menu.json';
  
  this.copyTpl(menuTemplate, this.destinationPath(menuPath), this.templateContext);
  
  // Permission constants
  const permissionTemplate = this.templatePath('entity/permission/permissions.ts.ejs');
  const permissionPath = 'src/main/resources/admin-ui/src/permissions/system.ts';
  
  this.copyTpl(permissionTemplate, this.destinationPath(permissionPath), this.templateContext);
}