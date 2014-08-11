---           
layout: post
title: Listening In
category: dev
tags: [java]
---

So it came to our attention recently that our application was making abundant
use of the [Observer/Listener pattern](http://en.wikipedia.org/wiki/Observer_pattern).
For those not familiar with this pattern, you'd use this guy when you want the
outside world to know about state changes in an object. This pattern is used
often when developing with various architectural patterns, such as
Model-View-Controller (MVC). Other examples, in Java, include many of the
components in Swing, `java.util.Observable`, and
`java.beans.PropertyChangeListener`.

<!-- more -->

I personally had issues with the extensive use of the listener pattern for us.
Every time we added a new data class, we'd have to rewrite code for storing and
notifying  the listeners. Note that some of this could have been factored out
into its own class. Nevertheless, if we ever changed the listener interface,
change had to be made for everyone using that interface. Since we use Eclipse,
this isn't too big of an issue, but it still bugged me a little. The final
issue was, sometimes things needed to listen to events on EVERY instance of a
data class, not just a specific instance. To make our lives a little easier,
this required us to create a new type of listener that would be statically
available (read: like a singleton).

My alternative was to create a messaging system. Before I started this
messaging system, I thought about design so that I could generalize it so that
it may be of use to others. A couple of the main design decisions that came up
were:

* There should be a concept of a message sender, receiver, and a delivery
  system to coordinate message sending and receiving.
* There should be registration facilities to allow the system to become as
  type-safe and interface-like as possible.
* Java annotations (retention set to RUNTIME) will be used to define messages
  and receiver methods
* When registering a specific receiver instance to receive messages, weak
  references should be used so that a) the outside world doesn't have to
  concern themselves with unregistering the instance and b) considering (a), so
  that the garbage collector can destroy that instance (when necessary).

A test program I wrote up that uses this message system looks something like
[this](http://www.cs.ualberta.ca/~gedge/other_docs/messaging_test.txt). I
personally find this a reasonably elegant system, for one that uses reflection.
So what do we get out of this? I'll start with the cons (that I can think of)
followed by (what I consider to be) the pros:

* Cons
  * We lose a lot of compile-time error checking
  * We introduce some overhead, mainly due to using the reflection API
* Pros
  * Adding or removing messages (generally) will require less work elsewhere in
  	the code
  * Receivers only need to implement the messages they want to receive
  * Receivers are not required to name their methods as per an interface
  * Receivers can define what I call "catchall" methods, methods that accept
  	all messages from a specified sender (this could also be done using the
  	observable/listener pattern too, but I believe it would be a little less
  	elegant)
  * Receivers define an accept method which allows them to dynamically control
  	which instances they receive messages from

Currently I'm holding on to this until I feel it satisfies the needs of our score editing project completely, but after that I think I'll release it to the public so that someone else might find some use out of it.
