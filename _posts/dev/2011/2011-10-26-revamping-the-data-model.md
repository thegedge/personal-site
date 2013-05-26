---           
layout: post
title: Revamping The Data Model
category: dev
tags: []
---
When coding the core data model for the score editor, I tried my best to keep any view-related information out of it. This was in an attempt to follow the Model-View-Controller (MVC) architectural pattern. Unfortunately, what I've realized is that this separation is actually making my life more difficult. What I've come to realize is that in my own case, this separation doesn't even make sense.

<!-- more -->
Why? Well I'm not trying to create a core music library that can be reused by others (not anytime in the near future anyways), but rather I'm attempting to create a professional and free piece of software so that people can create, edit, playback, and print musical scores and tablature. Intrinsic to that purpose is the display properties of the various elements in a score. In other words, view-related properties are part of the data model.

As another teaser, here's how far I've gotten so far in the rendering process:

![http://www.cs.mun.ca/~gedge/pics/scoreeditor/score_and_tab2.png](http://www.cs.mun.ca/~gedge/pics/scoreeditor/score_and_tab2.png)

There's a lot of work to be done, but I was getting close to something presentable. The need to tackle the display properties of elements and somehow integrate this into the data model is my next step, and unfortunately that will take time. Right now I model only the very basic elements:

* Score
* Part
* Staff
* Bar
* Column (a single note / chord)
* Note
* Instrument

along with a few other small things (e.g., note bends, rests, grace notes). What I need to do is include other display elements in the model so that I can more easily allow the user to modify anything and everything in the score. For example, I should model a beam so that the user can change its slope. I should model the note head so that the user can change its size, color, etc. I should model the stem, so that the user can change its length. I would provide an automated system that will do its best to get the score as close as possible to what the user would like, but a "one size fits all" solution doesn't exist because everyone has their own preferences.Oh the joys of designing a serious piece of software!
