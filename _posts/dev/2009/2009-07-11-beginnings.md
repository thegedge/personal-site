---           
layout: post
title: Beginnings
category: dev
tags: [java, score editing]
---
So I'm going to start my blogging off with an introduction to my project: a free cross platform musical score editor (which currently has no name). Our team consists of just myself and a classmate from my undergrad. We previously worked on a team project during our undergrad (a required course), so we were already familiar with team development.

<!-- more -->
For me, projects come in two flavors:

1. those I do simply for my own personal enjoyment, such as a game and,
2. those that fill a need for me, such as small scripts to get repetitive tasks done.

The musical score editor falls into category 2, but it is definitely an enjoyable project too. I personally found myself unhappy with existing free software for editing scores. Since I focus on guitar, I was looking at something with a simple interface to whip up a guitar tab and be on my way. Probably the best I could find is TuxGuitar, but it was far from a pleasurable experience. This established a need for me, one whose solution we will eventually share with others. So with a project idea, the next thing was to lay out some basic requirements:

* Cross-platform. I am an OS X user, and my friend is a Linux user.
* An interface that is both simple for the first-time user, but powerful for the more advanced users.
* Quick keyboard access to the most common commands to greatly improve throughput.
* Fully-featured. We want users to be able to do just about anything and everything they'd want to do with their musical scores. Clearly this will take time, but it is our goal.

With these requirements in mind, we decided that Java would make our lives far simpler. We chose Swing over SWT for our GUI library, since we both know and enjoy Swing. Our goal is to eventually bring this project to a level comparable to that of commercial software. It's a big goal, but we're extremely motivated and really enjoy this project. Anyways, some things I plan to blog about in the near future:

* Java: not always _that_ cross-platform. Various topics on producing code and user-interfaces that feel more native.
* Working with JNI.
* Developing a flexible and easy-to-use plugin system.
* Object-based rendering systems: the pros and the cons.
* Other cool stuff!

We already have a highly functional and \[mostly\] stable version of our score editor internally, but we want our first public release to really be something amazing. We have many incredibly powerful features planned, some of which we have never seen before in the area of score editing. Hence, if you're reading this entry you should stay tuned for some good stuff! I'd post a teaser screenshot, but everyone likes a bit of suspense :)
