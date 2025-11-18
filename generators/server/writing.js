"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.writeFiles = void 0;
const chalk_1 = __importDefault(require("chalk"));
const writeFiles = () => {
    return {
        async writing() {
            const generator = this;
            await writeMavenFiles.call(generator);
            await writeApplicationFiles.call(generator);
            await writeModuleFiles.call(generator);
            if (generator.config.get('generateDocker')) {
                await writeDockerFiles.call(generator);
            }
            if (generator.config.get('enableK8s')) {
                await writeK8sFiles.call(generator);
            }
        }
    };
};
exports.writeFiles = writeFiles;
async function writeMavenFiles() {
    this.log(chalk_1.default.blue('📝 Writing Maven configuration...'));
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
async function writeApplicationFiles() {
    this.log(chalk_1.default.blue('⚙️  Writing application configuration...'));
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
async function writeModuleFiles() {
    const modules = this.config.get('ruoyiModules') || ['system', 'infra'];
    modules.forEach(module => {
        this.log(chalk_1.default.blue(`📦 Writing ${module} module files...`));
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
        this.fs.mkdirp(this.destinationPath(modulePath));
        ['controller', 'service', 'dal', 'convert', 'api/dto'].forEach(subdir => {
            this.fs.mkdirp(this.destinationPath(`${modulePath}/${subdir}`));
        });
    });
}
async function writeDockerFiles() {
    this.log(chalk_1.default.blue('🐳 Writing Docker configuration...'));
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
async function writeK8sFiles() {
    this.log(chalk_1.default.blue('☸️  Writing Kubernetes configuration...'));
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
//# sourceMappingURL=writing.js.map