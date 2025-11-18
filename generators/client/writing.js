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
            await writePackageJson.call(generator);
            await writeViteConfig.call(generator);
            await writeVueComponents.call(generator);
            await writeApiFiles.call(generator);
            await writeRouterConfig.call(generator);
            await writeStoreConfig.call(generator);
        }
    };
};
exports.writeFiles = writeFiles;
async function writePackageJson() {
    this.log(chalk_1.default.blue('📦 Writing package.json...'));
    const templateFile = this.templatePath('client/package.json.ejs');
    this.copyTpl(templateFile, this.destinationPath('src/main/resources/admin-ui/package.json'), this.config.getAll());
}
async function writeViteConfig() {
    this.log(chalk_1.default.blue('⚙️  Writing Vite configuration...'));
    const configFiles = [
        'vite.config.ts.ejs',
        'tsconfig.json.ejs',
        'tsconfig.node.json.ejs'
    ];
    configFiles.forEach(file => {
        const templateFile = this.templatePath(`client/config/${file}`);
        const targetPath = file.replace('.ejs', '');
        this.copyTpl(templateFile, this.destinationPath(`src/main/resources/admin-ui/${targetPath}`), this.config.getAll());
    });
}
async function writeVueComponents() {
    this.log(chalk_1.default.blue('🧩 Writing Vue components...'));
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
        this.copyTpl(templateFile, this.destinationPath(`src/main/resources/admin-ui/${targetPath}`), this.config.getAll());
    });
}
async function writeApiFiles() {
    this.log(chalk_1.default.blue('🔌 Writing API files...'));
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
        this.copyTpl(templateFile, this.destinationPath(`src/main/resources/admin-ui/${targetPath}`), this.config.getAll());
    });
}
async function writeRouterConfig() {
    this.log(chalk_1.default.blue('🛣️  Writing router configuration...'));
    const routerFiles = [
        'src/router/index.ts.ejs',
        'src/router/modules/system.ts.ejs',
        'src/router/modules/infra.ts.ejs',
        'src/router/guard.ts.ejs'
    ];
    routerFiles.forEach(file => {
        const templateFile = this.templatePath(`client/router/${file}`);
        const targetPath = file.replace('.ejs', '');
        this.copyTpl(templateFile, this.destinationPath(`src/main/resources/admin-ui/${targetPath}`), this.config.getAll());
    });
}
async function writeStoreConfig() {
    this.log(chalk_1.default.blue('🗄️  Writing store configuration...'));
    const storeFiles = [
        'src/stores/index.ts.ejs',
        'src/stores/modules/user.ts.ejs',
        'src/stores/modules/app.ts.ejs',
        'src/stores/modules/dict.ts.ejs'
    ];
    storeFiles.forEach(file => {
        const templateFile = this.templatePath(`client/stores/${file}`);
        const targetPath = file.replace('.ejs', '');
        this.copyTpl(templateFile, this.destinationPath(`src/main/resources/admin-ui/${targetPath}`), this.config.getAll());
    });
}
//# sourceMappingURL=writing.js.map