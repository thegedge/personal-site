---           
layout: post
title: Manatee Released
category: dev
tags: [java, manatee]
---
When I was digging through some of my old Java code I came across a messaging
system I developed for an old application I was working on. I decided to pick
it up and make it usable, hence [Manatee](http://thegedge.github.com/manatee).
Feel free to clone the repository `git://github.com/thegedge/manatee.git`, or
check out the
[example](https://github.com/thegedge/manatee/tree/master/examples/main/java/ca/gedge/manatee).

<!-- more -->

## Why call it Manatee?

The messaging system makes use of annotations to establish messages and
connections, so the name is a merging of "message" and "annotations". It was my
attempt at being clever, which everyone seems to be doing these days with their
project names (I apologize).

## Why use Manatee?

It's not a powerful messaging API, if that's what you're looking for, but it is
lightweight and simple. If all you want is a simple way to pass messages around
within an application, Manatee will get the job done. All you do is annotate
your messages that you send, and the methods that will receive them.
Instantiate a message delivery system, add the receiver instances, and then use
the system to send messages. There's some basic checks to make sure that the
signature of a message matches the signature of the receiving method. Hopefully
in time I can make things more robust.

