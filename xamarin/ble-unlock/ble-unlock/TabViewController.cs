
using System;

using Foundation;
using UIKit;

namespace bleunlock
{
	public partial class TabViewController : UITabBarController
	{
		UIViewController tab1, tab2;

		public TabViewController () : base ("TabViewController", null)
		{
		}

		public override void DidReceiveMemoryWarning ()
		{
			// Releases the view if it doesn't have a superview.
			base.DidReceiveMemoryWarning ();
			
			// Release any cached data, images, etc that aren't in use.
		}

		public override void ViewDidLoad ()
		{
			base.ViewDidLoad ();
			tab1 = new ble_unlockViewController("Main");
			tab1.Title = "Green";
			tab1.View.BackgroundColor = UIColor.Green;
			tab2 = new UIViewController();
			tab2.Title = "Orange";
			tab2.View.BackgroundColor = UIColor.Orange;

			var tabs = new UIViewController []{
				tab1, tab2
			};
			ViewControllers = tabs;
			SelectedViewController = tab2;
		}
	}
}

