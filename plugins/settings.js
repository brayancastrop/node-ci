'use strict';
require('rootpath')();
var fs = require("fs");
var _ = require('lodash');

exports.register = function (server, options, next) {
    var environment = process.env.NODE_ENV;
    var defaultConfig, environmentConfig, config;

    defaultConfig = require('config/environments/default.json');

    if (!environment) environment = 'development';

    if (fs.existsSync('../config/environments/' + environment + '.json')) {
        environmentConfig = require('config/environment/' + environment + '.json');
        config = _.merge(defaultConfig, environmentConfig);
    } else {
        console.log(["error", "environment"], 'environment "' + environment + '" not found');
        environment = "default";
        config = defaultConfig;
    }
    config.environment = environment;
    server.settings.app = config;
    next();
}

exports.register.attributes = {
    name: 'settings',
    version: '0.0.1'
};