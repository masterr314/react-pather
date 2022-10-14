# react-pather

> Package for working with named routes in React

[![NPM](https://img.shields.io/npm/v/react-pather.svg)](https://www.npmjs.com/package/react-pather) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save react-pather
```

## Usage

routes.js
```jsx
// Route names must be unique and start with /
const routes = {
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
    login: '/login',   
}

export default routes;
```

App.js
```jsx
import React from 'react'
import Router from './Router';
import { PatherProvider, Pather } from 'react-pather'
import routes from './routes';

const pather = new Pather(routes);

const App = () => {
  return (
    <PatherProvider value={pather}>
      <Router />
    </PatherProvider>
  );
}

export default App
```

# Use via hoc

Router.js
```jsx
import React from 'react'
import { withPather } from 'react-pather'

function Router({ pather }){
    return (
        <>
            <span>
                Profile: {pather.profile}
                <br/>
                Test: {pather.login}
                <br/>
                With params: {pather.reverse(pather.v1, { id: '12345' })}
                <br/>
                Current path: {pather.current}
                <br/>
                Location info: {pather.location}
                <br/>
                Query: {pather.query.toString()}
            </span>
        </>
    );
}

export default withPather()(Router);
```

# Use via React hook

Router.js
```jsx
import React from 'react'
import { usePather } from 'react-pather'

function Router(){

    const pather = usePather();

    return (
        <>
            <span>
                Profile: {pather.profile}
                <br/>
                Test: {pather.login}
                <br/>
                With params: {pather.reverse(pather.v1, { id: '12345' })}
                <br/>
                Current path: {pather.current}
                <br/>
                Location info: {pather.location}
                <br/>
                Query: {pather.query.toString()}
            </span>
        </>
    );
}

export default Router;
```

## License

MIT © [masterr314](https://github.com/masterr314)
