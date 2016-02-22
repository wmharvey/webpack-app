describe('Detail page', function() {

  describe('clothing items', function() {

    beforeAll( function() {
      browser.get('/#/capsules/56cb6cf5c45581ae40f69960');
      element.all(by.repeater('item in items')).count().then( count => {
        this.count = count;
      });
    });

    it('should add an item', function() {
      element(by.model('new.url')).sendKeys('www.test.com');
      element(by.model('new.image')).sendKeys('www.testimage.com');
      element(by.model('new.description')).sendKeys('jeans');
      element(by.model('new.type')).$('[value="shoes"]').click();
      element.all(by.css('.rating-symbol')).first().click();

      element(by.css('.addButton')).click();

      var items = element.all(by.repeater('item in items'));

      expect(items.count()).toEqual(this.count + 1);
      expect(items.last().element(by.binding('item.description')).getText()).toEqual('jeans');

    });

    it('should delete an item', function() {
      var items = element.all(by.repeater('item in items'));
      items.last().element(by.css('.deleteButton')).click();
      var updatedItems = element.all(by.repeater('item in items'));
      expect(updatedItems.count()).toEqual(this.count);
    });
});

});
