import main_nav from './main_nav.html';

export default function( app ) {

  app.directive( 'mainNav', function() {
    return {
      template: main_nav
    };
  });

}
