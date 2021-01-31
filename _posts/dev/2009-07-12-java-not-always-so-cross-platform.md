---
title: "Java: not always so cross-platform"
category: dev
tags: [java]
---

There's no doubting the fact that Java really makes one's life far easier in general when creating a
piece of software that works on various platforms. But even with such power, there's always little
things that really can make one's life a pain when creating a piece of software that is intended to
be high quality.

One of the major sources of pain in Java is cross-platform GUIs. It's nice that Swing works
"out-of-the-box" on most systems, but it often suffers from lacking in a "native" feel, even when
using the system look and feel. Also, it's sometimes hard to take advantage of platform-specific
features that could really open up a world of possibilities for your app.

For our own project we decided to create plugins for various platforms that need more than the
standard library offers. I'll talk about our plugin system in a future post. When we distribute
platform-specific packages (e.g., a Mac OS X application bundle) we will include the appropriate
plugin to extend the functionality of the app for that platform. We prefer this method over checking
system properties so that a release never "breaks" when one of these properties magically changes.
Anyways, some functionality we require includes:

- Querying what platform we're on. The application does not suffer when the platform is unknown, but
  we can provide specific features and an enhanced UI based on a known platform.
- Directory services. We want to know where the user stores their documents, where is their desktop,
  etc.
- Platform-specific GUI components.

So nothing too interesting to talk about in the first 2, but for the last one I can provide a little
snippet of our default behaviour:

```java
public T getSwingComponent(Class componentClass, Object... args) {
	Class>[] classes = new Class>[args.length];
	for(int i = 0; i < args.length; ++i) {
		classes[i] = args[i].getClass();
		try {
			return componentClass.getConstructor(classes).newInstance(args);
		} catch (SecurityException e) {
		} catch (NoSuchMethodException e) {
		} catch (IllegalArgumentException e) {
		} catch (InstantiationException e) {
		} catch (IllegalAccessException e) {
		} catch (InvocationTargetException e) {
		}

		return null;
	}
}
```

So if we want a `JToolBar` we simply go `getSwingComponent(JToolBar.class)` and that's it. The
implementation provides variable arguments behaviour to _elegantly_ allow usage of all valid
constructors. The only thing we lose here is compile-time error checking for incorrect constructor
arguments, but this is not too big of an issue for us at the moment. Our platform-specific plugins
can override this method to check for various Swing classes, and return an alternate instance of
that class if necessary. For example, our OS X plugin returns a simple extension to `JMenuBar` that
removes all icons from any menus added to it (to adhere to the Apple Human Interface guidelines).
Another component I plan to work on for OS X a native file dialog (I don't like
`java.awt.FileDialog`). This will probably have me diving into some JNI, which is good because I
would like to play around with it. If I can get something decent working there, I'll definitely look
into releasing the JNI code publicly.

A really simple technique but it really helps enhance our application and give an improved native
feel over what Swing offers.
