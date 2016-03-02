import angular from 'angular';
import ClothesService from './ClothesService';
import CapsuleService from './CapsuleService';
import welcomeMessage from './WelcomeService';
import ImageService from './ImageService';

const services = angular.module( 'services', [] );
services.constant( 'apiUrl', 'http://localhost:8000/api' );

ClothesService( services );
CapsuleService( services );
welcomeMessage( services );
ImageService( services );

export default services.name;
