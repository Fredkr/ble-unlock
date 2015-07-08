# Ble-unlock

##What?
Ble-unlock is an app to lock and unlock your Mac using a BLE (Bluetooth low energy) device.
You can use the app I built for iOS, not yet on the app store but source found [HERE](https://github.com/Fredkr/ble-unlock-ios)

OR, you can use any type of BLE device.

The app supports two types of lock/unlock mechanisms. Either you can lock/unlock manually, or you can let the app do all the work and lock your computer as soon as the BLE device gets to far away. Similarly it will unlock the computer again once it gets close enough.

##How?
note: this assumes you have node installed.

###Start it
1. Download or clone the repository.
2. in a terminal Change directory to ble-unlock/scanner
3. run npm install
4. run npm start - the app is now running

###Set it up
1. Go to localhost:3001 in any browser.
2. Set up your password to your computer.
3. Start scanning for a BLE device you want to use. (Make sure Bluetooth is not disabled on your computer). Once found give it a name.
4. Optionally you can manually save a device by entering its UUID.
5. You are all set, you can now turn the service on.

##Disclaimer
All data (password/device info) used by this app is stored in a file in plain text. However, this data is only used by your computer locally. No data of any kind will be broadcasted over bluetooth or outside your local network.
