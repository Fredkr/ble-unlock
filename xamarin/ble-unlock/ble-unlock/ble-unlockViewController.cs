using System;
using System.Drawing;

using Foundation;
using UIKit;

namespace bleunlock
{
	public partial class ble_unlockViewController : UIViewController
	{
		public ble_unlockViewController (IntPtr handle) : base (handle)
		{
		}

		public override void DidReceiveMemoryWarning ()
		{
			base.DidReceiveMemoryWarning ();
		}

		#region View lifecycle

		public override void ViewDidLoad ()
		{
			base.ViewDidLoad ();
			var transmitter = new bleunlock.BeaconTransmitter();

			UnlockButton.TouchDown += (sender, ea) => transmitter.TransmittUnlock ();

			UnlockButton.TouchUpInside += (sender, ea) => transmitter.StopTransmitting ();

			LockButton.TouchDown += (sender, ea) => transmitter.TransmittLock ();

			LockButton.TouchUpInside += (sender, ea) => transmitter.StopTransmitting ();
		}

		public override void ViewWillAppear (bool animated)
		{
			base.ViewWillAppear (animated);
		}

		public override void ViewDidAppear (bool animated)
		{
			base.ViewDidAppear (animated);
		}

		public override void ViewWillDisappear (bool animated)
		{
			base.ViewWillDisappear (animated);
		}

		public override void ViewDidDisappear (bool animated)
		{
			base.ViewDidDisappear (animated);
		}

		#endregion
	}
}

