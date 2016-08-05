import app from '../module';
import notification from './templates/notification.html';
import page from './templates/registration.html';
import notice from './templates/notice.html';

app.config(function ($stateProvider) {
  $stateProvider
    .state('registration', {
      url: '/',
      templateUrl: page,
      controller: 'registrationController',
      controllerAs: 'registration'
    });
});

class RegistrationController {

  constructor ($scope, AvModal, AV_GLOBALS) {
    this.di = { $scope, AvModal };
    this.states = AV_GLOBALS.REGIONS;
    this.selectedState = this.states[0];
    this.notice = notice;
  }

  onShow () {
    this.di.AvModal.create({
      scope: this.di.$scope,
      templateUrl: notification,
      show: true
    });
  }
}

app.controller('registrationController', RegistrationController);

export default app;
