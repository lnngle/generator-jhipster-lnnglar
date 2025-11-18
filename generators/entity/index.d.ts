import * as Generator from 'yeoman-generator';
import { BaseBlueprintGenerator } from 'generator-jhipster';
export default class extends BaseBlueprintGenerator {
    constructor(args: string | string[], options: Generator.GeneratorOptions, features: Generator.GeneratorFeatures);
    get initializing(): {
        loadEntityConfig(): Promise<void>;
        setupTemplates(): Promise<void>;
    };
    get default(): {
        writing(): Promise<void>;
    };
    get writing(): {
        writeBackendFiles(): Promise<void>;
        writeFrontendFiles(): Promise<void>;
        updateRouterConfig(): Promise<void>;
        updateMenuConfig(): Promise<void>;
    };
    get end(): {
        endEntity(): Promise<void>;
    };
}
//# sourceMappingURL=index.d.ts.map