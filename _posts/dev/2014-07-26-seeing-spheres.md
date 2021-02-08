---
title: Seeing Spheres
category: dev
tags: [c++, opengl, voxels]
description: Creating voxel spheres with the midpoint circle algorithm
---

Looks like I dropped the ball on a weekly journal, but that's okay! I took a break from everything
and had a vacation (i.e., I visited my friends and family back in Canada). Back in the game and
played around with "voxelizing" spheres.

<!-- prettier-ignore-start -->
> ![outside the sphere](/img/voxels/2014_07_26_outside.png)
> ![inside the sphere](/img/voxels/2014_07_26_inside.png)
>
> A solid sphere + inside a spherical cutout.
<!-- prettier-ignore-end -->

Although I could use this as a "brush" for creating voxel landscapes, my guiding reason for creating
a voxel sphere is for finding a radius of chunks around the player to load. Right now I grab a cube
of chunks, so to speed things up I can just grab a sphere of chunks. I'll also reduce the amount of
data I'm loading into memory. Eventually I'll also do some frustrum culling so I don't render
unnecessary chunks.

My approach is rather simple and likely not perfect, but for now it'll get the job done. It's simply
an extension of the
[midpoint circle algorithm](https://en.wikipedia.org/wiki/Midpoint_circle_algorithm) for three
dimensions. In Python it looks something like this:

```python
def sphere(cx, cy, cz, radius):
    for p1, radiusError in midpointCircle(radius):
        for p2, _ in midpointCircle(p1.x, radiusError):
            yield cx + p2.x, cy + p1.y, cz + p2.y
```

Some optimization tasks that I plan on working in the near future:

- Use the sphere code to decide which chunks to load around the player.
- View frustrum culling of chunks. I just render everything in front of the player right now, so
  this should shave off a millisecond or two each frame.
- Store voxel mesh in six VBOs corresponding to each face (i.e., [+,-] &times; [x,y,z]). That way we
  can quickly cull based on the camera's view vector instead of pushing everything to the GPU and
  having it cull. I expect to trim off another few milliseconds with this optimization.

Outside of that, I have a few other tasks to work on:

- Introduce a system that processes input and maps inputs to actions. For example, one could bind an
  "exit" action to the escape key, a "move forward" action to the W key, and so on. I haven't worked
  out the design yet, but will likely go the simplest route to start.
- Make scripts useful. I can run a script every frame right now, but I can't have a script run on
  certain events or do anything else meaningful right now. I also need to expose anything useful
  from the engine to the scripts.
- User interface. Thinking about using [Awesomium](https://www.awesomium.com) or the
  [Chromium Embedded Framework](https://bitbucket.org/chromiumembedded/cef/src/master/). In other
  words, an HTML-based UI engine.
