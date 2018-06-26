---
title: A Week of Optimizations
category: dev
tags: [c++, opengl, voxels]
---

A variety of optimizations has led me to being able to render a bunch more
voxels. I don't know about everyone else, but optimizing graphics-related code
I find incredibly fun!


From my [last post]({% post_url dev/2014-07-26-seeing-spheres %}) I
mentioned using my sphere code to load less sectors around the player. This did
improve things, but only ever so slightly. Nevertheless, loading less data is
never a bad thing.  There were two other more significant improvements though:
frustrum culling and what I'll call "chunk face" culling.

# Frustrum culling

<p style="float: right; margin-left: 10px; width: 353px; line-height: 100%;">
	<img src="https://docs.google.com/drawings/d/1XlMlgGT2NN3MeqEwtCmVlJ6QLqGyOuQ6t1hne5_WJo4/pub?w=353&amp;h=294">
	<br/>
	<strong><small>Rendering only the chunks necessary (orange) in the player's viewing frustrum (blue).</small></strong>
</p>

Frustrum culling is rendering only the things that exist within the view of the
player. Previously I was simply culling chunks that were behind the player.
This was quick and easy, but it meant that I was still uploading chunks to the
GPU that would never make it to the screen.

Enter frustrum culling. A projective camera with near and far planes creates a
<em>frustrum</em>, a pyramid with its top sliced off. Anything strictly outside
the frustrum will never make it to the screen, so there's no need to attach and
render its buffer. A frustrum can be defined by six planes. I'll leave the
derivation of those planes to you, but think about two things: 1) how the
camera's projection matrix transforms 3D points into clip space, and 2) how
those points are kept or discarded once in clip space.

Frustrum culling gave a big performance boost, approximately 1.8x. When writing
any game it's a good idea to always keep in mind ways that you can send less
data to the GPU.

# Chunk Face Culling

<p style="float: right; margin-left: 10px; width: 353px; line-height: 100%;">
	<img src="https://docs.google.com/drawings/d/1-ZTXzb6-gV5Kw30Ka50QQZm1_0wI0tvAnZil9yzgGu4/pub?w=353&amp;h=294">
	<br/>
	<strong><small>Categorizing chunks based on relative location to player</small></strong>
</p>

Although not quite as significant an optimization as frustrum culling, I still
managed to gain about a 1.3x improvement by using what I'll call "chunk face"
culling. When rendering a cube you are guaranteed that at most three sides will
be visible. Given that fact, I thought about how I could store the faces of
each voxel in six separate vertex buffers, and decide which ones to render
based on the relative offset of a chunk to the user.

First, we need to categorize the chunks based on the camera's current position.
In the diagram to the right you can see that we partition chunks into three
categories along each axis:

  1. behind player, in which case we'll see faces with a normal pointing along
	 the positive direction of that axis;
  2. in front of player, in which case we'll see faces with a normal pointing
	 along the negative direction of that axis; and
  3. same as player, in which case we'll (potentially) see both faces along
	 that axis.

For example, consider the chunk labeled (1) in the diagram to the right. The
player is in that chunk along both axes, so we'll potentially see all faces.
It's easy to see this happening if we place the player in the center of the
chunk and put boxes in each corner. Now, consider the chunks labeled (7). If
the camera were facing in this direction we can only see faces with normals
`+x` and `-y`.

# Conclusions

Optimizing your rendering is fun. In the end the key factor is a combination of
lowering your draw calls and the amount of data you send to the GPU. Frustrum
culling is a big win, and it's a good idea to just do it from the start as it's
straightforward to do and gives you a big win.

Now, as for "chunk face" culling, I did get a performance boost but I had to
increase the number of draw calls by 6x. This gave me a performance boost
because the amount of data I send is significantly higher than the cost of the
draw call, but what if I had much less data to send?

Well, I'll be investigating that soon as I improve my meshing algorithm. Right
now, every cube gets rendered with two triangles per face. This is overkill
though as adjacent faces with the same attributes could be merged. Imagine a
completely flat 8x8x8 chunk where all the voxels are exact the same. Right now
I would render 8 &times; 8 &times; 2 triangles per chunk face, but really I
only need two triangles per chunk face. My plan is to implement a [greedy
meshing algorithm](//http://0fps.net/2012/06/30/meshing-in-a-minecraft-game/).
Once implemented, I should be sending far less data to the GPU so I'll
investigate the cost of my "chunk face" culling technique and report back on
whether or not it's a gain.
