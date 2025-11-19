const { GeneratorBaseApplication } = require('generator-jhipster')

module.exports = class extends GeneratorBaseApplication {
  constructor(args, opts, features) {
    super(args, opts, features)
  }

  get [Symbol.for('jhipster-blueprint')]() {
    return this
  }

  get writing() {
    return {
      async write() {
        this.log('🏗️  Writing entity files from JDL (minimal test)...')
        
        // Just write a simple file to test
        this.fs.write('test-entity.txt', 'Hello from lnnglar entity blueprint!')
      },
    }
  }

  async writeEntityFiles() {
    const entity = this.entity
    const entityData = {
      entityName: entity.name,
      entityInstance: entity.name.charAt(0).toLowerCase() + entity.name.slice(1),
      tableName: entity.tableName,
      fields: entity.fields,
      relationships: entity.relationships,
      validations: entity.validations,
      dto: entity.dto,
      pagination: entity.pagination,
      jpaMetamodelFiltering: entity.jpaMetamodelFiltering,
      service: entity.service,
      flakyMethods: entity.flakyMethods,
      readOnly: entity.readOnly,
    }

    // Create entity directories
    const entityPath = `src/main/java/${this.jhipsterConfig.packageFolder.replace(/\./g, '/')}/${entity.name.toLowerCase()}`
    this.fs.mkdirp(this.destinationPath(entityPath))
    ;['controller', 'service', 'dal', 'convert', 'api/dto'].forEach(subdir => {
      this.fs.mkdirp(this.destinationPath(`${entityPath}/${subdir}`))
    })

    // Write entity files based on configuration
    if (entity.dto) {
      await this.writeDtoFiles(entityData, entityPath)
    }

    if (entity.service) {
      await this.writeServiceFiles(entityData, entityPath)
    }

    // Always write basic controller
    await this.writeControllerFiles(entityData, entityPath)
  }

  async writeDtoFiles(entityData, entityPath) {
    // Write DTO files
    this.fs.copyTpl(
      this.templatePath('DTO.java.ejs'),
      this.destinationPath(`${entityPath}/api/dto/${entityData.entityName}DTO.java`),
      entityData
    )
  }

  async writeServiceFiles(entityData, entityPath) {
    // Write service files
    this.fs.copyTpl(
      this.templatePath('Service.java.ejs'),
      this.destinationPath(`${entityPath}/service/${entityData.entityName}Service.java`),
      entityData
    )
  }

  async writeControllerFiles(entityData, entityPath) {
    // Write controller files
    this.fs.copyTpl(
      this.templatePath('Controller.java.ejs'),
      this.destinationPath(`${entityPath}/controller/${entityData.entityName}Controller.java`),
      entityData
    )
  }
}
