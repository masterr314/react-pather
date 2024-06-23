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
  })
})
