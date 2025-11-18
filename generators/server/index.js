"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chalk_1 = __importDefault(require("chalk"));
const generator_jhipster_1 = require("generator-jhipster");
const writing_1 = require("./writing");
class default_1 extends generator_jhipster_1.BaseBlueprintGenerator {
    constructor(args, options, features) {
        super(args, options, features);
    }
    get initializing() {
        return {
            async loadConfig() {
                this.log(chalk_1.default.yellow('🔧 Initializing ruoyi-vue-pro backend generation...'));
                this.ruoyiModules = this.config.get('ruoyiModules') || ['system', 'infra'];
            }
        };
    }
    get default() {
        return {
            ...(0, writing_1.writeFiles)(),
            async setupProject() {
                this.log(chalk_1.default.blue('📦 Setting up ruoyi-vue-pro project structure...'));
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
                this.log(chalk_1.default.blue('⚙️  Writing framework files...'));
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
                    this.copyTpl(templateFile, this.destinationPath(`${targetDir}${targetPath}`), this.config.getAll());
                });
            }
        };
    }
    get end() {
        return {
            async endServer() {
                this.log(chalk_1.default.green('✅ ruoyi-vue-pro backend generated successfully!'));
            }
        };
    }
}
exports.default = default_1;
;
//# sourceMappingURL=index.js.map