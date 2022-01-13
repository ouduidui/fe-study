export default {
  input: './src/index.js',
  output: [
    {
      file: 'build/amd/bundle.js',
      format: 'amd',
      amd: {
        id: 'Test'
      }
    },
    {
      file: 'build/cjs/bundle.js',
      format: 'cjs'
    },
    {
      file: 'build/esm/bundle.js',
      format: 'esm'
    },
    {
      file: 'build/iife/bundle.js',
      format: 'iife',
      name: 'Test'
    },
    {
      file: 'build/umd/bundle.js',
      format: 'umd',
      name: 'Test',
      amd: {
        id: 'Test'
      }
    },
    {
      file: 'build/system/bundle.js',
      format: 'system'
    }
  ]
};
