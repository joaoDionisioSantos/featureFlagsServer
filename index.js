'use strict';

const unleash = require('unleash-server');

const myCustomAdminAuth = require('./auth-hook');

/* default
let options = {};

unleash.start(options);
*/

console.log("mister");

unleash
    .start({
        databaseUrl: 'postgres://postgres:unleash@db/postgres',
        adminAuthentication: 'custom',
        enableLegacyRoutes: false,
        enableRequestLogger: true,
        preRouterHook: myCustomAdminAuth,
    })
    .then(unleash => {
        console.log(
            `Unleash started on http://localhost:${unleash.app.get('port')}`,
        );
    });
