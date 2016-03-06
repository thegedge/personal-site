---           
title: Sleep is lovely
category: dev
tags: [research, c++]
---

So the last week hasn't been particularly productive. I've managed to get my
GPU splatter almost completely working minus one little thing that will be
annoying to handle. I think I'm going to put it off to the side and get to work
on calibrating the camera array we have in the lab. Camera calibration is not
particularly fun, but oh well, it must be done.


I've been refactoring my game engine code lately to abstract the
physics-related code so that I avoid having to deal with Bullet directly. I've
also started working towards my first game. I'm currently happy with the
codebase I have, so diving into a game will really show me whether or not my
design decisions were good or bad. If the latter, then I get a chance to
refactor and learn from my mistakes.

Another thing I've decided is that the "experimental" C++0x stuff in GCC is
awesome, and I've been modifying my code to use some of the useful stuff it
offers. Initializer lists really made certain parts of my code look much nicer
because I get to avoid dealing with `boost::array` and/or `std::vector` when
dealing with static data. Whenever appropriate, I plan on taking advantage of
the new `auto` keyword to make code shorter and more concise; No longer will I
have to write things like `std::vector<sometype>::const_iterator` (or even have
to `typedef` them!). There's a bunch of other small things that are cool too,
like "raw" strings, smart pointers, variadic templates, rvalue references +
move semantics, a null pointer constant, fixes for the "double bracket" issue
with templated types, a foreach loop, and so on!Perhaps one of the things I'm
super excited for, though, are the lambda functions. Alas, I have to wait for
GCC 4.5 to enter the world of stable releases before I can use them.
Nevertheless, I installed the prerelease to play around with them some. I think
a lot of these C++0x features are really going to make C++ code far more
concise, almost like _some things_ in Python. Here's my attempt at writing a
simple "list comprehension" that writes the squares of the numbers from 1 to
10:

{% highlight c++ linenos=table tabsize=4 %}
#include <iostream>
#include <algorithm>
#include <iterator>int main(int argc, char *argv[]) {
	int i = 1;int data[10] = {};
	std::generate(data, data + 10,[&i]() -> int { return (i * i++);  });
	std::copy(data, data + 10, std::ostream_iterator<int>(std::cout, " "));
	std::cout << std::endl;
	return 0;
}
{% endhighlight %}

I don't know about any of you, but I think that's about as concise as one is
going to get in a language like C++. I'm looking forward to playing around with
these lambdas for my simple event processing functions that are registered with
my engine's windowing system. All I ask is that the C++0x standard doesn't
change dramatically between now and its official "release".

Anyways, I actually pulled an all-nighter last night (no reason in particular),
hence the title of this post. Off I go to enjoy some amazing sleep.
