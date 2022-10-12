import React from 'react'
import 'react-pather/dist/index.css'
import Router from './Router';
import { PatherProvider, Pather } from 'react-pather'
import routes from './routes'

const pather = new Pather(routes);

const App = () => {
  return (
    <PatherProvider value={pather}>
      <Router />
    </PatherProvider>
  );
}

export default App
