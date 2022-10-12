import React from 'react'
import styles from './styles.module.css'
import withPather from './core/with-pather';
import Pather from './core/pather';
import { PatherProvider} from './core/pather-context';

export {
  Pather,
  withPather,
  PatherProvider,
}

// export const ExampleComponent = ({ text }) => {
//   return <div className={styles.test}>Example Component: {text}</div>
// }
