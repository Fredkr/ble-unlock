﻿using System;
using System.Linq;
using System.Collections.Generic;

using Foundation;
using UIKit;

namespace bleunlock
{
	[Register ("AppDelegate")]
	public partial class AppDelegate : UIApplicationDelegate
	{		
		public override UIWindow Window {
			get;
			set;
		}
		public override void OnResignActivation (UIApplication application)
		{
		}

		public override void DidEnterBackground (UIApplication application)
		{
		}
		
		public override void WillEnterForeground (UIApplication application)
		{
		}
		
		public override void WillTerminate (UIApplication application)
		{
		}
	}
}

