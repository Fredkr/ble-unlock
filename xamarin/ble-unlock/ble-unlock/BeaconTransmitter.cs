using Foundation;
using CoreBluetooth;
using CoreLocation;
using CoreFoundation;

namespace bleunlock
{
	public class BeaconTransmitter
	{
		private static readonly string unlockUUID = "a82e33d9-b9ba-4dc6-b1f1-fd2060922787";
		private static readonly string unlockId = "Unlock";
		private static readonly string lockUUID = "389ae052-210b-4cc8-a5d2-d6e9236e50bd";
		private static readonly string lockId = "lock";
		private CLBeaconRegion unlockRegion;
		private CLBeaconRegion lockRegion;
		private readonly CBPeripheralManager peripheralManager;

		public BeaconTransmitter()
		{
			unlockRegion = new CLBeaconRegion (new NSUuid (unlockUUID), unlockId);
			lockRegion = new CLBeaconRegion (new NSUuid (lockUUID), lockId);
			peripheralManager = new CBPeripheralManager (new BTPeripheralDelegate (), DispatchQueue.DefaultGlobalQueue);
		}

		public void TransmittUnlock()
		{
			StartTransmitting (unlockRegion);
		}

		public void TransmittLock()
		{
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

