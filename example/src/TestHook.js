import React from 'react';
import { usePather } from 'react-pather';
import TestComponent from './TestComponent';

function TestHook(){

    const pather = usePather();

    console.log(pather);
    console.log(pather.query.get('hello'));

    return (
        <TestComponent pather={pather} />
    );
}

export default TestHook;