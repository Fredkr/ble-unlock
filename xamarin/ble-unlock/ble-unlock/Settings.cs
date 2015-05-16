using System;
using Foundation;

namespace bleunlock
{
	public static class Settings
	{
		private const string LockUUIDKey = "LockUUIDKey";
		private const string UnlockUUIDKey = "UnlockUUIDKey";
		public static string LockUUID
		{
			get{ return GettStringSetting (LockUUIDKey);}
		}
		public static string UnlockUUID
		{
			get{ return GettStringSetting (UnlockUUIDKey);}
		}

		private static void AddStringSetting(string value, string uniqeKey)
		{
			NSUserDefaults.StandardUserDefaults.SetString(value, uniqeKey);
			NSUserDefaults.StandardUserDefaults.Synchronize ();

		}

		private static string GettStringSetting(string uniqeKey)
		{
			return NSUserDefaults.StandardUserDefaults.StringForKey (uniqeKey);
		}

		public static void GenerateNewLockUUID(){

			AddStringSetting (Guid.NewGuid().ToString(), LockUUIDKey);
		}

		public static void GenerateNewUnlockUUID(){

			AddStringSetting (Guid.NewGuid().ToString(), UnlockUUIDKey);
		}
	}
}

