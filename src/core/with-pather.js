import React from 'react';
import { PatherConsumer } from './pather-context';

const withPather = () => (Wrapped) => {
    return (props) => {
        return (
            <PatherConsumer>
                {(pather) => {
                    pather.fill();
                    return (
                        <Wrapped {...props} pather={pather} />
                    )
                }}
            </PatherConsumer>
        )
    }
}

export default withPather;