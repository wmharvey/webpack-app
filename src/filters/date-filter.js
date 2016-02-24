import moment from 'moment';

export default function( ngModule ) {

  ngModule.filter( 'date', function () {
    return function (date, options) {
      if (options === 'elasped') {
        return moment(new Date(date)).fromNow();
      }
      if (options === 'standard') {
        return moment().format("dddd, MMMM Do YYYY");
      }
      return moment().format();
    };
  });

}
