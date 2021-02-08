---
title: To Infinity...And Beyond!
category: dev
tags: [c++, opengl, voxels]
description: >-
  How I implemented chunk loading for infinite terrain, and some performance improvements to the
  voxel data sent to the GPU.
---

This weekly journal thing has been good for me. I've been fairly productive since starting this goal
of one entry a weeks, so for my third week I have some Good Stuff&trade; for all of you reading:
**infinite terrain** and a **significant performance boost**.

## Infinite Terrain

Perhaps my favourite update of the week is that I _finally_ got around to making my terrain
infinite. You can go on forever and ever and have plenty of terrain to keep you occupied. Right now
it's a very naive process every frame:

> Compute $P$, the chunk the player is located in.
>
> > If $\medspace P$ is different from the previous frame, add all chunks $C$ with
> > $|P - C|_\infty \le R$ to queue $Q$. That is, all chunks within a square of radius
> > $\thinspace R$ around the player.
>
> Destroy any existing chunks $C$ with $|P - C|_\infty \gt R$.
>
> If $Q$ is nonempty, load $n$ chunks from $Q$ that have yet to be loaded.

Right now I have $R$ = 15 and $n$ = 10. As you can see, this is a very naive approach, but for now
it gets the job done. All of the work happens in the main loop, but eventually I'll move chunk
loading off the main thread. I actually modified my chunk code this week to lazily construct the
vertex buffer/array, so moving this off the main thread should be straightforward.

<iframe class="mx-auto" width="720" height="540" src="//www.youtube.com/embed/OWC8R2P4TH4" frameborder="0" allowfullscreen></iframe>

## Performance Boost

After implementing infinite terrain, I realized the performance was incredibly poor. After some
investigation I found the major issue here was that my per-voxel data was too large. Originally I
was sending over 9 floats per voxel: position, normal, texture coordinates. Two issues here:

1. Every voxel was getting 3 floats for a normal that could be one of 6 values!
2. u/v texture coordinates were either 0 or 1, so we really only need 1 bit for each.

So I compacted my vertex array down to 3 floats and 2 integers: 3 floats for the voxel position, 1
integer for the texture coordinates, and 1 integer for the face index. The normal was easy to take
care of: send over a face index and use that to index into an array of normals. The texture
coordinates are packed into a single integer:

- Bit 0 is the u texture coordinate.
- Bit 1 is the v texture coordinate.
- Bits 2-31 are the texture atlas index.

This could be a problem in the future if I wanted to combine adjacent voxels into a single quad or
perhaps animate the texture coordinates, but for now this will do. Here's what the before and after
looks like for the texture part of my vertex shader:

```glsl
// Before
texCoords = in_TexCoords;

// After
texCoords = vec3(in_TextureData & 0x1, (in_TextureData >> 1) & 0x1, in_TextureData >> 2);
```

So a little more complexity for a pretty big boost. I was originally running at about 23 ms/frame
and this change brought it down to about 13 ms/frame. Some other ideas I have for performance
boosts:

- I currently bind and draw every loaded chunk, even those that are not within the view of the
  camera. I could do a quick check to find which chunks are actually in the camera's viewing
  frustrum and render only those.
- Have my meshing algorithm merge similar, adjacent voxels into a single quad so that less vertices
  are sent to the GPU.
- Some kind of level-of-detail (LOD) for my chunks. To be able to load more chunks I could have
  various levels of detail for the chunks (think texture mipmaps, but for meshes). I have some ideas
  for this, but not sure how they'll pan out. Either way, having LOD for my chunks could mean being
  able to view huge amounts of terrain. I've always enjoyed being immersed in an environment that
  feels grand.

## Other Updates

The previous two were the big updates, but here's a few other small things in no particular order:

- My text renderer now uses the texture builder code mentioned in
  [last week's post](/blog/2014-05-17-unit-testing-and-texture-builder).
- Abstraction for sampler objects.
- Sprinkled around some PIMPLs.
- Added padding warnings back into my compilation. This will let me know whether or not a structure
  is tightly packed, which is important when setting up my vertex arrays.
