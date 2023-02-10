---
id: hello-element
title: Hello, Element!
sidebar_position: 2
description: Introduction to Element - The vains of Phantazm Server
---
# Element

## Introduction
Element is the name of a bespoke software library Phantazm uses for defining certain types of complex behaviors in configuration files, so that they can be easily edited and modified without having to dig into the code. *Elements*, or *element objects*, refer to individual configuration blocks that define a particular aspect of gameplay. 

:::caution
Element is still in an early stage of development. This document will be updated as necessary to include any changes that impact configuration.
:::


## Simple configuration

Here is an example of an actual element block used as part of powerup configuration:

```yml {showLineNumbers}
type: zombies.powerup.action.modify_windows
radius: 10
shouldBreak: true
```

Let's break down how this is structured. *All* element objects contain a key named `type`. `type` is a string that defines what element you're trying to use. You can't use any string you want; they are defined in the code, and each does a different thing. For example, `zombies.powerup.action.modify_windows` breaks or repairs windows in a given radius (measured from the powerup). 

After the type key comes the configuration of the element, known as its *fields*. Here is where you choose parameters that influence how the element behaves. In this case, you can choose to either break or repair windows, and specify a radius inside which this effect will take place.

However, not all elements are as simple as this. If they were, the configuration system wouldn't be very powerful! Certain element types allow you to define complex behavior by linking to other elements using *paths*. 

## Complex configuration

Here's another actual example, this time from shop configuration:

```yml {showLineNumbers}
type: zombies.map.shop.predicate.interacting
delegatePath: ./delegate
interactorPaths: [ ./firstInteractor, ./secondInteractor ]

delegate: 
    type: zombies.map.shop.predicate.uuid
    uuids: [ '6458e77a-f565-4374-9de7-c2a20be572f3' ]
    blacklist: false

firstInteractor:
    type: zombies.map.shop.interactor.messaging
    messages: [ 'You're Steank, and you activated this shop.' ]
    broadcast: false

secondInteractor:
    type: zombies.map.shop.interactor.messaging
    messages: [ 'Steank activated a completely useless shop.' ]
    broadcast: true
```

First, a bit of clarification. The element `zombies.map.shop.predicate.interacting` is a *shop predicate*. What shop predicates are is explained in detail in the shop configuration page. Simply put, they are conditions that are checked in order to determine if a player attempting to activate a shop should be able to do so. `zombies.map.shop.predicate.interacting` is a special kind of predicate that checks *another* predicate, and, if the delegate passes its check, activates an *interactor*. Shop interactors are elements that perform an action, which can be anything from giving the player equipment, taking coins from them, or broadcasting a message in chat.

Now let's break down what the above example actually does. We have the element `zombies.map.shop.predicate.interacting`, which delegates to an element of type `zombies.map.shop.predicate.uuid`, which is also a shop predicate. This one checks the UUID of the activating player against a list of configurable UUIDS, which can function as either a whitelist or a blacklist. This one has `blacklist: false`, so it acts as a whitelist, meaning it will only succeed if activated by a player with the UUID `6458e77a-f565-4374-9de7-c2a20be572f3`. 

Let's assume the activating player has the right UUID, so the predicate does pass. Then, the element `zombies.map.shop.predicate.interacting` moves on to activate the *interactors*. There are two of them defined: `firstInteractor` and `secondInteractor`. They are activated in the order in which they appear in the configuration file.

`firstInteractor` is a shop interactor of type `zombies.map.shop.interactor.messaging`, which sends a message in chat. It has `broadcast: false`, meaning it only sends a message to the activating player. 

`secondInteractor` is another shop interactor, also of type `zombies.map.shop.interactor.messaging`. It sends a *different* message, and has `broadcast: true`, meaning it sends the message to all players in the game. 

So, assuming the activating player has the right UUID, they will receive the message `You're Steank, and you activated this shop.` in chat, and everyone in the game will receive the message `Steank activated a completely useless shop.`. 

