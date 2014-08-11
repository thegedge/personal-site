---
layout: post
title: Unit Testing and Texture Builder
category: dev
tags: [c++, opengl]
---
I'm going to put in extra effort to try and write at least one dev journal
entry every week.  It should help keep me motivated, which has been a little
difficult these days. I usually get home from work and shut my brain off so I
can unwind before the next work day.

But I digress. This week's entry will give a quick update on what I've done
recently: unit testing and my use of the
[Builder pattern](//en.wikipedia.org/wiki/Builder_pattern).

<!-- more -->

So one of the biggest things I've done since my last update is add a bunch of
unit tests for my code, and a couple of performance tests. I made use of the
wonderful [GoogleMock](//code.google.com/p/googlemock/) library to get me
there. I'm not following a pure test-driven development workflow, but I do try
my best to add in tests whenever I can. The only thing I'm missing right now,
which I may add in the near future, are tests to verify correctness in
rendering. If it does happen, I'll compare rendered images against golden
images. Rendering images for testing means using a headless/software renderer,
which will likely be [Mesa](//mesa3d.org/) if they ever fix
[this](//bugs.freedesktop.org/show_bug.cgi?id=66346) issue. I haven't come
across any other decent open-source software renderer for OpenGL (perhaps a
side project?). In the meantime, I have empty implementations of any OpenGL
functions I'm using and link those in for unit tests.

One other significant thing I done was refactor my texture code. I was kind of
lazy initially and duplicated a fair amount of code for different types of
textures: 2D texture arrays, regular 2D textures, and rectangular textures. My
refactoring unified all of these into a single texture class that is
constructed from a builder instance. Creating a texture looks something like
this now:

{% highlight c++ linenos=table tabsize=4 %}
TextureBuilder builder(GL_TEXTURE_2D_ARRAY);
builder.mipmap()
       .allocate(128, 128, 3)
       .fromImage("assets/textures/foo1.png")
       .fromImage("assets/textures/foo2.png")
       .fromImage("assets/textures/foo3.png");
return std::make_shared<Texture>(builder);
{% endhighlight %}
