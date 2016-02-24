describe('MyApp', function() {

  var capsuleElement;

  describe('Overview page (modify capsules)', function() {

    describe('capsule thumbnails', function() {

      beforeAll( function() {
        browser.get('/');
        element.all(by.repeater('capsule in capsules')).count().then( (count) => {
          this.count = count;
        });
      });

      it('should add a capsule', function() {
        element.all(by.model('form.season')).first().click();
        element(by.model('form.description')).sendKeys('My test capsule');
        $('.addButton').click();

        var capsules = element.all(by.repeater('capsule in capsules'));

        capsules.count()
        .then( count => {
          expect(count).toEqual(this.count + 1);
          return capsules.first().element(by.binding('capsule.description'));
        })
        .then( function(first) {
          capsuleElement = first;
          expect(first.getText()).toEqual('My test capsule');
        });

      });

    });

  });

  describe('Detail page', function() {

    describe('clothing items', function() {

      beforeAll( function() {
        capsuleElement.click();
        element.all(by.repeater('item in items')).count().then( count => {
          this.count = count;
        });
      });

      it('should add an item', function() {
        element(by.model('new.url')).sendKeys('www.test.com');
        element(by.model('new.image')).sendKeys('www.testimage.com');
        element(by.model('new.description')).sendKeys('jeans');
        element(by.model('new.type')).$('[value="shoes"]').click();
        $$('.rating-symbol').last().click();

        $('.addButton').click();

        var items = element.all(by.repeater('item in items'));

        expect(items.count()).toEqual(this.count + 1);
        expect(items.last().element(by.binding('item.description')).getText()).toEqual('jeans');

      });

      it('should delete an item', function() {
        var items = element.all(by.repeater('item in items'));
        items.last().$('.deleteButton').click();
        var updatedItems = element.all(by.repeater('item in items'));
        expect(updatedItems.count()).toEqual(this.count);
      });
    });

  });

  describe('deleting the capsule', function() {

    beforeAll( function() {
      browser.get('/');
    });

    it('should delete a capsule', function() {
        var capsules = element.all(by.repeater('capsule in capsules'));
        var initialCount;

        capsules.count()
        .then( function(count) {
          initialCount = count;
          return capsules.first().$('.deleteButton').click();
        })
        .then( () => {
          return element.all(by.repeater('capsule in capsules')).count();
        })
        .then( endCount => {
          expect( endCount ).toEqual(initialCount - 1);
        });
      });
  });

})
