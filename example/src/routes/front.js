// Front Routes Map

// Route names must be unique and start with /
const frontRoutes = {
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
    },
    settings: '/settings',
    view: {
        path: '/view',
        sub: {
            product: '/product/:id',
            user: '/user/:id',
        }
    }
}

export default frontRoutes;