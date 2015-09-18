---           
layout: post
title: We got monkeys!
category: dev
tags: [graphics, software engineering, c++]
---

Yep, we do have monkeys. Blender monkeys, to be exact. I whipped up a simple
loader for Wavefront OBJ models. Only loads the basic geometry now, so I have
to work on the material stuff. One problem is my lack of a shader that does
more advanced illumination, so that's something I have to work on. The two
screenshots I've posted only do per-pixel lighting with Lambertian reflectance.
I also want to make it so that my OBJ loader doesn't reproduce vertices with
the same position + normal + texture coordinates.

![http://webdocs.cs.ualberta.ca/~gedge/images/gameengine/2010_Feb_08.jpg](http://webdocs.cs.ualberta.ca/~gedge/images/gameengine/2010_Feb_08.jpg)


I have also gotten things working with Cocoa. I do the event loop myself to
make things easier, but it's all good. Full screen mode works in Cocoa too, but
not in X11/Win32 because I haven't had the chance to do so yet. And with Cocoa
I'm briefly gonna bring up the PIMPL pattern and how I made use of it.

The [PIMPL](http://en.wikipedia.org/wiki/Pimpl) pattern is a way of hiding an
implementation from translation units other than the translation unit that
implements some class. This is possible because you can have a class member
that is a pointer to a type that has only been forward declared.

So why did I need this? Well I needed to store Objective-C pointers (i.e.,
`NSWindow *`) in my Window class. The problem here is that everything works
wonderfully in Objective-C files, but everyone else chokes when including
Window.h because they get confused by the Objective-C code in
`<Cocoa/Cocoa.h>`. I couldn't really forward declare these Objective-C classes
either, because again I have the same problem: Objective-C in a C++ file just
doesn't work (as far as I know?). Enter the PIMPL. I forward declare a struct
that will hold these Objective-C pointers and define that struct in my
Objective-C implementation of the Window class. Problem solved, whahay!
