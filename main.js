require('rootpath')();
var Hapi = require('hapi');
var settings = require("plugins/settings");
var logger = require("plugins/logger");

var prepare = require("lib/prepare");

(function() {
	var server = new Hapi.Server();
	server.connection({ 
	    host: 'localhost', 
	    port: 8000 
	});

	var handleError = function (err) {
	    if (err) server.log(["error", "plugin"], err);
	}

	server.register({register: settings}, handleError);
	server.register({register: logger}, handleError);

	server.route({
	    method: 'GET',
	    path: '/',
	    handler: function (request, reply) {
	    	prepare(server);
	        reply('Hello!');
	    }
	});

	// Start the server
	server.start(function() {
	    server.app.log.info('Server running at:', server.info.uri, "with environment", server.settings.app.environment);
	    
	});

})();