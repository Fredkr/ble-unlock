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
	[Register ("SettingsLockViewController")]
	partial class SettingsLockViewController
	{
		[Outlet]
		[GeneratedCode ("iOS Designer", "1.0")]
		UIButton SettingsLockUUIDButton { get; set; }

		[Outlet]
		[GeneratedCode ("iOS Designer", "1.0")]
		UITextField SettingsLockUUIDText { get; set; }

		void ReleaseDesignerOutlets ()
		{
			if (SettingsLockUUIDButton != null) {
				SettingsLockUUIDButton.Dispose ();
				SettingsLockUUIDButton = null;
			}
			if (SettingsLockUUIDText != null) {
				SettingsLockUUIDText.Dispose ();
				SettingsLockUUIDText = null;
			}
		}
	}
}
