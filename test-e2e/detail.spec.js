describe('Detail page', function() {

  describe('clothing items', function() {
    var count;

    browser.get('/#/capsules/56c65d5f32df7a771ffecdc3');
    element.all(by.repeater('item in items')).count().then( cnt => {
      count = cnt;
    });

    it('should add an item', function() {
      element(by.model('new.url')).sendKeys('www.test.com');
      element(by.model('new.image')).sendKeys('www.testimage.com');
      element(by.model('new.description')).sendKeys('jeans');
      element(by.model('new.type')).$('[value="shoes"]').click();
      element.all(by.css('.rating-symbol')).first().click();

      element(by.css('.addButton')).click();

      var moreItems = element.all(by.repeater('item in items'));
      expect(moreItems.count()).toEqual(count + 1);
      expect(moreItems.last().element(by.binding('item.description')).getText()).toEqual('jeans');
    });

    it('should delete a capsule', function() {
      var items = element.all(by.repeater('item in items'));
      items.last().element(by.css('.deleteButton')).click();
      var updatedItems = element.all(by.repeater('item in items'));
      expect(updatedItems.count()).toEqual(count);
    });
});

});
