---
title: Components, systems, subsystems, entities...*collapses*
category: dev
tags: [software engineering]
description: A discussion on entity/component systems.
---

So I've recently been reading into various articles and forum topics on Component-Based design, or
Entity Systems (ES). This concept was probably first used in games when the first Dungeon Siege came
out. Apparently it's closest neighbour is possibly that of Aspect-Oriented programming, which I know
zero about. At first it seems like a complicated idea, but after I looked through a bunch of info on
the net, I think I got the basic idea. Here's my attempt at giving an eagle-eye view of what it is,
or rather, what I think it is in the context of a game.

You have three major concepts: entities, components, and systems.

<!-- prettier-ignore-start -->
Entity
: An entity is a collection of components. These components describe how an entity functions.
In terms of a game, an entity is a single instance of an object that exists in your game. So if you
have two tanks of the same "type" in your game, you have two entities. Entities do not store data or
contain logic. They are simply a means of identifying something.

Components
: Components are the basic building blocks for entities. They store information and
contain the functionality specific to their existence. For example, you might have a `Renderable`
component in your game which contains all of the logic necessary for the rendering system to display
an entity on the screen.

System
: Systems have their own set of logic specific to the components that correspond to. I think
it is technically possible to implement all of the logic in the system and the component simply be a
data container, but I don't think I would like such a design. Often there is a \[nearly\] one-to-one
correspondence between systems and components. You may have a `RenderSystem` to store all
`Renderable` components and display them when necessary in your game loop. You could also have a
`PhysicsSystem`, `AnimationSystem`, and so on.
<!-- prettier-ignore-end -->

That's my stab at defining those three concepts. The main task in designing your
system/game/whatever is to follow the "separation of concerns" idea, each "concern" often mapping to
a component/system duo.

So what do you get out of this? Well one thing, it's great for a large development team because, for
example, the programmers can offer the game designers a set of components that they can freely use
to construct a multitude of objects. These components can be added to an object at runtime to give a
dynamic design.

For example, let's say you have a `Targetable` component which allows the player to select an entity
as a target for his/her attacks. Well, let's say we have an NPC that is neutral to the player, but
the player does something to provoke the NPC into a battle situation. All we have to do now is
attach the `Targetable` component to this NPC and we're done. The logic surrounding what the player
can and cannot attack is simply encapsulated in that component. In the classical OOP approach we
would have to define an `ITargetable` interface that says whether or not the object described by the
class is `Targetable`. With ES the existence of a `Targetable` component on an entity implicitly
tells us that the entity can be targeted. With the OOP style, we have to store a variable to say if
that object is `Targetable` or not at a specified time.

What one finds in this design is that the deep hierarchy often found in an OOP design is now almost
completely flat. Object composition/aggregation is now one's guiding principle. Is this a good thing
or a bad thing? One difficulty that often arises is inter-component communication, generally within
entities. One could have these components store pointers/references to each other, register
callbacks with each other, or use some messaging system to communicate. An example of such
communication that seems to often arise is with a physics component. When updated, often
animation/spatial components need to be notified of the result.

Well I'm really not sure at the moment whether this design is good or bad, but I think I'm going to
give it a shot and document what I find. Things are slow-going with my game \[engine\] project
because it's something I just pick at from time to time. I have no intention on getting a product
out the door right away, so I use it to play with new ideas.

The reason I posted this entry was to look for other people's thoughts on this design style, and to
give some concrete pros/cons from one's own experience. I'd love to hear about anything surrounding
this topic, which includes other design patterns and styles that one found useful in one's own
project.
