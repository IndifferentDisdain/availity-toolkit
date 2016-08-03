
import './index.less';
import 'jquery';
import 'angular';
import 'availity-angular';

import app from './module';
import './registration';

app.addModules([
  'availity',
  'availity.ui',
  'ui.router',
  'ng.shims.placeholder'
]);

app.config( ($urlRouterProvider, avValProvider) => {

  const standard = {
    name: {
      required: {
        message: 'Your name is required.'
      },
      size: {
        min: 2,
        max: 10,
        message: 'Your name must be between 2 and 10 characters.'
      }
    },
    date: {
      required: {
        message: 'Date of Birth is required.'
      },
      dateFormat: {
        format: 'MM/DD/YYYY',
        message: 'Format needs to be MM/DD/YYYY'
      }
    }
  };

  avValProvider.addRules({
    standard
  });

  $urlRouterProvider.otherwise('/');
});

export default app;

