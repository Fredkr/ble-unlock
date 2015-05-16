using System;
using System.Drawing;

using Foundation;
using UIKit;

namespace bleunlock
{
	public partial class BleViewController : UIViewController
	{
		public BleViewController (IntPtr handle) : base (handle)
		{
		}

		public override void ViewDidLoad ()
		{
			base.ViewDidLoad ();
			LockButton.SetImage (UIImage.FromFile ("Icons/lock_button_highlited_256.png"), UIControlState.Highlighted);
			UnlockButton.SetImage (UIImage.FromFile ("Icons/unlock_button_highlited_256.png"), UIControlState.Highlighted);

			var transmitter = new bleunlock.BeaconTransmitter();

			UnlockButton.TouchDown += (sender, ea) => transmitter.TransmittUnlock ();

			UnlockButton.TouchUpInside += (sender, ea) => transmitter.StopTransmitting ();

			LockButton.TouchDown += (sender, ea) => transmitter.TransmittLock ();

			LockButton.TouchUpInside += (sender, ea) => transmitter.StopTransmitting ();
		}
	}
}

