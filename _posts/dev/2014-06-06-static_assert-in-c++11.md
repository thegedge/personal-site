---
title: static_assert in C++11
category: dev
tags: [c++]
---

A few days ago I realized that some of my template code wasn't that safe. In
particular, my entity system code is heavily templated and allowing just about
anything to be passed in. Of course, most things would generate invalid code
and result in a compile-time error, but sometimes these error messages aren't
very useful.

`static_assert` is a way to make compile-time assertions about, well, anything
you can compute at compile time.

So let's say you have a piece of code that just isn't going to work unless
you're compiling on a system that has a 32-bit word. You could simply add the
following line somewhere in your code:

```cpp
static_assert(sizeof(int) != 4, "32-bit sadface");.
```

Pretty neat, eh? Well, that example is somewhat contrived. For my purposes, I
wanted to make sure that all template parameters in a variadic expansion had
a certain base class. For example, when creating a system you can specific all
of its dependent components:

```cpp
template <class Derived, class ...Dependencies>
class System {}

class PhysicsSystem : public System<PhysicsSystem, Transform, Velocity> {
	// initialize/update code for system here
}
```

So a physics system depends on transform and velocity components and will
update all entities that has both (currently I don't support an optional
dependency, but maybe that's a good thing). The ellipsis (...) in the template
declaration defines what we call a _parameter pack_. In my `Dependencies`
parameter pack I want to make sure everything is a `Component`. Unfortunately,
I had one issue: as far as I know there is no way to ask an all/any style
question in static asserts. Template metaprogramming to the rescue! Here's the
all query I whipped up:

```cpp
// A
template <bool ...Values>
struct all;

// B
template <bool ...Values>
struct all<true, Values...> : all<Values...> {};

// C
template <bool ...Values>
struct all<false, Values...> : std::false_type {};

// D
template <>
struct all<> : std::true_type {};
```

Let's break this down into simpler components. Section A defines the templated
struct that we will use for the all query. Section B specializes for the first
parameter when it is true. In this case we need to keep recursing into the
template until we reach the end or a false value. Section C is for the false
value. In this case there's no need to unpack any more values, so we end the
recursion and inherit from a false-valued type. Section D is the sentinel case.
We only reach this case when we've unpacked all true values, in which case we
inherit from a true-valued type. A fun exercise would be to implement an any
query (hint: short-circuited case gets swapped).

That's a whole lot of words, so how do we use this to test if all of our
dependent component types actually inherit from `Component`:

```cpp
template <class Derived, class ...Dependencies>
class System {
	static_assert(all<std::is_base_of<Component, Dependencies>{}...>{}>,
				  "Every type in Dependencies should inherit from Component");
}
```

`std:is_base_of`is a super useful trait class which you can find in
[type_traits](//en.cppreference.com/w/cpp/header/type_traits), along with many
other useful trait classes. With that `static_assert` in place I get a useful
compile-time error message instead of either a) giving it a non-component type
that happens to have the necessary concepts (not that bad), or b) getting what
will likely be an unhelpful compile-time error message.

Have fun peeps!
