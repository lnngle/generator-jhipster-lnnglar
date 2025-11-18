"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chalk_1 = __importDefault(require("chalk"));
module.exports = class extends Generator {
    constructor(args, options) {
        super(args, options);
        if (!options.blueprints) {
            options.blueprints = ['lnnglar'];
        }
        this.composeWith(require.resolve('./generators/app'), options);
    }
    get initializing() {
        return {
            displayLogo() {
                this.log('');
                this.log(`${chalk_1.default.blue('██╗      ██████╗  █████╗ ██╗     ██╗███╗   ██╗')}`);
                this.log(`${chalk_1.default.blue('██║     ██╔═══██╗██╔══██╗██║     ██║████╗  ██║')}`);
                this.log(`${chalk_1.default.blue('██║     ██║   ██║███████║██║     ██║██╔██╗ ██║')}`);
                this.log(`${chalk_1.default.blue('██║     ██║   ██║██╔══██║██║     ██║██║╚██╗██║')}`);
                this.log(`${chalk_1.default.blue('███████╗╚██████╔╝██║  ██║███████╗██║██║ ╚████║')}`);
                this.log(`${chalk_1.default.blue('╚══════╝ ╚═════╝ ╚═╝  ╚═╝╚══════╝╚═╝╚═╝  ╚═══╝')}`);
                this.log('');
                this.log(chalk_1.default.white.bold('Welcome to the Lnnglar JHipster Blueprint'));
                this.log(chalk_1.default.white('Generating ruoyi-vue-pro backend + yudao-ui-vue3 frontend'));
                this.log('');
            }
        };
    }
};
//# sourceMappingURL=index.js.map