// WARNING
//
// This file has been generated automatically by Xamarin Studio from the outlets and
// actions declared in your storyboard file.
// Manual changes to this file will not be maintained.
//
using Foundation;
using System;
using System.CodeDom.Compiler;
using UIKit;

namespace bleunlock
{
	[Register ("SettingsUnlockViewController")]
	partial class SettingsUnlockViewController
	{
		[Outlet]
		[GeneratedCode ("iOS Designer", "1.0")]
		UIButton SettingsUnlockUUIDButton { get; set; }

		[Outlet]
		[GeneratedCode ("iOS Designer", "1.0")]
		UITextField SettingsUnlockUUIDText { get; set; }

		void ReleaseDesignerOutlets ()
		{
			if (SettingsUnlockUUIDButton != null) {
				SettingsUnlockUUIDButton.Dispose ();
				SettingsUnlockUUIDButton = null;
			}
			if (SettingsUnlockUUIDText != null) {
				SettingsUnlockUUIDText.Dispose ();
				SettingsUnlockUUIDText = null;
			}
		}
	}
}
