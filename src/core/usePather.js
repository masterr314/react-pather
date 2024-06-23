import { useContext } from 'react';
import PatherContext from './pather-context';

const usePather = () => {

    const pather = useContext(PatherContext);

    pather.fill();

    return pather;
}

export default usePather;