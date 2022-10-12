import React from 'react'
import { withPather } from 'react-pather'

function Router({ pather }){
    return (
        <>
            <span>
                Profile: {pather.profile}
                <br/>
                Test: {pather.test}
                <br/>
                With params: {pather.reverse(pather.v1, { id: '12345' })}
            </span>
        </>
    );
}

export default withPather()(Router);