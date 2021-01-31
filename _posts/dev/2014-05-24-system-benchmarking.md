---
title: System Benchmarking
category: dev
tags: [c++, opengl]
---

To keep up with my weekly dev journal blog, here's a short post on something I whipped up today. I
thought it would be neat to have a way of seeing how performant my systems were in gameplay.

The result looks something like this:

> ![benchmark graph](/img/voxels/2014_05_24.png)

I know, I know. It's not particularly sexy, but it gets the job done. It's also poorly implemented,
but I wanted to stop taking so much care in everything I do and start getting things done. The only
system that has any level of computation (the blue line that you see) is the window system, and
that's because its update function does a buffer swap.

It was actually quite easy to get this system up and running. I have a benchmark system that hooks
into the system start/end update events. When an update ends, I compute the duration and add it to a
scratch buffer. Periodically I find the maximum sample from that list, add it to a public-facing
list, and clear out the scratch buffer.

Some things I want to get done within the next week or two:

- Abstractions for vertex buffer/array objects.
- Dynamically load sectors based on player position. Right now I only have a fixed-size world which
  is no fun at all.
- Think of an actual game idea, no matter how silly it is! Having an actual end goal will focus me
  more and get me to an end result sooner. The code doesn't have to be perfect the first time
  around. Each mistake I make this time will just be a learning experience for the next idea.

It's a long weekend though, so who knows. Maybe I'll have a new entry in a couple of days.
