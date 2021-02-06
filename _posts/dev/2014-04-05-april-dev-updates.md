---
title: April Dev Updates
category: dev
tags: [c++, voxels]
---

It's been a few months since I've written something, so I'll just give a quick update on what I've
been doing.

First, I'll mention that I'll be headed to [PyCon](https://us.pycon.org/2014/) in Montreal next
week. Ping me on Twitter if you'll be there too and we'll try to meet up.

Second, I've had a bug in my voxel iteration code for a few months now, and I just kind of shrugged
it off and focused on other things. Yesterday I decided it was time to take care of it. What would
happen is that sometimes if you click on part of a voxel you'd end up picking the voxel to the left
instead. After playing around for a bit, I realized that it _only_ happened when the player's
position had a negative value. After digging through the iteration code for an hour or so, I
realized the issue was with computing the initial voxel for iteration. What I needed to be doing was
using the mathematical definition of floor (i.e., greatest integer smaller than the given value).
Instead, I was using integer truncation to "floor" my value. This meant that, for example, -1.2
would end up being -1 instead of -2. I've updated my
[voxel iterator repository](//github.com/thegedge/voxel_iterator) with this change. Once I get
around to writing some unit tests I'll definitely remember to capture this issue in a test. I know,
I know. I should be writing tests from the get-go.

Other than that, there's been a few other changes:

1. I decided to whip up an entity component system (ECS) and play with that idea. I
   [wrote](/blog/2009-09-06-components-systems-subsystems-entities-collapses) about these beasts a
   while back. At that time I was mostly trying to wrap my head around it all, but nowadays I have a
   pretty good idea what they're all about.

   It seems to get a pretty good reception for gamedev, but like any architectural / design pattern,
   it has its own set of issues. One issue is communication between systems. Right now I'm taking
   the easy way out and using [libsigc++](https://developer.gnome.org/libsigc++/stable/) for events.
   Hopefully this won't come back to haunt me in the future. So far though, I've enjoyed enjoyed
   thinking about things in a data-oriented way.

2. I've moved a lot of initialization and configuration over to YAML files. This is great because it
   means I can do some things without having to recompile. Right now I have several things thrown
   into YAML files:

   - texture atlas definitions,
   - effect definitions (state / shaders for rendering), and
   - ECS configuration.

   I'm using the wonderful [yaml-cpp](https://code.google.com/p/yaml-cpp/) library to parse these
   files.

3. Updated my build options to be quite strict with warnings, and treat them as errors. Sometimes
   this can be annoying, but I think we should all be doing this as it will likely save us a lot of
   pain in the future. If you're using clang, make sure you enable as much as possible. I currently
   have `-Weverything`, `-Wno-c++98-compat`, `-Wno-c++98-compat-pedantic`, `-Wno-padded`, and
   `-Wno-exit-time-destructors` enabled. I'm hoping to eventually get around to `padded` and
   `exit-time-destructors`.

   I really should have been doing this from the start.

Now if only I could have a game idea, or even just some kind of mechanic to build around...