However, if the activating player did *not* have the right UUID, nothing would happen, because that is how `zombies.map.shop.predicate.interacting` works -- it only calls its interactors if its linked predicate succeeds.

## Path syntax

The previous example showed a lot of linked elements. One element may link to another by using a specially-formatted path string. Path strings are like filesystem paths, but for configuration files. A path consists of various *names* separated by a forward slash `/`. Each name can refer to a key, an index of a list, *or* it can be a special command. There are two recognized commands: `.` and `..`. Both are used to make a path relative to the element it is a part of.

### Relative vs Absolute Paths

Paths can be either relative or absolute. A path is relative if it starts with a `.` or `..`. A path is absolute if it starts with any other character. 

Absolute paths start at the root of the configuration. This is *usually* the top level of the file the element is contained in:

```yml {showLineNumbers}
someNestedElement:
    type: zombies.map.shop.predicate.interacting
    delegatePath: /parent/delegate
    interactorPaths: [ ]

parent:
    delegate: 
        # ...
```

`delegatePath` starts with a `/`, so it looks for a key named `parent` at the root of the configuration. In the case of shops, this is the outermost indentation level of the file.

`parent` exists, so it then looks for a key named `delegate` inside `parent`. Such a key exists, and there is are no more path names to check, so we've located our linked element.

Now, a simple relative path:

```yml {showLineNumbers}
someNestedElement:
    type: zombies.map.shop.predicate.interacting
    delegatePath: ./parent/delegate
    interactorPaths: [ ]

    parent:
        delegate: 
            # ...
```

This time, `delegatePath` starts with a `.`. This command essentially means "check for the next path key in the same indentation level as the current element". So, with that in mind, we check for a key named `parent` at the same indentation level as our element. As you can see, such a key exists, so we move on as usual, checking for a key named `delegate` inside `parent`. There is one, so we successfully located our linked element.

Finally, the other kind of relative path:

```yml {showLineNumbers}
outer:
    someNestedElement:
        type: zombies.map.shop.predicate.interacting
        delegatePath: ../parent/delegate
        interactorPaths: [ ]

    parent:
        delegate: 
            # ...
```

Firstly, the path starts with `..`, so it means we're evaluating a path relative to the element in which it is defined. `..` means "check for the next path key an indentation level below the current element". With that in mind, we check for a key named `parent`. The indentation level of our current element is 2, so we want to check for `parent` at indentation level 1. It exists, so we move on to `delegate`, now searching inside `parent`, and we've found our element. 

Note: When using a path to refer to an index of a list, the *first* element of the list can be accessed with the name `0`, the second `1`, and so on.

:::caution
In general, when configuring, you should **avoid** using absolute paths. Recall that it was said the root of the configuration is *usually* the lowest indentation level in the current file. However, this is not necessarily the case. Future changes to the codebase might bulk-load elements from an entire directory tree, in which case an absolute path would point somewhere completely different, but relative paths would work unchanged. However, such a change would also allow one to reference elements in completely different files, for enhanced organization. 
:::


### Justification
 
Paths are useful because they allow you to structure and organize your configuration files however you want. It also reduces potential duplication: you may want to have two different elements link to the same element. Since this "structure" is defined in configuration and not Phantazm's code, it can be changed more easily, on a per-file basis, without the risk of breaking other files.

## Summary

* "Elements" are blocks of configuration that define specific behaviors
  * All elements have a `type` field, which defines what they do
  * Their behavior can be further customized by modifying their fields
* Elements can link to other elements using paths.
  * Path can be either relative or absolute
  * Absolute paths start at the lowest indentation level (0 indentation)
  * Relative paths starting with only `.` are evaluated from the indentation level of the element they are contained in 
  * Relative paths starting with `..` are evaluated from one indentation level lower than the element they are contained in
* Documentation for all of the element types, as well as what they do, can be found in their appropriate wiki pages
* Avoid using absolute paths