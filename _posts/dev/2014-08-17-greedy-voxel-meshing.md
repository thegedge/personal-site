---
layout: post
title: Greedy Voxel Meshing
category: dev
tags: [c++, opengl, voxels]
additional_js: ['greedy_anim.js']
images: ['greedy', 'normal']
---

I've been busy working on improving the performance in my voxel engine over the
past week. The biggest improvement came from implementing greedy voxel meshing,
which is what this entry is all about. I'm going to put a little more effort
into creating higher quality blog posts from now on, with a focus on explaining
a concept or algorithm through visualization. If you have any suggestions for
improvements or blog posts to write, leave me a comment.

<!-- more -->

Mikola Lysenko goes into great detail describing various methods of meshing in
his [blog post](http://0fps.net/2012/06/30/meshing-in-a-minecraft-game/). I
highly recommend reading his post to get a better understanding of why greedy
meshing works and how bad it can get. My goal is to give a more intuitive
explanation of Mikola's post. I'll emphasize the most important part of the
algorithm to understand: the ordering of quads. Mikola gives this ordering:

{% highlight c++ linenos=table tabsize=4 %}
bool compareQuads(const Quad &q1, const Quad &q2) {
  if(q1.y != q2.y) return q1.y < q2.y;
  if(q1.x != q2.x) return q1.x < q2.x;
  if(q1.w != q2.w) return q1.w > q2.w;
  return q1.h >= q2.h;
}
{% endhighlight %}

What this means is that we form our quads from top to bottom, left to right.
Whenever we reach a face that has yet to be covered with a quad, we take the
widest possible quad at that point. If we can extend that quad in height, we
do so as much as possible.

That's all fairly hand-wavy, so here's an animation to help explain:

<p style="text-align: center">
  <style type="text/css" scoped>
    #greedy_anim { stroke-width: 2px; stroke-opacity: 0.8; }
    .grid rect { stroke: none; }
    .faces rect { fill: url(#quad); stroke: black; }
  </style>

  <svg id="greedy_anim" width="802" height="252"
       viewBox="-1 -1 802 252"
       shape-rendering="crispEdges">
    <defs>
      <pattern id="emptyPattern" x="0" y="0" width="10" height="10" patternUnits="userSpaceOnUse">
        <rect x="0" y="0" width="5" height="5" fill="#eeeeee"/>
        <rect x="5" y="5" width="5" height="5" fill="#eeeeee"/>
      </pattern>
      <pattern id="quad" x="0" y="0" width="10" height="10" patternUnits="userSpaceOnUse">
        <line x1="-1" y1="1" x2="1" y2="-1" stroke="black" stroke-opacity="0.25"/>
        <line x1="9" y1="11" x2="11" y2="9" stroke="black" stroke-opacity="0.25"/>
        <line x1="0" y1="10" x2="10" y2="0" stroke="black" stroke-opacity="0.25"/>
      </pattern>
    </defs>
  </svg>
</p>

Here's a result from my own engine:

<p style="text-align: center;">
	{% for img in page.images %}
		{% capture imgurl %}{{ site.production_url }}assets/img/voxels/2014_08_17_{{ img }}.png{% endcapture %}
		<a href="{{ imgurl }}">
			<img src="{{ imgurl }}" alt="{{img}} meshing" width="400"/>
		</a>
	{% endfor %}
	<br/>
	<strong><small>With (left) and without (right) greedy meshing.</small></strong>
</p>
