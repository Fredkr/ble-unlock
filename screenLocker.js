var applescript = require( 'applescript' ),
	config = require( './config' ),
	path = require('path');

var self = this;
var lockscreenFilePath =  __dirname + '/lockscreen';
var terminalCreateLockFile = "clang -framework Foundation " + lockscreenFilePath + ".m -o " + lockscreenFilePath;

var screenLockScript =
		'tell application "Finder"\n\
			set fileName to POSIX file "' + lockscreenFilePath + '" as Unicode text\n\
		    if exists fileName then\n\
		    else\n\
		    	tell application "Terminal"\n\
					do script "' + terminalCreateLockFile + '"\n\
				end tell\n\
				delay 0.5\n\
		    end if\n\
		    tell application "Terminal"\n\
					do script "' + lockscreenFilePath + '"\n\
			end tell\n\
		end tell';

self.lockScreen = function() {
	applescript.execString(screenLockScript);
}

module.exports = {
	lockScreen : self.lockScreen
};
