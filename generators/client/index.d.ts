import * as Generator from 'yeoman-generator';
import { BaseBlueprintGenerator } from 'generator-jhipster';
export default class extends BaseBlueprintGenerator {
    constructor(args: string | string[], options: Generator.GeneratorOptions, features: Generator.GeneratorFeatures);
    get initializing(): {
        loadConfig(): Promise<void>;
    };
    get default(): {
        setupVueProject(): Promise<void>;
        writing(): Promise<void>;
    };
    get writing(): {
        writePackageFiles(): Promise<void>;
        writeSourceFiles(): Promise<void>;
        writeModuleViews(): Promise<void>;
    };
    get end(): {
        endClient(): Promise<void>;
    };
}
//# sourceMappingURL=index.d.ts.map