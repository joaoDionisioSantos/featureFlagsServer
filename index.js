'use strict';

const unleash = require('unleash-server');

const myCustomAuth = require('./auth-hook');

unleash
    .start({
        databaseUrl: 'postgres://postgres:unleash@db/postgres',
        adminAuthentication: 'custom',
        enableLegacyRoutes: false,
        preRouterHook: myCustomAuth,
    })
    .then(unleash => {
        console.log(
            `Unleash started on http://localhost:${unleash.app.get('port')}`,
        );
    });
