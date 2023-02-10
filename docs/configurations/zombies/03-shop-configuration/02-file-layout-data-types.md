---
id: file-layout-data-types
title: File layout & data types
description: Describes common data structures to configure shops.
---
# Configuration file layout and data types

Each individual shop configuration file is laid out like this example:

```yml title="./zombies/maps/[map-name]/shops/name.yml" {showLineNumbers}
id: name
triggerLocation: {x: 0, y: 0, z: 0} 
predicateEvaluation: ALL_TRUE
data: {}
```

- `type` field must be a *unique* `Key` representing this shop. 
- `triggerLocation` is a block coordinate pointing to the "trigger" of the shop. This could be a button, regular block, or air; shops can be activated in a number of different ways as defined by their `data`. 
- `predicateEvaluation` helps control when shops are able to be activated. This will be explained in more detail later.
- `data` defines all configurable behavior for the shop. There is a lot that can go here, and it is explained in detail below.

## Keys
Keys are strings such as `minecraft:stone`. They consist of two components: a *namespace* and a *value*. Anything to the left of the `:` is the namespace, and anything to the right is the value. 

Keys can be specified without a namespace. If so, Phantazm will assume the key falls under the `phantazm` namespace. This way, the key `test_map` is considered the same as `phantazm:test_map`.

Keys only permit the characters `a-z` (lowercase only), a single `:` (to separate the namespace and value), `0-9`, and `_`. Additionally, the value may contain `/`, but not the namespace. 

## Vectors
Vectors are simple data types consisting of three numbers. `{x: 0, y: 0, z: 0}` references the *block coordinate* (0, 0, 0). Vectors can sometimes be decimals. Vectors that aren't decimals are referred to as block coordinates, and vectors that can be decimals are referred to as world coordinates. `{x: 0.69, y: 1.5, z: 420.69}` is an example of a world coordinate.

## Sounds
Sounds define a playable sound in Minecraft. Sounds include a type, source, volume, and pitch. They may be defined like this:

```yml
name: minecraft:entity.iron_golem.hurt
source: MASTER
volume: 1.0
pitch: 2.0
```

`source` may be any one of the following values:

* `MASTER`
* `MUSIC`
* `RECORD`
* `WEATHER`
* `BLOCK`
* `HOSTILE`
* `NEUTRAL`
* `PLAYER`
* `AMBIENT`
* `VOICE`

A sound's source determines which volume control it may be modified by.

`volume` is a number ranging from 0 to 2147483647, inclusive. It specifies the radius in which the sound may be heard. 

`pitch` is a number ranging from -1 to 1, inclusive. 

## Flags

Flags are named states that may be cleared (absent) or set (present). Flags may be set on specific players, or they may apply map-wide. Some flags have specific meaning in-game:

* `zombies.map.flag.insta_kill` causes all hits to instantly kill zombies, unless they are configured to resist instakill.

Flags are treated as keys. 

## Flag Action

This data type specifies how to modify a specific flag. It may be one of three values:

* `SET`
* `CLEAR`
* `TOGGLE`

`SET` causes the flag to be set, and unchanged if it is already set. `CLEAR` causes the flag to be cleared, and unchanged if it is already cleared. `TOGGLE` clears the flag if it is set, and sets the flag if it is unset.

## Component

Components are specially-formatted strings that can contain style information, including colors and text decorators. They might look like this:

`<red>This is a message that will be colored red in chat!`

Components are formatted according to the [MiniMessage rules](https://docs.adventure.kyori.net/minimessage/format.html#minimessage-format). To design stylized text more easily, use the [Web UI](https://webui.adventure.kyori.net/).

## Inventory Type

Inventory type is used in inventory-based user interfaces to specify what kind of inventory is opened. There are a set number of inventory types that are usable by Minecraft clients. They are listed below:

* `CHEST_1_ROW`
* `CHEST_2_ROW`
* `CHEST_3_ROW`
* `CHEST_4_ROW`
* `CHEST_5_ROW`
* `CHEST_6_ROW`
* `WINDOW_3X3`
* `ANVIL`
* `BEACON`
* `BLAST_FURNACE`
* `BREWING_STAND`
* `CRAFTING`
* `ENCHANTMENT`
* `FURNACE`
* `GRINDSTONE`
* `HOPPER`
* `LECTERN`
* `LOOM`
* `MERCHANT`
* `SHULKER_BOX`
* `SMITHING`
* `SMOKER`
* `CARTOGRAPHY`
* `STONE_CUTTER`

## Transaction modifiers
Transaction modifiers are themselves keys, like `coin_spend.shop`. Shops that give or take a certain amount of gold may have that amount modified somehow through external sources. For example, imagine a powerup that halves the cost of purchasing shops. Such a powerup would add a modifier to `coin_spend.shop`, which would reduce the cost required to purchase by 50%. There may be more than one modifier applied to a given modifier key, in which case, all of them are applied cumulatively. 

Coin modifiers are hierarchical. One could apply a modifier simply to `coin_spend`, which would apply to all modifiable transactions whose name starts with `coin_spend`. 

Shops can use their own arbitrary coin modifiers, which may interact with other shops, powerups, or perks, assuming the names match. 

Here are some some standard modifiers that are built into the code:

* `coin_gain`: common root modifier for all transactions that should increase coin count
* `coin_gain.mob`: modifier for coins gained from shooting mobs in Zombies
* `coin_gain.window`: modifier for coins gained from repairing windows in Zombies
* `coin_spend`: common root modifier for all transactions that should decrease coin count
* `coin_spend.doors`: modifier for coins spent to open Zombies doors
* `coin_spend.shop`: modifier for coins spent to purchase Zombies shops

It is recommended, though not strictly required, to begin custom modifier names with either `coin_gain` or `coin_spend`, if the player is meant to gain or lose coins, respectively. This is so that modifiers registered to either name may apply globally, as intended. However, if you do not wish for these "global" coin modifiers to apply to your shop, you can start the modifier name with something else.

If you don't want any modifiers to apply, use the modifier `none`. You should also avoid adding any modifiers to `none`, either directly or through inheritance, like `none.something`. 

## Ticks
When it is necessary to measure time, Phantazm uses ticks. A tick is defined as 1/20th of a second. The game, when running at normal speed, processes incremental logic at a rate of 20 ticks per second. This is in line with the standard vanilla Minecraft server.