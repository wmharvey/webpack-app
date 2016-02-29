import angular from 'angular';
import ClothesService from './ClothesService';
import CapsuleService from './CapsuleService';
import welcomeMessage from './WelcomeService';

const services = angular.module( 'services', [] );
services.constant( 'apiUrl', 'http://localhost:8000/api' );

ClothesService( services );
CapsuleService( services );
welcomeMessage( services );

export default services.name;
