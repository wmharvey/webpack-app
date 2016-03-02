import angular from 'angular';
import router from 'angular-ui-router';
import ngResource from 'angular-resource';
import messages from 'angular-messages';
import ngDialog from 'ng-dialog';

import filters from '../filters';
import components from '../components';
import services from '../services';

const app = angular.module( 'myApp', [
  router, ngResource, filters, components, services, messages, ngDialog
]);

export default app;
