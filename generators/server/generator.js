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
        this.log('🔧 Writing ruoyi-vue-pro backend (minimal test)...')
        
        // Just write a simple file to test
        this.fs.write('test.txt', 'Hello from lnnglar blueprint!')
      },
    }
  }
}
