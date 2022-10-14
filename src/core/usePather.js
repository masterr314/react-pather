import { useContext } from 'react';
import withPather from './with-pather';
import PatherContext from './pather-context';


const usePather = () => {

    const pather = useContext(PatherContext);

    pather.fill();

    return pather;
}

export default usePather;