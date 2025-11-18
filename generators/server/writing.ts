import * as Generator from 'yeoman-generator';
import chalk from 'chalk';

export const writeFiles = () => {
  return {
    async writing() {
      const generator = this as any;
      
      // Write Maven configuration
      await writeMavenFiles.call(generator);
      
      // Write application configuration
      await writeApplicationFiles.call(generator);
      
      // Write module files based on selected modules
      await writeModuleFiles.call(generator);
      
      // Write Docker files if enabled
      if (generator.config.get('generateDocker')) {
        await writeDockerFiles.call(generator);
      }
      
      // Write Kubernetes files if enabled
      if (generator.config.get('enableK8s')) {
        await writeK8sFiles.call(generator);
      }
    }
  };
};

async function writeMavenFiles(this: any) {
  this.log(chalk.blue('📝 Writing Maven configuration...'));
  
  const mavenFiles = [
    'pom.xml.ejs',
    'pom-prod.xml.ejs'
  ];
  
  mavenFiles.forEach(file => {
    const templateFile = this.templatePath(`server/maven/${file}`);
    const targetPath = file.replace('.ejs', '');
    this.copyTpl(templateFile, this.destinationPath(targetPath), this.config.getAll());
  });
}

async function writeApplicationFiles(this: Generator.Generator) {
  this.log(chalk.blue('⚙️  Writing application configuration...'));
  
  const configFiles = [
    'application.yml.ejs',
    'application-dev.yml.ejs', 
    'application-prod.yml.ejs',
    'bootstrap.yml.ejs'
  ];
  
  configFiles.forEach(file => {
    const templateFile = this.templatePath(`server/config/${file}`);
    const targetPath = file.replace('.ejs', '');
    this.copyTpl(templateFile, this.destinationPath(`src/main/resources/${targetPath}`), this.config.getAll());
  });
}

async function writeModuleFiles(this: Generator.Generator) {
  const modules = this.config.get('ruoyiModules') || ['system', 'infra'];
  
  modules.forEach(module => {
    this.log(chalk.blue(`📦 Writing ${module} module files...`));
    
    const modulePath = `src/main/java/cn/iocoder/yudao/module/${module}`;
    const moduleFiles = [
      'controller/README.md',
      'service/README.md', 
      'dal/README.md',
      'convert/README.md'
    ];
    
    moduleFiles.forEach(file => {
      const templateFile = this.templatePath(`server/modules/${module}/${file}.ejs`);
      const targetPath = `${modulePath}/${file.replace('.ejs', '')}`;
      this.copyTpl(templateFile, this.destinationPath(targetPath), this.config.getAll());
    });
    
    // Create module directories
    this.fs.mkdirp(this.destinationPath(modulePath));
    ['controller', 'service', 'dal', 'convert', 'api/dto'].forEach(subdir => {
      this.fs.mkdirp(this.destinationPath(`${modulePath}/${subdir}`));
    });
  });
}

async function writeDockerFiles(this: Generator.Generator) {
  this.log(chalk.blue('🐳 Writing Docker configuration...'));
  
  const dockerFiles = [
    'Dockerfile.ejs',
    'docker-compose.yml.ejs',
    '.dockerignore'
  ];
  
  dockerFiles.forEach(file => {
    const templateFile = this.templatePath(`server/docker/${file}`);
    const targetPath = file.replace('.ejs', '');
    this.copyTpl(templateFile, this.destinationPath(targetPath), this.config.getAll());
  });
}

async function writeK8sFiles(this: Generator.Generator) {
  this.log(chalk.blue('☸️  Writing Kubernetes configuration...'));
  
  const k8sFiles = [
    'deployment.yml.ejs',
    'service.yml.ejs',
    'configmap.yml.ejs'
  ];
  
  const k8sDir = 'k8s';
  this.fs.mkdirp(this.destinationPath(k8sDir));
  
  k8sFiles.forEach(file => {
    const templateFile = this.templatePath(`server/k8s/${file}`);
    const targetPath = file.replace('.ejs', '');
    this.copyTpl(templateFile, this.destinationPath(`${k8sDir}/${targetPath}`), this.config.getAll());
  });
}