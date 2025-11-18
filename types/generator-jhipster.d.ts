declare module 'generator-jhipster' {
  import { Generator } from 'yeoman-generator';
  
  export class BaseBlueprintGenerator extends Generator {
    constructor(args: string | string[], options: Generator.GeneratorOptions, features: Generator.GeneratorFeatures);
    log: any;
    config: any;
    templateContext: any;
    copyTpl: any;
    composeWith: any;
    destinationPath: any;
    templatePath: any;
    fs: any;
  }
  
  export interface GeneratorFeatures {
    enableTranslation?: boolean;
    enableI18nRTL?: boolean;
    clientFramework?: string;
    databaseType?: string;
    devDatabaseType?: string;
    prodDatabaseType?: string;
    buildTool?: string;
    cacheProvider?: string;
    websocket?: boolean;
    searchEngine?: boolean;
    messageBroker?: boolean;
    serviceDiscoveryType?: string;
    applicationType?: string;
    authenticationType?: string;
    packageName?: string;
    serverPort?: number;
    clientTheme?: string;
    clientThemeVariant?: string;
    withAdminUi?: boolean;
    testFrameworks?: string[];
    jhiPrefix?: string;
    entitySuffix?: string;
    dtoSuffix?: string;
    skipClient?: boolean;
    skipServer?: boolean;
    skipUserManagement?: boolean;
  }
}