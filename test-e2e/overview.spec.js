describe('Overview page', function() {

  describe('capsule thumbnails', function() {

    beforeAll( function() {
      browser.get('/');
      element.all(by.repeater('capsule in capsules')).count().then( (count) => {
        this.count = count;
      });
    });

    it('should add a capsule', function() {
      element(by.model('season')).sendKeys('Spring');
      element(by.model('description')).sendKeys('My test capsule');
      element(by.css('.addButton')).click();

      var capsules = element.all(by.repeater('capsule in capsules'));
      expect(capsules.count()).toEqual(this.count + 1);
      expect(capsules.first().element(by.binding('capsule.description')).getText()).toEqual('My test capsule');
    });

    it('should delete a capsule', function() {
      var capsules = element.all(by.repeater('capsule in capsules'));
      capsules.last().element(by.css('.deleteButton')).click();
      capsules = element.all(by.repeater('capsule in capsules'));
      expect(capsules.count()).toEqual(this.count);
    });
});

});
