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
	[Register ("BleViewController")]
	partial class BleViewController
	{
		[Outlet]
		[GeneratedCode ("iOS Designer", "1.0")]
		UIButton LockButton { get; set; }

		[Outlet]
		[GeneratedCode ("iOS Designer", "1.0")]
		UIView Main { get; set; }

		[Outlet]
		[GeneratedCode ("iOS Designer", "1.0")]
		UIButton UnlockButton { get; set; }

		void ReleaseDesignerOutlets ()
		{
			if (LockButton != null) {
				LockButton.Dispose ();
				LockButton = null;
			}
			if (Main != null) {
				Main.Dispose ();
				Main = null;
			}
			if (UnlockButton != null) {
				UnlockButton.Dispose ();
				UnlockButton = null;
			}
		}
	}
}
