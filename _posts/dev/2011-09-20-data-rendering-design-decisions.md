---           
title: "Data + Rendering -- Design Decisions"
category: dev
tags: [software engineering, coding]
---

Sorry for the lack of posts over the summer, but it was my time to just relax
and do very little after a lot of hard work to finish my M.Sc. thesis. I've
finally gotten a start on score rendering (see image below). I'm currently at
an interesting point where I have to make a design decision. For a part in a
score there can be multiple staves. For example, a piano score usually has two:
one for treble clef and one for bass clef. For guitar tabs, there is often the
tablature and then the score notation affiliated with this tablature.


My design decision is focused on the best way to structure my data hierarchy
and rendering process to render this. In particular, I'm focused on tablature.
The tricky thing here is the fact that the score and the tab are two different
views of the same data. I have considered two possibilities:

1. Consider score and tablature two different staves that reference the same
set of data. This comes with a set of things to think about:
    * **Pros**
        * The rendering process can blindly render everything.
    * **Cons**
        * Other parts of the program should know that these refer to the same set
          of data (e.g., when saving to file).
        * Right now my data hierarchy is represented using a parent/child
          relationship. Since these two staves point to the same set of bars, each
          bar would technically have two parents. I'd rather not change the way
          things are currently, so I would just have to make sure that in no
          situation it would be a problem getting the initial parent.
        * User will most likely have to manually remove these staves. In other
          words, it might not be easy to implement a "Show Score/Show
          Tablature/Show Both" option. _Maybe this isn't really much of a con?_
        * Without any code that remembers the connection between the two staves,
          the user would be able to insert another staff in between them. Now if
          the user chooses to do this, it's his/her own choice so this may not be a
          bad thing, but it breaks up the connection between the two and the fact
          that they are connected (i.e., by the same data). _Again, maybe this
          isn't really a con?_

2. Restrict this merely to the rendering process
    * **Pros**
        * Does not require any changes to the data hierarchy.
    * **Cons**
        * Less flexible.
        * Most likely will produce sloppier rendering code.
        * Code for user interaction would be uglier. For example, when the user
          clicks on the score rendering component, I need to figure out which staff
          is clicked. I would have to write code that checks the view type
          (score/tab/both) and understands that some staves would be rendered twice
          in the "both" viewing mode.

It's just one of those bigger decisions I have to make early. I'm pretty sure
I'll go with the first one, but I'd like to hear thoughts and/or suggestions
from other people (who I haven't confused yet).

And for those who want to see my latest work, click
[here](http://www.cs.mun.ca/~gedge/dt_soc_test.png) to get a feel for the
current state of score rendering. It's just the basics for now (note
heads/stems), so I have a lot of work to do still (e.g., beams, grace notes).
