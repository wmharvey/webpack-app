describe('MyApp', function() {

  describe('Logging in', function() {

    it('should log a user in', function() {
      browser.get('/#/login');
      element(by.model('user.username')).sendKeys('whitney');
      element(by.model('user.password')).sendKeys('abc');
      $('#login-submit').click();
    });

  });

  describe('Overview page (modify capsules)', function() {

    describe('capsule thumbnails', function() {

      beforeAll( function() {
        $('#nav-capsule').click();
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
          browser.driver.sleep(2000);
          return element.all(by.repeater('capsule in capsules')).first().element(by.binding('capsule.description')).getText()
        })
        .then( function(text) {
          expect(text).toEqual('My test capsule+edit');
          done();
        });

      });
    });

  });

  describe('Detail page', function() {

    describe('clothing items', function() {

      beforeAll( function() {
        element.all(by.repeater('capsule in capsules')).first().element(by.binding('capsule.description')).click();
        browser.driver.sleep(2000);
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

        browser.driver.sleep(3000);

        var items = element.all(by.repeater('item in items'));

        expect(items.count()).toEqual(this.count + 1);
        expect(items.last().element(by.binding('item.description')).getText()).toEqual('jeans');

      });

      it('should delete an item', function() {
        var items = element.all(by.repeater('item in items'));
        items.last().$('.deleteButton').click();
        browser.driver.sleep(1000);
        var updatedItems = element.all(by.repeater('item in items'));
        expect(updatedItems.count()).toEqual(this.count);
      });
    });

  });

  describe('deleting the capsule', function() {

    beforeAll( function() {
      browser.get('/#/capsules');
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
