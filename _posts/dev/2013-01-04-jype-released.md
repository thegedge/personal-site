---
title: Jype Released
category: dev
tags: [java, jype]
description: >-
  Small announcement for a new project to maintain generic type information at runtime, which is
  normally unavailable due to type erasure.
---

Sometimes [type erasure](https://docs.oracle.com/javase/tutorial/java/generics/erasure.html) in Java
can be a real pain when you need to know things about generic parameter types at runtime. I created
a simple library for manually describing and checking assignability between types:
[Jype](https://thegedge.github.com/jype).

Clone the repository @ `https://github.com/thegedge/jype.git`
