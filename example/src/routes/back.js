// Back Routes Map

// Route names must be unique and start with /
const backRoutes = {
    api: {
        path: '/api/v1',
        sub: {
            product: {
                path: '/product',
                isSection: true,
                sub: {
                    code: {
                        path: '/:code',
                        sub: {
                            deactivate: '/deactivate',
                            addToCart: '/add-to-cart',
                        }
                    }
                }
            },
            account: {
                path: '/account',
                isSection: true,
                sub: {
                    settings: {
                        path: '/settings',
                        isSection: true,
                        sub: {
                            general: '/general',
                            statistics: '/statistics'
                        }
                    }
                }
            }
        }
    }
}

// Name of the section is the same as name of the appropriate path only with a title case (product -> Product)

export default backRoutes;