console.log(require);

// output: 
/*
[Function: require] {
  resolve: [Function: resolve] { paths: [Function: paths] },
  main: {
    id: '.',
    path: 'C:\\Mine\\node-js\\2-globals',
    exports: {},
    filename: 'C:\\Mine\\node-js\\2-globals\\require.js',
    loaded: false,
    children: [],
    paths: [
      'C:\\Mine\\node-js\\2-globals\\node_modules',
      'C:\\Mine\\node-js\\node_modules',
      'C:\\Mine\\node_modules',
      'C:\\node_modules'
    ],
    [Symbol(kIsMainSymbol)]: true,
    [Symbol(kIsCachedByESMLoader)]: false,
    [Symbol(kIsExecuting)]: true
  },
  extensions: [Object: null prototype] {
    '.js': [Function (anonymous)],
    '.json': [Function (anonymous)],
    '.node': [Function (anonymous)]
  },
  cache: [Object: null prototype] {
    'C:\\Mine\\node-js\\2-globals\\require.js': {
      id: '.',
      path: 'C:\\Mine\\node-js\\2-globals',
      exports: {},
      filename: 'C:\\Mine\\node-js\\2-globals\\require.js',
      loaded: false,
      children: [],
      paths: [Array],
      [Symbol(kIsMainSymbol)]: true,
      [Symbol(kIsCachedByESMLoader)]: false,
      [Symbol(kIsExecuting)]: true
    }
  }
}
*/