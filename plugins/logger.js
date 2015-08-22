'use strict';

var bunyan = require('bunyan');
var bsyslog = require('bunyan-syslog');

exports.register = function (server, options, next) {
    var log;
    switch (server.settings.app.environment) {
        case "development":
            log = bunyan.createLogger({
                name: server.settings.app.name,
                stream: process.stdout,
                level: (process.env.LOG_LEVEL || 'info')
            });
            break;
        default:
            var bsyslogConfig = server.settings.app.bsyslog;
            log = bunyan.createLogger({
                name: server.settings.app.name,
                streams: [
                    {
                        name: server.settings.app.name,
                        stream: process.stdout,
                        level: (process.env.LOG_LEVEL || 'debug')
                    },
                    {
                        level: 'info',
                        type: 'raw',
                        stream: bsyslog.createBunyanStream({
                            type:       bsyslogConfig.type,
                            name:       bsyslogConfig.name,
                            facility:   bsyslogConfig.facility,
                            host:       bsyslogConfig.host,
                            port:       bsyslogConfig.port
                        })
                    }
                ]
            });
    }
    server.app.log = log;
    next();
}

exports.register.attributes = {
    name: 'logger',
    version: '0.0.1'
};