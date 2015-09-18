---
layout: post
title: Voxel Iteration
category: dev
tags: [c++, voxels]
---
Given my poor man's implementation of intersection testing, I realized it was
time to do a proper implementation of a grid-based iterator. I'm not going to
dive into great detail about this algorithm because this post exists to point to
the GitHub repository with my code, so I'll summarize the idea of the algorithm.


Given a ray, `source + t\*direction`, you initialize the iterator with the value
of _t_ required to get to the next voxel along each axis. For every iteration,
you take the smallest _t_ value and iterate the voxel index along that axis.
For example, if we're at `<5, -2, 4>` and the smallest value for _t_ is along
the y-axis, we'll move to `<5, -1, 4>` or `<5, -3, 4>`, based on which direction
the ray is moving along the y-axis. We then update the value of _t_ to move to
the next voxel along the y-axis.

<p style="text-align: center;">
	<img src="//docs.google.com/drawings/d/1vUNao9jrzhwfrrxW1vfIu1Li8OlgBq3smY9QRlzSGNU/pub?w=800&amp;h=338">
	<br/>
	<small>Iterating over a 2D grid.</small>
</p>

For a better description of this algorithm, check out
[this](http://www.cse.yorku.ca/~amana/research/grid.pdf) paper. I've created a
[GitHub repository](//github.com/thegedge/voxel_iterator) to show what this
looks like in code. This repository contains the iterator itself, along with a
small Qt program to visualize the iteration.
