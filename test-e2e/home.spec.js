describe('MyApp', function() {

  it('should default to view1', function() {
    browser.get('/');
    expect( browser.getLocationAbsUrl() ).toMatch("/view1");
  });

  describe('view1', function() {
    it('should display a message when you click a button', function() {
      element(by.css('#cityButton')).click();
      expect(element(by.css('.greeting')).getText()).toEqual('Hello you from Portland!');
    });
  });

});
