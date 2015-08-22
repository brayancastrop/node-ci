require('rootpath')();
var git = require('nodegit');

module.exports = function(server) {
	var log = server.app.log;
	var sshUrl = "git@github.com:selfietheapp/selfie-api.git", tempPath = "repositories";

	var opts = {
        remoteCallbacks: {
            certificateCheck: function() {
                return 1;
            },
            credentials: function(url, userName) {
                return git.Cred.sshKeyFromAgent(userName);
            }
        }
    };

    // Clone a given repository into a specific folder.
    log.info("clonning repository", sshUrl, "to", tempPath);
    git.Clone(sshUrl, tempPath, opts).then(function(repo){
        log.info("repository successfully cloned");
    }).catch(function (error) {
        log.error("Failed to clone repository", sshUrl, error);
    });
}