import spring from '../images/seasons/spring.png';
import summer from '../images/seasons/summer.jpg';
import autumn from '../images/seasons/autumn.jpg';
import winter from '../images/seasons/winter.png';

export default function( ngModule ) {

  ngModule.service( 'ImageService', function () {

    this.setImage = function (capsule) {
      if (capsule.season === 'Spring') capsule.url = spring;
      if (capsule.season === 'Summer') capsule.url = summer;
      if (capsule.season === 'Autumn') capsule.url = autumn;
      if (capsule.season === 'Winter') capsule.url = winter;
      return capsule;
    };

  });

}

