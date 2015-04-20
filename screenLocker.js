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
					do script "' + terminalCreateLockFile + ';killall Terminal"\n\
				end tell\n\
				delay 0.5\n\
		    end if\n\
		    tell application "Terminal"\n\
					do script "' + lockscreenFilePath + ';killall Terminal"\n\
			end tell\n\
		end tell';

var screenUnlockScript =
		'tell application "Terminal"\n\
			do shell script "caffeinate -u -t 1 killall Terminal"\n\
			end tell\n\
			delay 0.5\n\
		tell application "System Events" to tell process "loginwindow"\n\
			activate\n\
			delay 0.2\n\
            tell window "Login Panel"\n\
                keystroke "'+ config.password +'"\n\
                keystroke return\n\
            end tell\n\
		end tell';

self.lockScreen = function() {
	applescript.execString(screenLockScript);
}

self.unlockScreen = function() {
	applescript.execString(screenUnlockScript);
}

module.exports = {
	lockScreen : self.lockScreen,
	unlockScreen: self.unlockScreen
};
