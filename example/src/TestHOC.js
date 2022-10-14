import React from 'react'
import { withPather } from 'react-pather'

function TestHOC({ pather }){

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

export default withPather()(TestHOC);