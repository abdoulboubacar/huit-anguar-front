import { HuitFrontPage } from './app.po';

describe('huit-front App', function() {
  let page: HuitFrontPage;

  beforeEach(() => {
    page = new HuitFrontPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
