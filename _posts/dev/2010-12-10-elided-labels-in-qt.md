---
title: Elided Labels in Qt
category: dev
tags: [qt, c++]
description: How to create a QLabel that elides text with an ellipsis.
---

So for one of my projects I was dissatisfied with the fact that a `QLabel` whose horizontal size
policy is `Qt::Ignored` will have its text clipped instead of having an ellipsis at the end (or
somewhere in there). I whipped together a simple extension to `QLabel` that puts an ellipsis at the
end based on the current size of the label. It's not complete in general (e.g., doesn't really
support multiple lines), but for me it gets the job done. Feel free to use this code for whatever
purpose you please (i.e., it's in the public domain).

- [elidedlabel.hpp](https://github.com/thegedge/StereoReconstruction/blob/master/gui/widgets/elidedlabel.hpp)
- [elidedlabel.cpp](https://github.com/thegedge/StereoReconstruction/blob/master/gui/widgets/elidedlabel.cpp)
