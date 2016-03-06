---           
title: New Projects
category: dev
tags: [java, api, software engineering]
---
It's been quite some time since my last post (this seems to be a regular
occurrence, doesn't it?). Well, fear not, I still exist. Unfortunately the
score editor project had to be put on the back burner for now, as I've picked
up a real job (only a short-term contract), which leads into my discussion in
this post.


Working on a real project has really helped me learn many things, but
especially good design techniques. In particular, my project will be used as a
plugin for an existing piece of open source software
([Phon](http://phon.ling.mun.ca/) , a tool for phonological analysis). To not
see the past few months worth of work go to waste, I've been given permission
to take this project on as my own (it'll show up on my
[GitHub](https://github.com/thegedge) account eventually), so I'm really
designing this to be something that's easily usable and extendable by others.
In its simplest form, it's a framework for designing complex operations from
simpler ones (think [Quartz
Composer](http://en.wikipedia.org/wiki/Quartz_Composer) , but more general).

Since I'm designing something that will be used by others, I really need to
think twice about every decision I make. Some discussion points on my
experience so far:

* I want my API to be final (in the Java sense of the word) so that people can
  depend on it (e.g., backwards-compatibility), but I still want the API to be
  extendable. I've implemented a simple extension mechanism that permits this
  freedom. Anyone can simply query an API structure for a certain extension,
  and if it exists they will get an instance of that extension to work with.
  Otherwise, they get a whole bunch of null.
* [Modular programming](http://en.wikipedia.org/wiki/Modular_programming) can
  be a wonderful thing for an API. When I started, I just had one massive
  project. When I chose [Maven](http://www.blogger.com/) for building, I
  decided to move to a modular design. What I ended up with is a set of modules
  (e.g., API, GUI, XML IO) that are tightly coupled. Right now I'm working on
  decoupling these modules as much as possible and, soon enough, modules will
  depend only on the API module, which is the way it should be.
* I've never really designed anything modularly before, but what I've learned
  is that [dependency injection (DI)](http://en.wikipedia.org/wiki/Dependency_injection) 
  is a beautiful thing. In particular, I make extensive use of
  [service discovery](http://en.wikipedia.org/wiki/Service_locator_pattern) to
  get implementations of what I need. I may eventually look into OSGi, but don't
  want to be bound to it, so I've abstracted away my service discovery
  mechanism so even it too is determined through DI.

It has been a fun time designing this API, and I'm hoping that within two weeks
I'll have it completely modular, and ready to go for Phon. A couple of weeks
after that, it'll be up on my GitHub. I'm really hoping it's something people
will want to use, and if they do, a framework they enjoy working with!
