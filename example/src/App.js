import React from 'react'
import 'react-pather/dist/index.css'
import TestHOC from './TestHOC';
import TestHook from './TestHook';
import { PatherProvider, Pather } from 'react-pather';
import { frontRoutes, backRoutes } from './routes';

const pather = new Pather(frontRoutes, backRoutes);

const App = () => {
  return (
    <PatherProvider value={pather}>
      {/* <TestHOC /> */}
      <TestHook />
    </PatherProvider>
  );
}

export default App
