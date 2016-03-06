---           
title: Expressing Qt Love
category: dev
tags: [java, qt, c++]
---

The more I use Qt, the more I love it. Whenever I talk to people I'm always
expressing my joy about how simple it is to do things with Qt. Whenever I do
something new, no matter how small, I'm excitedly telling and showing friends
what I've done.


For example, recently I had the requirement that I wanted to be able to save
images displayed by `QGraphicsPixmapItem` to a file. In a matter of a couple of
minutes I extended `QObject` and `QGraphicsPixmapItem`, wrote an override for
the `contextMenuEvent` to display a "Save Image" menu, and a simple slot to
show a "Save File" dialog. Now all the images I'm showing on my `QGraphicsView`
can be optionally saved to a file at the user's request.

A really simple thing, but that's because it was done in Qt! If it weren't for
the existence of Qt I would probably still be using Java and Swing.
