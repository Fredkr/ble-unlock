using Foundation;
using CoreBluetooth;
using CoreLocation;
using CoreFoundation;
using System;

namespace bleunlock
{
	public class BeaconTransmitter
	{
		private static readonly string unlockId = "Unlock";
		private static readonly string lockId = "lock";
		private CLBeaconRegion unlockRegion;
		private CLBeaconRegion lockRegion;
		private readonly CBPeripheralManager peripheralManager;

		public BeaconTransmitter()
		{
			peripheralManager = new CBPeripheralManager (new BTPeripheralDelegate (), DispatchQueue.DefaultGlobalQueue);
		}

		public void TransmittUnlock()
		{
			unlockRegion = new CLBeaconRegion (new NSUuid (Settings.UnlockUUID), unlockId);
			StartTransmitting (unlockRegion);
		}

		public void TransmittLock()
		{
			lockRegion = new CLBeaconRegion (new NSUuid (Settings.LockUUID), lockId);
			StartTransmitting (lockRegion);
		}

		public void StopTransmitting()
		{                
			peripheralManager.StopAdvertising ();
		}

		private void StartTransmitting(CLBeaconRegion beaconRegion)
		{                
			var power = new NSNumber (-59);
			var peripheralData = beaconRegion.GetPeripheralData (power);
			peripheralManager.StartAdvertising (peripheralData);
		}
	}

	class BTPeripheralDelegate : CBPeripheralManagerDelegate
	{
		public override void StateUpdated (CBPeripheralManager peripheral)
		{
		}
	}
}

