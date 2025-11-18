import { EnvironmentOptions } from 'yeoman-environment';
import chalk from 'chalk';

export interface JHipsterLnnglarGeneratorOptions extends Generator.Options {
  blueprints?: string[];
}

module.exports = class extends Generator {
  constructor(args: string | string[], options: JHipsterLnnglarGeneratorOptions) {
    super(args, options);

    // Set blueprint option to this
    if (!options.blueprints) {
      options.blueprints = ['lnnglar'];
    }

    this.composeWith(
      require.resolve('./generators/app'),
      options as EnvironmentOptions
    );
  }

  get initializing() {
    return {
      displayLogo() {
        this.log('');
        this.log(`${chalk.blue('██╗      ██████╗  █████╗ ██╗     ██╗███╗   ██╗')}`);
        this.log(`${chalk.blue('██║     ██╔═══██╗██╔══██╗██║     ██║████╗  ██║')}`);
        this.log(`${chalk.blue('██║     ██║   ██║███████║██║     ██║██╔██╗ ██║')}`);
        this.log(`${chalk.blue('██║     ██║   ██║██╔══██║██║     ██║██║╚██╗██║')}`);
        this.log(`${chalk.blue('███████╗╚██████╔╝██║  ██║███████╗██║██║ ╚████║')}`);
        this.log(`${chalk.blue('╚══════╝ ╚═════╝ ╚═╝  ╚═╝╚══════╝╚═╝╚═╝  ╚═══╝')}`);
        this.log('');
        this.log(chalk.white.bold('Welcome to the Lnnglar JHipster Blueprint'));
        this.log(chalk.white('Generating ruoyi-vue-pro backend + yudao-ui-vue3 frontend'));
        this.log('');
      }
    };
  }
};