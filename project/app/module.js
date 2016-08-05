import angular from 'angular';

const app = angular.module('app', ['ng']);
window.APP_VERSION = APP_VERSION;

// Allow services, factories, etc. to add dependencies
// asynchronously
app.addModules = function(_modules) {
  let modules = _modules;
  if (!Array.isArray(modules)) {
    modules = [modules];
  }

  modules.forEach(module => {
    const contains = app.requires.includes(module);
    if (!contains) {
      app.requires.push(module);
    }
  });

};

export default app;
