import * as Generator from 'yeoman-generator';
import { BaseBlueprintGenerator } from 'generator-jhipster';
export default class extends BaseBlueprintGenerator {
    constructor(args: string | string[], options: Generator.GeneratorOptions, features: Generator.GeneratorFeatures);
    get initializing(): {
        loadConfig(): Promise<void>;
    };
    get default(): {
        setupProject(): Promise<void>;
        writing(): Promise<void>;
    };
    get writing(): {
        writeProjectFiles(): Promise<void>;
        writeFrameworkFiles(): Promise<void>;
    };
    get end(): {
        endServer(): Promise<void>;
    };
}
//# sourceMappingURL=index.d.ts.map