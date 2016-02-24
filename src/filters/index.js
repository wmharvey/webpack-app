import angular from 'angular';

import dateFilter from './date-filter';

const filters = angular.module( 'filters', [] );
dateFilter( filters );
export default filters.name;
