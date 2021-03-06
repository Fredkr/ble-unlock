'use strict';
var applescript = require( 'applescript' ),
    settings = require( './settings' ),
    logger = require('./logger');

var lockscreenFilePath = __dirname + '/lockscreen';
var terminalCreateLockFile = 'clang -framework Foundation '
							+ lockscreenFilePath
							+ '.m -o ' + lockscreenFilePath;

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

var screenUnlockScript = function(password){
    return 'tell application "Terminal"\n\
                do shell script "caffeinate -u -t 0.1 killall Terminal"\n\
            end tell\n\
            tell application "System Events"\n\
                keystroke "' + password + '"\n\
                keystroke return\n\
            end tell';
};


function screenIsActive(callback){
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

function lockScreen() {
    applescript.execString(screenLockScript, function(err) {
        if(err)
            logger.error(err);
    });
}

function unlockScreen() {
    settings.getByType('password', function(password){
        applescript.execString(screenUnlockScript(password.data), function(err) {
            if(err){
                logger.error(err);
            }
        });
    });

}

module.exports = {
    screenIsActive: screenIsActive,
    lockScreen : lockScreen,
    unlockScreen: unlockScreen
};
