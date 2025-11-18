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
            await writeBackendEntities.call(generator);
            await writeFrontendEntities.call(generator);
            await updateConfigurations.call(generator);
            await writeMenuPermissions.call(generator);
        }
    };
};
exports.writeFiles = writeFiles;
async function writeBackendEntities() {
    this.log(chalk_1.default.blue('🔧 Writing backend entity files...'));
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
    const modulePath = 'system';
    entityFiles.forEach(file => {
        const templateFile = this.templatePath(`entity/backend/${file.split('/').pop()}`);
        const targetPath = `src/main/java/cn/iocoder/yudao/module/${modulePath}/${file.replace(/<%=.*?%>/g, (match) => {
            return this.templateContext[match.replace(/[<=%>]/g, '').trim()];
        })}`;
        this.copyTpl(templateFile, this.destinationPath(targetPath), this.templateContext);
    });
}
async function writeFrontendEntities() {
    this.log(chalk_1.default.blue('🎨 Writing frontend entity files...'));
    const frontendFiles = [
        'views/system/<%= entityInstance %>/index.vue.ejs',
        'views/system/<%= entityInstance %>/form.vue.ejs',
        'api/system/<%= entityInstance %>/index.ts.ejs'
    ];
    frontendFiles.forEach(file => {
        const templateFile = this.templatePath(`entity/frontend/${file.split('/').pop()}`);
        const targetPath = `src/main/resources/admin-ui/src/${file.replace(/<%=.*?%>/g, (match) => {
            return this.templateContext[match.replace(/[<=%>]/g, '').trim()];
        })}`;
        this.copyTpl(templateFile, this.destinationPath(targetPath), this.templateContext);
    });
}
async function updateConfigurations() {
    this.log(chalk_1.default.blue('⚙️  Updating configuration files...'));
    const routerTemplate = this.templatePath('entity/config/router.ts.ejs');
    const routerPath = 'src/main/resources/admin-ui/src/router/modules/system.ts';
    this.copyTpl(routerTemplate, this.destinationPath(routerPath), this.templateContext);
    const typesTemplate = this.templatePath('entity/config/types.ts.ejs');
    const typesPath = 'src/main/resources/admin-ui/src/types/system.ts';
    this.copyTpl(typesTemplate, this.destinationPath(typesPath), this.templateContext);
}
async function writeMenuPermissions() {
    this.log(chalk_1.default.blue('📋 Writing menu and permissions...'));
    const menuTemplate = this.templatePath('entity/menu/menu.json.ejs');
    const menuPath = 'src/main/resources/admin-ui/src/config/menu.json';
    this.copyTpl(menuTemplate, this.destinationPath(menuPath), this.templateContext);
    const permissionTemplate = this.templatePath('entity/permission/permissions.ts.ejs');
    const permissionPath = 'src/main/resources/admin-ui/src/permissions/system.ts';
    this.copyTpl(permissionTemplate, this.destinationPath(permissionPath), this.templateContext);
}
//# sourceMappingURL=writing.js.map