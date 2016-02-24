import angular from 'angular';

import heartRating from './heart-rating/heart-rating';
import detail from './detail/detailCtrl';
import mainNav from './main_nav/main_nav';
import overview from './overview/overviewCtrl';

const components = angular.module( 'components', [] );
heartRating( components );
detail( components );
mainNav( components );
overview( components );

export default components.name;
