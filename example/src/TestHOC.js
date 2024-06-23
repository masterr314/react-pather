import React from 'react';
import { withPather } from 'react-pather';
import TestComponent from './TestComponent';

function TestHOC({ pather }){

    console.log(pather);
    console.log(pather.query.get('hello'));

    return (
        <TestComponent pather={pather} />
    );
}

export default withPather()(TestHOC);