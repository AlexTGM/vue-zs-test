const routes = [{
    path: '/',
    name: 'Table',
    component: () => import('./views'),
    meta: {
        requires_auth: true
    }
}];

export default routes