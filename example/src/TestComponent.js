import React from 'react';

const TestComponent = ({ pather }) => {
    return (
        <span>
            Profile: {pather.front.profile}
            <br/>
            Test: {pather.front.test}
            <br/>
            Product: {pather.back.product}
            <br/>
            Product Code: {pather.back.Product.code}
            <br/>
            Product Deactivate: {pather.back.Product.deactivate}
            <br/>
            Product Add to Cart: {pather.back.Product.addToCart}
            <br/>
            Account: {pather.back.account}
            <br/>
            Account Settings: {pather.back.Account.settings}
            <br/>
            Account Settings General: {pather.back.Account.Settings.general}
            <br/>
            Account Settings Statistics: {pather.back.Account.Settings.statistics}
            <br/>
            With params: {pather.reverse(pather.front.v1, { id: '12345' })}
            <br />
            Current path: {pather.current}
            <br/>
            Current path: {pather.location.pathname}
            <br/>
            Query: {pather.query.toString()}
        </span>
    );
}

export default TestComponent;