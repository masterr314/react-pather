# react-pather

> Package for managing named routes in React projects.

[![NPM](https://img.shields.io/npm/v/react-pather.svg)](https://www.npmjs.com/package/react-pather) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save react-pather
```

## Usage

Define two route maps. One for front routes, another one for back routes. Every route name must be unique and can not be equall to reserved words **path**, **sub** or **isSection**.

routes.js
```jsx
// Route names must be unique and start with /
const frontRoutes = {
    profile: {
        path: '/profile',
        sub: {
            test: {
                path: '/test',
                sub: {
                    v1: '/v1/:id',
                    v2: '/v2/:id',
                }
            }
        }
    },
    view: {
        path: '/view',
        sub: {
            product: '/product/:id',
            user: '/user/:id',
        }
    },
    settings: '/settings'
}

const backRoutes = {
    api: {
        path: '/api/v1',
        sub: {
            product: {
                path: '/product',
                isSection: true,
                sub: {
                    code: {
                        path: '/:code',
                        sub: {
                            deactivate: '/deactivate',
                            addToCart: '/add-to-cart',
                        }
                    }
                }
            },
            account: {
                path: '/account',
                isSection: true,
                sub: {
                    settings: {
                        path: '/settings',
                        isSection: true,
                        sub: {
                            general: '/general',
                            statistics: '/statistics'
                        }
                    }
                }
            }
        }
    }
}

export {
    frontRoutes,
    backRoutes,
};
```

Create **Pather** object and pass to the construstor two parameters. The first one is a Front Route Map (FRM) and the second one is a Back Route Map (BRM). Pass **Pather** object as a value to a **PatherProvider**.

App.js
```jsx
import React from 'react'
import Router from './Router';
import { PatherProvider, Pather } from 'react-pather'
import { frontRoutes, backRoutes } from './routes';

const pather = new Pather(frontRoutes, backRoutes);

const App = () => {
  return (
    <PatherProvider value={pather}>
      <Router />
    </PatherProvider>
  );
}

export default App
```

# Usage

There are two ways to access **Pather** object in a component tree using: 

* **usePather** hook
* **withPather** HOC component 

Each of them gives the same functionality, so choose which one is preferable for you.
All front routes are accessible via **front** field of the **Pather** object, while all back routes can be taken through the **back** field.

## Use via HOC

Router.js
```jsx
import React from 'react'
import { withPather } from 'react-pather'

function Router({ pather }){
    return (
        <span>
            Profile: {pather.front.profile} <br/>
            Test: {pather.front.test} <br/>
            Product: {pather.back.product} <br/>
            Product Code: {pather.back.Product.code} <br/>
            Product Deactivate: {pather.back.Product.deactivate} <br/>
            Product Add to Cart: {pather.back.Product.addToCart} <br/>
            Account: {pather.back.account} <br/>
            Account Settings: {pather.back.Account.settings} <br/>
            Account Settings General: {pather.back.Account.Settings.general} <br/>
            Account Settings Statistics: {pather.back.Account.Settings.statistics} <br/>
            With params: {pather.reverse(pather.front.v1, { id: '12345' })} <br/>
            Current path: {pather.current} <br/>
            Current path: {pather.location.pathname} <br/>
            Query: {pather.query.toString()}
        </span>
    );
}

export default withPather()(Router);
```

## Use via React hook

Router.js
```jsx
import React from 'react'
import { usePather } from 'react-pather'

function Router(){

    const pather = usePather();

    return (
        <span>
            Profile: {pather.front.profile} <br/>
            Test: {pather.front.test} <br/>
            Product: {pather.back.product} <br/>
            Product Code: {pather.back.Product.code} <br/>
            Product Deactivate: {pather.back.Product.deactivate} <br/>
            Product Add to Cart: {pather.back.Product.addToCart} <br/>
            Account: {pather.back.account} <br/>
            Account Settings: {pather.back.Account.settings} <br/>
            Account Settings General: {pather.back.Account.Settings.general} <br/>
            Account Settings Statistics: {pather.back.Account.Settings.statistics} <br/>
            With params: {pather.reverse(pather.front.v1, { id: '12345' })} <br/>
            Current path: {pather.current} <br/>
            Current path: {pather.location.pathname} <br/>
            Query: {pather.query.toString()}
        </span>
    );
}

export default Router;
```

## License

MIT © [masterr314](https://github.com/masterr314)