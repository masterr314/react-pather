const routes = {
    profile: {
        path: '/profile',
        sub: {
            test: {
                path: '/test',
                sub: {
                    v1: '/v1/:id',
                    v2: '/v2/:id',
                }
            }
        }
    }   
}

export default routes;