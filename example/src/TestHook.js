import React from 'react'
import { usePather } from 'react-pather'

function TestHook(){

    const pather = usePather();

    console.log(pather);
    console.log(pather.query.get('hello'));

    return (
        <>
            <span>
                Profile: {pather.profile}
                <br/>
                Test: {pather.test}
                <br/>
                With params: {pather.reverse(pather.v1, { id: '12345' })}
                <br />
                Current path: {pather.current}
                <br/>
                Current path: {pather.location.pathname}
                <br/>
                Query: {pather.query.toString()}
            </span>
        </>
    );
}

export default TestHook;