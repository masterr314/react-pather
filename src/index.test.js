import Pather from "./core/pather"
import { frontRoutes, backRoutes } from "../example/src/routes";

const frontPatherData = {
  profile: "/profile",
  test: "/profile/test",
  v1: "/profile/test/v1/:id",
  v2: "/profile/test/v2/:id",
  settings: "/settings",
  view: "/view",
  product: "/view/product/:id",
  user: "/view/user/:id"
}

const backPatherData = {
  api: "/api/v1",
  product: "/api/v1/product",
  Product: {
      code: "/api/v1/product/:code",
      deactivate: "/api/v1/product/:code/deactivate",
      addToCart: "/api/v1/product/:code/add-to-cart"
  },
  account: "/api/v1/account",
  Account: {
      settings: "/api/v1/account/settings",
      Settings: {
          "general": "/api/v1/account/settings/general",
          "statistics": "/api/v1/account/settings/statistics"
      }
  }
}

describe('Test Pather', () => {
  it('front routes', () => {
    const pather = new Pather(frontRoutes, backRoutes);
    expect(pather.front.profile).toBe(frontPatherData.profile);
    expect(pather.reverse(pather.front.v1, { id: '12345' })).toBe(pather.reverse(frontPatherData.v1, { id: '12345' }));
    expect(pather.front.test).toBe(frontPatherData.test);
  }),
  it('back routes', () => {
    const pather = new Pather(frontRoutes, backRoutes);
    expect(pather.back.product).toBe(backPatherData.product);
    expect(pather.back.Product.code).toBe(backPatherData.Product.code);
    expect(pather.back.Product.deactivate).toBe(backPatherData.Product.deactivate);
    expect(pather.back.Product.addToCart).toBe(backPatherData.Product.addToCart);
    expect(pather.back.account).toBe(backPatherData.account);
    expect(pather.back.Account.settings).toBe(backPatherData.Account.settings);
    expect(pather.back.Account.Settings.general).toBe(backPatherData.Account.Settings.general);
    expect(pather.back.Account.Settings.statistics).toBe(backPatherData.Account.Settings.statistics);
  }),
  it('interpolation', () => {
    const pather = new Pather(frontRoutes, backRoutes);
    
    expect(pather.reverse(
      pather.back.Product.deactivate, 
      { code: 'jj33f' }
    )).toBe('/api/v1/product/jj33f/deactivate');
    
    const _url = 'http://120.0.0.0.1:5000' + pather.back.Product.deactivate
    
    expect(pather.reverse(
      _url + '/:age/:resource/my_super-data:_d:Name/:1d', 
      {code: '122gt', age: 12, resource: 1335, _d: 12, Name: 'Tom', '1d': 123 }
    ))
    .toBe('http://120.0.0.0.1:5000/api/v1/product/122gt/deactivate/12/1335/my_super-data12Tom/:1d');

    expect(pather.reverse(
      _url + '/my_super-data:age-user-acc:name.:resource-created', 
      {code: '122gt', age: 12, resource: 1335, name: 'Tom'}
    ))
    .toBe('http://120.0.0.0.1:5000/api/v1/product/122gt/deactivate/my_super-data12-user-accTom.1335-created');

    expect(pather.reverse(
      _url + '/my_super-data:age-user-acc:name.:resource-created', 
      {code: '122gt', age: 12, resource: 1335, name: 'Tom', Name: 'Jack'}
    ))
    .toBe('http://120.0.0.0.1:5000/api/v1/product/122gt/deactivate/my_super-data12-user-accTom.1335-created');

    expect(pather.reverse(
      _url + '/my_super-data:age-user-acc:name.:resource-created', 
      {code: '122gt', age: 12, resource: 1335, Name: 'Jack'}
    ))
    .toBe('http://120.0.0.0.1:5000/api/v1/product/122gt/deactivate/my_super-data12-user-acc:name.1335-created');

    expect(pather.reverse(
      _url + '/my_super-data:age-user-acc:Name.:resource-created', 
      {code: '122gt', age: 12, resource: 1335, name: 'Tom', Name: 'Jack'}
    ))
    .toBe('http://120.0.0.0.1:5000/api/v1/product/122gt/deactivate/my_super-data12-user-accJack.1335-created');
  }),
  it('is URL valid', () => {
    const pather = new Pather(frontRoutes, backRoutes);

    expect(pather.isURLValid('https://testsite.com')).toBe(true);
    expect(pather.isURLValid('app://testsite.com')).toBe(true);
    expect(pather.isURLValid('Test String')).toBe(false);

    expect(pather.isURLValid('https://testsite.com', true)).toBe(true);
    expect(pather.isURLValid('app://testsite.com', true)).toBe(false);
    expect(pather.isURLValid('Test String', true)).toBe(false);
  })
})