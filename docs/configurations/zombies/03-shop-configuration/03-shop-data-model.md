---
id: shop-data-model
title: Data model
description: Describes common data structures to configure shops.
---
# Data model
Each shop can have any number of predicates, interactors, and displays. They can be defined in the `data` field like this:

```yml title="./zombies/maps/[map-name]/shops/name.yml" {showLineNumbers}
id: name
triggerLocation: {x: 0, y: 0, z: 0} 
predicateEvaluation: ALL_TRUE
data: 
# highlight-start
  predicates: [
    # predicates
  ]
  successInteractors: [
    # interactors to be called on success
  ]
  failureInteractors: [
    # interactors to be called on failure
  ]
  displays: [
    # shop displays
  ]
# highlight-end
```

Shops are composed of three kinds of conceptual building blocks: *displays, interactors, and predicates*. These components interact to define the shop's behavior. 

## Displays

Displays define any visual effects a shop might need. This could include holograms to display text, a floating item (possibly with animations), or some other effect. 

## Interactors

Interactors define what a shop *does* once it is activated. This might include giving the player a new weapon, upgrading an existing weapon, activating power, displaying a GUI with more options, or something else entirely. There are two sets of interactors: those called on interaction failure, and those called on interaction success. Some useful interactions to call on failure might be playing a sound or sending a message to indicate that the shop wasn't activated, and why.

Shops can be configured to accept a variety of different interaction types. These include right-clicking, colliding, and inventory clicking. The latter is only useful for GUI-based shops. Interaction types have names. The predefined names (i.e. the ones used by Phantazm) are as follows:

**Right-click:** `zombies.map.shop.interaction.right_click_block`\
**Inventory click:** `zombies.map.shop.interaction.click_inventory`\
**Collide:** `zombies.map.shop.interaction.collide`

:::info
All available interators can be found in the [Interactors Reference](./interactors-reference)
:::
## Predicates

A shop's predicates are used to determine if a shop was successfully activated. A simple predicate would be only letting a player upgrade their weapon if they have enough gold to do so. If a shop's predicates "fail", the shop's failure interactors will be called; otherwise, the success interactors will be called.

The `predicateEvaluation` field controls how multiple predicates are evaluated when determining if a shop should successfully or unsuccessfully interact. It may be set to one of two values:

* `ALL_TRUE`
* `ANY_TRUE`

If it is set to ALL_TRUE, then *every* predicate must succeed in order for the shop to call its success interactors. If it is set to ANY_TRUE, then only *one* predicate needs to succeed for this to happen.

:::info
All available interators can be found in the [Predicates Reference](./predicates-reference)
:::