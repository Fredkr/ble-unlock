using System;
using UIKit;
using Foundation;

namespace bleunlock
{
	public partial class SettingsUnlockViewController : UIViewController
	{
		private const string UnlockUUIDKey = "UnlockUUIDKey";

		public SettingsUnlockViewController (IntPtr handle) : base (handle)
		{
		}
			
		public override void ViewDidLoad ()
		{
			base.ViewDidLoad ();
			UpdateTextFields ();

			SettingsUnlockUUIDButton.TouchDown += (sender, ea) => {
				Settings.GenerateNewUnlockUUID ();
				UpdateTextFields ();
			};
		}

		private void UpdateTextFields()
		{
			var unlockUUID = NSUserDefaults.StandardUserDefaults.StringForKey (UnlockUUIDKey);
			if (unlockUUID != null)
				SettingsUnlockUUIDText.Text = unlockUUID;
		}
	}
}

