---
title: Game Design
category: dev
tags: [graphics, opengl, gamedev]
description: >-
  Basic texture and per-pixel lighting was added to my game engine, but there's still a lot more to
  do, like resource management and deferred rendering.
---

So, one thing that I've been working on over the past week is reviving my game engine that I started
working on a couple of years ago. It's not far, but I'm currently happy with the way things are
going:

![Game Engine Screenshot](/img/2010_Feb_01.jpg)

Pretty simple, I know. Shows off some basic texturing and per-pixel lighting, but that's about all I
got for now. Currently this is all done in OpenGL, but I've abstracted many of the concepts in such
a way so that I could easily swap in a DirectX renderer. This is done at compile-time though, so
that I avoid dealing with dynamic libraries.

It's pretty easy to get something up and running too. I just extend an application class, which
takes care of some nitty gritty details for me (e.g., the game loop). With the help of some
compile-time polymorphism, I just override three methods: initialize, update, and render. Also,
input handling (keyboard + mouse) is currently implemented using mappings to boost::functions. These
mappings are registered at runtime, generally in the initialize method one specifies.There's plenty
of work to be done, but I think it's a good start. Some things I need to work on:

- **Resource Management**. Currently all resource management is done through `boost::shared_ptr`. In
  other words, there isn't really any "management" happening. I need some form of a manager that can
  load various assets, caching things as necessary to help with efficiency.
- **Higher-level Primitives**. Currently I send triangle primitives to the renderer, which is a
  little too low level for my liking. I'd like to pick a set of base primitives that are at a
  higher-level (e.g., triangular mesh, model, terrain)
- **Deferred Rendering**. I've always wanted to take a stab at implementing deferred rendering. I'd
  just love to play around with shaders in general and getting some fancy stuff on the go.

Of course, there's a lot more than that – Terrain LoD, Character Animations, GUI Rendering, Game
Logic, Physics, etc – but it's a start!
