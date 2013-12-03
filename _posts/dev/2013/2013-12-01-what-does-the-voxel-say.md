---
layout: post
title: What Does the Vox(el) Say?
category: dev
tags: [c++, graphics, voxels]
images: ['2013_11_28_1', '2013_11_28_2', '2013_11_29', '2013_11_30']
---
As always, I've started a new project. I really need to start sticking with my
projects and finishing. I'll try my best to do that with this one. I've started
working on a cube-oriented game akin to [Minecraft](httasp://www.minecraft.net)
and [Cube World](https://picroma.com/cubeworld).

<!-- more -->

<p style="text-align: center;">
	{% for img in page.images %}
		{% capture imgurl %}{{ site.production_url }}assets/img/voxels/{{ img }}.png{% endcapture %}
		<a href="{{ imgurl }}">
			<img src="{{ imgurl }}" alt="Screenshot" width="200"/>
		</a>
	{% endfor %}
	<br/>
	<small>A few screenshots of what I've done so far.</small>
</p>

Note that my intent is not to recreate either of these games. I don't have a
game idea in mind right yet, but I'm hoping something will rise to the top of my
mind soon. Once that happens, I'll switch focus from creating a voxel "engine"
and actually create a game with whatever I have at that point. I'll most likely
aim for a simple and, more importantly, achievable game idea initially.
Hopefully I'll learn from all the mistakes I make from that game to actually
prepare myself for the release of something more substantial.

Anything I learn along the way I'll hopefully remember to share with anyone and
everyone who actually reads my blog (I'm sorry I neglect it...).

# Overview

For my first post, I'll just outline a few things about what I've done so far:

 * To keep myself sharp in the ways of the dark side, __C++__ is the language of
   choice. I'm also taking advantage of a lot of C++11 features. Once I get
   around to upgrading my local Clang/LLVM, possibly some of the C++14 features
   too.
 * My personal laptop maxes out at __OpenGL 3.3__, so that's my starting point.
 * [GLFW](http://www.glfw.org) is used for windowing and input.
 * [FreeImage](http://freeimage.sourceforge.net) is used to load textures from
   disk. I may switch this guy out eventually, but it gets the job done for now.
 * I'm using [Smoothic](http://www.minecrafttexturepacks.com/smoothic/) for
   placeholder textures. It's a Minecraft theme, so things may look a little
   Minecraft-y while I'm developing.
 * [Boost.Filesystem](http://www.boost.org/doc/libs/1_55_0/libs/filesystem/doc)
   for a few filesystem operations I'm doing.

As for the "engine" that produced the screenshots above, it's pretty basic. Some
of its features include:

 * Basic first-person movement. WADS to walk around, space to jump, mouse to
   look around, et cetera. All of this will be configurable and easy to swap in
   and out eventually.
 * The most horribly written intersection test that doesn't really work, but
   gets the job done for now.
 * Texture atlases, basic shaders, and the fanciest of fancy OpenGL-ness.

And finally, some things I'll be working on in the near future:

 * Better abstraction of input. Basically I want to tie input events (e.g., key
   press, mouse click, mouse move) to action objects. In terms of design
   patterns: [Command](http://en.wikipedia.org/wiki/Command_pattern).
 * Implement picking code. Picking refers to figuring out what 3D object
   corresponds to a pixel. There are several ways to do this. In a voxel world
   you can get away with a ray tracing algorithm. Another approach is to take
   advantange of the GPUs power by rendering all your geometry with unique
   colors. If you offload this into a framebuffer object, you can extract the
   color for a pixel and decode it to figure out what geometry corresponds to
   that pixel.
 * Add a user interface. At the very least, get some foundational stuff done for
   2D rendering (fonts, text, dialogs, etc). I can't really create an actual UI
   until I figure out what kind of game I'll be implementing!
 * Load things from config files. I'm thinking I'll use JSON if there's a decent
   C++ library out there for it (most likely will be). These configs will hold
   information on things such as voxel descriptors (e.g., what textures get
   applied to each side of the cube) and texture atlas info.
 * Better abstractions for shader programs. In particular, connecting VAO
   attributes to the shader inputs.
 * Perhaps the more difficult thing to implement, but better sooner than later,
   is a server/client architecture.

There's much more to do, but those things are what I have on my TODO list right
now. I'll try to post small updates whenever I implement any of them, and maybe
even post other dev-related things in between. If you're interested in hearing
about something more specific then <a href="https://twitter.com/intent/tweet?screen_name=thegedge" class="twitter-mention-button" data-related="thegedge">Tweet to @thegedge</a>
