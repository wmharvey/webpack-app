export default function( ngModule ) {

  ngModule.provider( 'welcomeMessage', function () {

    var welcome = {
      message: 'Thank you for visiting the site',
      updated: 'Feb. 28th, 2016',
      source: 'https://github.com/wmharvey/webpack-app'
    };

    this.setWelcome = function( key, value ) {
      welcome[ key ] = value;
      return this;
    };

    this.$get = function() {
      return welcome;
    };

  });

}
