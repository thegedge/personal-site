---
title: Becoming a Jedi, err...JNI Master!
category: dev
tags: [java, jni]
---

I myself am far from being a JNI master, since I only started doing my first JNI a few days ago. The
problem we were having is that there is no way in Java to get some native behavior on OS X. For
example, the closest to native you can get with Open/Save file dialogs is what you get from
`java.awt.FileDialog`, which isn't very much.

Since we're developing in Swing it is key that if we do anything, it should be wrapped up in a neat
little package that mimics existing Swing components. Not only that, but we want the behavior of any
wrapper classes to be the exact same, or very similar to, the corresponding `JComponent`. Although
it's far from being ready for public release, I currently have a pretty solid JNI library for the
open/save dialogs in OS X. It's all wrapped up neatly in `CarbonFileChooser`, an extension to
`JFileChooser`.

One issue that arose, at least for OS X, is that there are various threads that have to run
independently: the AWT/Swing thread, and the AppKit thread. Hence, when one makes a native call that
is going to be doing some GUI stuff or event-oriented callbacks to the AWT/Swing thread, one has to
forward things along to the AppKit thread. This can be done via the `performSelectorOnMainThread`
method. To achieve modality, I use the following code:

```java
public int showSaveDialog(Component parent) {
	dialogOpen = true;
	result = CANCEL_OPTION;
	cc_showSaveDialog(parent);
	while(dialogOpen) {
		try {
			Thread.sleep(100);
		} catch(InterruptedException e) { }
	}

 	return result;
}
```

What happens is that when the dialog is disposed, JNI calls are executed to set the `dialogOpen`
variable to false, breaking the loop. I've been debating trying out `wait()` and using JNI to wake
up the object instead, but for now the above code gets the job done.

Eventually I'm going to release this code library to the public so that anyone can use it, and
eventually I'll open-source it (when I'm too lazy to keep maintaining it). The beauty of this, if
one is using Swing, is that you really don't change your code at all. Just create the
`CarbonFileChooser` class and you're good to go. Right now things are simple, so just some basic
things can be done. You can do the following:

- Set the initial directory
- Add choosable filters, set the initial file filter, and get the chosen file filter once the dialog
  is disposed
- Get the selected file to open/save

And some things left to do:

- Multiple file selection and retrieval
- Show no filters if the "All Files" filter is the only one
- Setting the initial file name for save dialogs
- Update dialog to unselect files, as necessary, when filter changes
