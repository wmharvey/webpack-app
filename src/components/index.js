import angular from 'angular';

import capsule from './capsule/capsule';
import capsuleEditform from './capsule-editform/capsule-editform';
import capsuleForm from './capsule-form/capsule-form';
import detail from './detail/detail';
import detailFilterbar from './detail-filterbar/detail-filterbar';
import detailIframe from './detail-iframe/detail-iframe';
import heartRating from './heart-rating/heart-rating';
import home from './home/home';
import item from './item/item';
import itemEditform from './item-editform/item-editform';
import itemForm from './item-form/item-form';
import login from './login/login';
import mainNav from './main_nav/main_nav';
import overview from './overview/overview';
import overviewFilterbar from './overview-filterbar/overview-filterbar';
import signup from './signup/signup';

const components = angular.module( 'components', [] );

capsule( components );
capsuleEditform( components );
capsuleForm( components );
detail( components );
detailFilterbar( components );
detailIframe( components );
heartRating( components );
home( components );
item( components );
itemEditform( components );
itemForm( components );
login( components );
mainNav( components );
overview( components );
overviewFilterbar( components );
signup( components );

export default components.name;
