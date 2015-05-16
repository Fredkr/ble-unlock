using System;
using UIKit;
using Foundation;

namespace bleunlock
{
	public partial class SettingsLockViewController : UIViewController
	{
		private const string LockUUIDKey = "LockUUIDKey";

		public SettingsLockViewController (IntPtr handle) : base (handle)
		{
		}
			
		public override void ViewDidLoad ()
		{
			base.ViewDidLoad ();
			UpdateTextFields ();

			SettingsLockUUIDButton.TouchDown += (sender, ea) => {
				Settings.GenerateNewLockUUID ();
				UpdateTextFields ();
			};
			
		}
		private void UpdateTextFields()
		{
			var lockUUID = NSUserDefaults.StandardUserDefaults.StringForKey (LockUUIDKey);
			if (lockUUID != null)
				SettingsLockUUIDText.Text = lockUUID;
		}
	}
}

