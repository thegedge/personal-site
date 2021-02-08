---
title: Back in Business
category: dev
tags: [score editing, c++, python]
description: A TODO list for the score editor project, and a list of tech I've been using for it.
---

The score editor project has come off the back burner and is now up front. I still have work to do
with regards to my thesis but I expect I'll have that done before mid-summer. Right now the focus is
on the following:

- Completing the port from Java. This task is mostly done, and we just need to implement
  - MIDI playback, and
  - loading/saving of project files.
- Rendering of both scores and tablature.
- Create a website (partially done).
- Fix some bugs and glitchy behaviour.

So not much really. I'm really hoping to get the first public beta out before 2012, so here's
hoping! For anyone interested, here are some of the technologies I'm currently using, all of which I
enjoy:

- [Qt SDK](https://www.qt.io/developers)
  - Qt Libraries
  - Qt Creator (highly recommended for C++ dev)
- [Boost C++ Libraries](https://www.boost.org/)
  - Mostly for Boost Signals, which I prefer over the Qt signals/slots system due to it being far
    more flexible
- [Redmine](https://www.redmine.org/)
  - For internal project management (currently)
- [Django](https://www.djangoproject.com/) + [virtualenv](https://pypi.org/project/virtualenv/)
  - For website dev (I edit everything with [vim](https://www.vim.org/))
- [Inkscape](https://inkscape.org/)
  - For vector graphics, which we use to produce the paths for various shapes (e.g., clefs and
    rests)
- [Git](https://git-scm.com/)
  - For version control, which I highly recommend. Who knew branch-based development could be so
    easy? I also love being able to commit locally, and manually tweaking my commits.
