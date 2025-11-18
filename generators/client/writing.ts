import * as Generator from 'yeoman-generator';
import chalk from 'chalk';

export const writeFiles = () => {
  return {
    async writing() {
      const generator = this as any;
      
      // Write package.json
      await writePackageJson.call(generator);
      
      // Write Vite configuration
      await writeViteConfig.call(generator);
      
      // Write Vue components
      await writeVueComponents.call(generator);
      
      // Write API files
      await writeApiFiles.call(generator);
      
      // Write router configuration
      await writeRouterConfig.call(generator);
      
      // Write store configuration
      await writeStoreConfig.call(generator);
    }
  };
};

async function writePackageJson(this: any) {
  this.log(chalk.blue('📦 Writing package.json...'));
  
  const templateFile = this.templatePath('client/package.json.ejs');
  this.copyTpl(
    templateFile,
    this.destinationPath('src/main/resources/admin-ui/package.json'),
    this.config.getAll()
  );
}

async function writeViteConfig(this: any) {
  this.log(chalk.blue('⚙️  Writing Vite configuration...'));
  
  const configFiles = [
    'vite.config.ts.ejs',
    'tsconfig.json.ejs',
    'tsconfig.node.json.ejs'
  ];
  
  configFiles.forEach(file => {
    const templateFile = this.templatePath(`client/config/${file}`);
    const targetPath = file.replace('.ejs', '');
    this.copyTpl(
      templateFile,
      this.destinationPath(`src/main/resources/admin-ui/${targetPath}`),
      this.config.getAll()
    );
  });
}

async function writeVueComponents(this: any) {
  this.log(chalk.blue('🧩 Writing Vue components...'));
  
  const componentFiles = [
    'src/App.vue.ejs',
    'src/main.ts.ejs',
    'src/components/Loading/Loading.vue.ejs',
    'src/components/Error/Error.vue.ejs',
    'src/components/Pagination/index.vue.ejs',
    'src/components/Search/index.vue.ejs'
  ];
  
  componentFiles.forEach(file => {
    const templateFile = this.templatePath(`client/components/${file}`);
    const targetPath = file.replace('.ejs', '');
    this.copyTpl(
      templateFile,
      this.destinationPath(`src/main/resources/admin-ui/${targetPath}`),
      this.config.getAll()
    );
  });
}

async function writeApiFiles(this: Generator.Generator) {
  this.log(chalk.blue('🔌 Writing API files...'));
  
  const apiFiles = [
    'src/api/index.ts.ejs',
    'src/api/request.ts.ejs',
    'src/api/dict/index.ts.ejs',
    'src/api/system/user/index.ts.ejs',
    'src/api/system/menu/index.ts.ejs',
    'src/api/system/role/index.ts.ejs'
  ];
  
  apiFiles.forEach(file => {
    const templateFile = this.templatePath(`client/api/${file}`);
    const targetPath = file.replace('.ejs', '');
    this.copyTpl(
      templateFile,
      this.destinationPath(`src/main/resources/admin-ui/${targetPath}`),
      this.config.getAll()
    );
  });
}

async function writeRouterConfig(this: Generator.Generator) {
  this.log(chalk.blue('🛣️  Writing router configuration...'));
  
  const routerFiles = [
    'src/router/index.ts.ejs',
    'src/router/modules/system.ts.ejs',
    'src/router/modules/infra.ts.ejs',
    'src/router/guard.ts.ejs'
  ];
  
  routerFiles.forEach(file => {
    const templateFile = this.templatePath(`client/router/${file}`);
    const targetPath = file.replace('.ejs', '');
    this.copyTpl(
      templateFile,
      this.destinationPath(`src/main/resources/admin-ui/${targetPath}`),
      this.config.getAll()
    );
  });
}

async function writeStoreConfig(this: Generator.Generator) {
  this.log(chalk.blue('🗄️  Writing store configuration...'));
  
  const storeFiles = [
    'src/stores/index.ts.ejs',
    'src/stores/modules/user.ts.ejs',
    'src/stores/modules/app.ts.ejs',
    'src/stores/modules/dict.ts.ejs'
  ];
  
  storeFiles.forEach(file => {
    const templateFile = this.templatePath(`client/stores/${file}`);
    const targetPath = file.replace('.ejs', '');
    this.copyTpl(
      templateFile,
      this.destinationPath(`src/main/resources/admin-ui/${targetPath}`),
      this.config.getAll()
    );
  });
}