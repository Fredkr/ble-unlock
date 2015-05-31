var applescript = require( 'applescript' ),
	config = require( './config' ),
	logger = require('./logger'),
	util = require('util');

var self = this;
var lockscreenFilePath =  __dirname + '/lockscreen';
var terminalCreateLockFile = "clang -framework Foundation " + lockscreenFilePath + ".m -o " + lockscreenFilePath;

var screenAwakeStateScript = 
		'return do shell script "ioreg -n IODisplayWrangler |grep -i IOPowerManagement"';

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
			do shell script "caffeinate -u -t 0.1 killall Terminal"\n\
		end tell\n\
		tell application "System Events"\n\
            keystroke "'+ config.password +'"\n\
            keystroke return\n\
		end tell';

self.screenIsActive = function(callback){
	applescript.execString(screenAwakeStateScript, function(err, rtn) {
		if (err) {
			logger.error(err);
		}
		if(rtn === undefined || rtn.indexOf('"DevicePowerState"=4') !== -1){
			callback(true);
		}else if(rtn === undefined || rtn.indexOf('"DevicePowerState"=1') !== -1){
			callback(false);
		}
	});
}

self.lockScreen = function() {
	applescript.execString(screenLockScript, function(err, rtn) {
		if(err)
			logger.error(err);
	});
}

self.unlockScreen = function() {
	applescript.execString(screenUnlockScript, function(err, rtn) {
		if(err)
			logger.error(err);
	});
}

module.exports = {
	screenIsActive: self.screenIsActive,
	lockScreen : self.lockScreen,
	unlockScreen: self.unlockScreen
};
