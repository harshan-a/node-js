// console.log(module);

// output: 
/*
{
  id: '.',
  path: 'C:\\Mine\\node-js\\2-globals',
  exports: {},
  filename: 'C:\\Mine\\node-js\\2-globals\\module.js',
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
}
*/


/*
const var1 = 'This is the first variable.';
const var2 = 'This is the second variable.';
const var3 = 'This is the third variable.';

module.exports = { 
  var1, var2, var3
}

console.log(module);
*/


/*
module.exports.var1 = 'This is the first variable.';
module.exports.var2 = 'This is the second variable.';
module.exports['var3'] = 'This is the third variable.';

console.log(module);
*/