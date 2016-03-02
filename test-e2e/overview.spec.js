describe('MyApp', function() {

  describe('Overview page (modify capsules)', function() {

    describe('capsule thumbnails', function() {

      beforeAll( function() {
        browser.get('/');
        element.all(by.repeater('capsule in capsules')).count().then( (count) => {
          this.count = count;
        });
      });

      it('should add a capsule', function() {
        element.all(by.model('capsule.season')).first().click();
        element(by.model('capsule.description')).sendKeys('My test capsule');
        $('.addButton').click();

        var capsules = element.all(by.repeater('capsule in capsules'));

        capsules.count()
        .then( count => {
          expect(count).toEqual(this.count + 1);
          return capsules.first().element(by.binding('capsule.description'));
        })
        .then( function(first) {
          expect(first.getText()).toEqual('My test capsule');
        });

      });

    });

    describe('capsule edit form', function() {
      it('should edit a capsule', function(done) {
        $$('.editButton').first().click()
        .then(function() {
          return element.all(by.model('editCapsule.season')).first().click();
        })
        .then(function() {
          return element(by.model('editCapsule.description')).sendKeys('+edit');
        })
        .then(function() {
          return $('.editFormButton').click();
        })
        .then(function() {
          return element.all(by.repeater('capsule in capsules')).first().element(by.binding('capsule.description')).getText()
        })
        .then( function(text) {
          // expect(text).toEqual('My test capsule+edit');
          done();
        });

      });
    });

  });

  describe('Detail page', function() {

    describe('clothing items', function() {

      beforeAll( function(done) {
        browser.pause();
        element.all(by.repeater('capsule in capsules')).first().element(by.binding('capsule.description')).click();
        element.all(by.repeater('item in items')).count().then( count => {
          this.count = count;
        });
      });

      it('should add an item', function() {
        element(by.model('new.url')).sendKeys('http://test.com');
        element(by.model('new.image')).sendKeys('http://testimage.jpg');
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
