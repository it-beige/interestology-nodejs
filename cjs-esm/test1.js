require('./test2');
console.log(module);
process.nextTick(() => {
  console.log(module);
});

import('./test2.js').then(dynamicModule => {
  console.log(dynamicModule, '------>import');
});
