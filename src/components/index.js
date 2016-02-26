import angular from 'angular';

import capsule from './capsule/capsule';
import capsuleEditform from './capsule-editform/capsule-editform';
import capsuleForm from './capsule-form/capsule-form';
import detail from './detail/detailCtrl';
import detailFilterbar from './detail-filterbar/detail-filterbar';
import heartRating from './heart-rating/heart-rating';
import item from './item/item';
import itemEditform from './item-editform/item-editform';
import itemForm from './item-form/item-form';
import mainNav from './main_nav/main_nav';
import overview from './overview/overviewCtrl';
import overviewFilterbar from './overview-filterbar/overview-filterbar';

const components = angular.module( 'components', [] );

capsule( components );
capsuleEditform( components );
capsuleForm( components );
detail( components );
detailFilterbar( components );
heartRating( components );
item( components );
itemEditform( components );
itemForm( components );
mainNav( components );
overview( components );
overviewFilterbar( components );

export default components.name;
