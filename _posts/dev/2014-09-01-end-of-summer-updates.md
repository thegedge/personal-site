---
title: End of Summer Updates
category: dev
tags: [c++, opengl, voxels]
description: Some updates on my voxel project, and thoughts on C++11.
---

So it's been a couple of weeks since my last update. I definitely haven't had a lot of time to work
on things, but there are a few updates and thoughts that I'd like to share.

## Updates

First, the project updates. After refactoring my meshing code I was able to easily add in some
performance tests to test my meshing code. What I found is that the greedy mesher was pretty slow,
and after a bit of profiling I found out that it was due to poor access characteristics; we need to
iterate over two-dimensional slices of the 3D chunk, instead of whatever iteration has the best
performance. To improve on this I actually cache the most important information &mdash; the
visibility information &mdash; of the chunk data in the greedy me sher and use this instead of the
chunk's interface. This allowed me to go from about 4-5ms per meshing operation to about 1.5ms. My
goal is to eventually drive this down to under 1ms, but for now I'm happy with 1.5ms.

A small but helpful update was front-to-back sorting of chunks as a pre-render step. Quite trivial
to implement and saved me about 0.5ms at peak. This gives you a performance boost because the
fragment shader will not be executed for any fragment that fails the depth test, so we try to order
our triangles in a way such that the depth buffer gets filled with the final values as quickly as
possible. My fragment shader is fairly simple right now, so the gains could be much higher if the
complexity rises.

The biggest update though, is moving all of my chunk generation and rendering code off the main
thread. To some extent I was doing this before, but I had to collaborate with a single
`std::future`. It was much easier to just have a worker thread and let it do as much work as
possible on its own rather than maintaining a bunch of `std::future`s. The only thing that happens
on the main thread right now is OpenGL code (i.e., fill a vertex buffer with the mesh). This didn't
improve performance in the sense of seconds per frame, but it did allow me to show the world much
more quickly.

Other small notes:

- Added code to display the number of triangles that are loaded. Right now I'm at ~1 million
  triangles and 2.9 seconds per frame to render. My goal is to reduce both of those numbers.
  Reducing the former requires either improved culling and/or "level-of-detail meshing".
- Significantly decrease my memory footprint by using 8-bit integers for the texture indices instead
  of 32-bit integers. This is mostly temporary though; as my voxel data gets more complex, I'll
  likely have to take advantage of the
  [flyweight pattern](https://en.wikipedia.org/wiki/Flyweight_pattern). Another two tasks that I
  have on my to-do list are implementing
  [run-length encoding](https://en.wikipedia.org/wiki/Run-length_encoding) for voxel data storage in
  chunks and dropping the voxel data of distant chunks after they've been meshed.

## C++11 Thoughts

I recently watched Eric Niebler's BoostCon presentation title C++11 Library Design. I've embedded
the video below for your viewing pleasure, but first I'll summarize some of his key points:

- Read-only arguments should be passed in as `const` references, sink arguments should be passed in
  by value (avoid rvalue references). The only time one should use rvalue references is when you're
  looking to do perfect forwarding.
- Make move operations `noexcept`, if possible.
- Use versioned, inline namespaces from day one.
- [ADL](https://en.wikipedia.org/wiki/Argument-dependent_name_lookup) can really bite you sometimes,
  so use `constexpr` functors instead of free functions since global functors are never found by
  ADL. Note that if you really want a free function to be extensible (think, `std::swap`) then stick
  to a free function.

![C++11 library design](https://www.youtube.com/embed/zgOF4NrQllo)
