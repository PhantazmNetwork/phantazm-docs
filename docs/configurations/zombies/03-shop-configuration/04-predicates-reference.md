---
id: predicates-reference
title: Predicates Reference
description: List of all available predicates
---
# Predicate References 


### UUIDPredicate

**Name**: `zombies.map.shop.predicate.uuid`\
**Fields**: `uuids` (string list), `blacklist` (boolean)\
**Example**:
```yml {showLineNumbers}
type: zombies.map.shop.predicate.uuid
uuids: [
  "6458e77a-f565-4374-9de7-c2a20be572f3",
  "41d2c3c1-8003-48e5-86da-ff8899a58dcd"
]
blacklist: false
```

**Description**: This predicate will only succeed if the player satisfies the filter. The filter can act as a whitelist or a blacklist. If the filter is a whitelist (i.e. `blacklist` field is set to false), the UUID of the player activating the shop must be defined in the list. If the filter is a blacklist, the UUID of the player activating the shop must NOT be defined on the list. 

### TypePredicate 

**Name**: `zombies.map.shop.predicate.type`\
**Fields**: `types` (string list), `blacklist` (boolean)\
**Example**:
```yml {showLineNumbers}
type: zombies.map.shop.predicate.type
types: [
  "zombies.map.shop.interaction.right_click_block",
  "zombies.map.shop.interaction.collide"
]
blacklist: false
```

**Description**: This predicate succeeds only if the interaction type satisfies the filter. A shop that should only be activated by right-clicking on its trigger point would want to whitelist the `zombies.map.shop.interaction.right_click_block` interaction type.

### StaticCostPredicate 

**Name**: `zombies.map.shop.predicate.static_cost`\
**Fields**: `cost` (integer), `modifierType` (string)\
**Example**:
```yml {showLineNumbers}
type: zombies.map.shop.predicate.static_cost
cost: 1000
modifierType: coin_spend.shop
```

**Description**: A predicate that requires the player to have enough coins to afford the given cost. The amount required may be dynamically modified according to `modifierType`. 

### PlayerStatePredicate
**Name**: `zombies.map.shop.predicate.player_state`\
**Fields**: `states` (key list), `blacklist` (boolean)\
**Example**:
```yml {showLineNumbers}
type: zombies.map.shop.predicate.player_state
states: [ phantazm:zombies.player.state.alive ]
blacklist: false
```

**Description**: A predicate that requires the activating player to have a certain *player state*. Players may be in only one state at a time. There are four states built into the game:

* `zombies.player.state.alive`: the state used by living players
* `zombies.player.state.knocked`: the state used by players who have been knocked down and have yet to be revived
* `zombies.player.state.dead`: the state used by players whose revive timer elapsed and have thus "died", but are still in the game as a spectator
* `zombies.player.state.quit`: the state used by players who left the game

Most shops will want to only activate for living players, by whitelisting `zombies.player.state.alive`. 

### PlayerFlagPredicate
**Name**: `zombies.map.shop.predicate.player_flag`\
**Fields**: `flag` (key), `requireAbsent` (boolean)\
**Example**:
```yml {showLineNumbers}
type: zombies.map.shop.predicate.player_flag
flag: phantazm:insta_kill
requireAbsent: false
```

**Description**: This predicate checks for a *flag* on the activating player. A flag is a named condition that may be either absent or present. If the predicate's `requireAbsent` setting is `false`, the activating player must have `flag` present when they activate the shop. If `requireAbsent` is `true` instead, this logic is inverted: the player must *not* have the flag present when they activate the shop, if the predicate is to succeed.

Currently, there are no built-in flags. Custom, arbitrary flags may be set by shop interactors, powerups, or other conditions. 

### MapFlagPredicate
**Name**: `zombies.map.shop.predicate.map_flag`\
**Fields**: `flag` (key), `requireAbsent` (boolean)\
**Example**:
```yml {showLineNumbers}
type: zombies.map.shop.predicate.map_flag
flag: phantazm:insta_kill
requireAbsent: false
```

**Description**: Works identically to `PlayerFlagPredicate`, except the map's flags are checked instead. Map flags apply map-wide and are not player specific.

### EquipmentSpacePredicate
**Name**: `zombies.map.shop.predicate.equipment_space`\
**Fields**: `equipmentKey` (key), `groupKey` (key), `allowUpgrade` (boolean), `mustHoldItemToUpgrade` (boolean), `allowDuplicates` (boolean), `upgradePath` (string), `equipmentPredicatePath` (string)\
**Example**:
```yml {showLineNumbers}
type: zombies.map.shop.predicate.equipment_space
equipmentKey: pistol
groupKey: inventory.group.gun
allowUpgrade: false
mustHoldItemToUpgrade: true
allowDuplicates: false
upgradePath: ./upgrade
equipmentPredicatePath: ./predicate

upgrade:
    type: zombies.map.shop.upgrade_path.linear
    upgrades: [ level0, level1 ]

predicate:
    type: zombies.map.shop.equipment_predicate.upgrade_cost
    baseCost: 500
    upgradeCosts:
        - key: level1
          value: 100
    modifier: coin_spend.shop
```

**Description**: This predicate is used specifically to check if a player has room in their inventory to take a specific piece of equipment, or to upgrade that equipment. Equipment may be guns, perks, skills, or something else entirely, and is generally (though not necessarily) usable via the hotbar.

The `equipmentKey` field specifies the kind of equipment. The `groupKey` field specifies what *inventory group* to attempt to add the equipment to, if upgrading it instead is not possible. Available inventory groups are:

* `inventory.group.gun`
* `inventory.group.perk`
* `inventory.group.skill`

`allowUpgrade` controls whether or not to check for upgrades when determining if the player's inventory may accept the equipment. If it is false, upgrades will not be taken into consideration.

The `mustHoldItemToUpgrade` field causes the predicate to only check if it is possible to upgrade the equipment *if* the player is currently holding equipment of the right type; i.e. In the example above, it would only be possible to upgrade pistol if the player was actually holding it.

The `allowDuplicates` field will cause the predicate to fail if no upgrades are possible, and the player already has the equipment.

`upgradePath`, and `zombies.map.shop.upgrade_path.linear`, specify possible upgrades for the equipment that can be obtained from this shop. For example, a pistol currently at `level0` would be able to upgrade to `level1` from this shop, but if it were at `level1` already, no additional upgrades are possible here. Note that it is allowed for equipment to have multiple, separate possible upgrade choices. 

Finally, `equipmentPredicate` specifies an additional, special condition to be checked if it is determined by this predicate that the equipment seems to be obtainable. The example shows `zombies.map.shop.equipment_predicate.upgrade_cost`, which can be used to establish coin costs for upgrade (or base) levels of equipment. The predicate may only succeed if `equipmentPredicate` also succeeds. It is explained in detail below.

### EquipmentCostPredicate
**Name**: `zombies.map.shop.equipment_predicate.upgrade_cost`\
**Fields**: `types` (key list), `upgradeCosts` (map key -> int), `requireAbsent` (map key -> int), `modifier` (key)\
**Example**:
```yml {showLineNumbers}
type: zombies.map.shop.equipment_predicate.upgrade_cost
baseCost: 500
upgradeCosts:
    - key: level1
      value: 100
modifier: coin_spend.shop
```

**Description**: This is a special predicate which may only be used in combination with `zombies.map.shop.predicate.equipment_space`. Once it is determined that a player has room for a specified piece of equipment, this predicate is queried to determine if it may upgrade (or purchase) the equipment based on the amount of coins a player has.

`baseCost` is the cost of purchasing the equipment outright. This is used as the cost when the player has space for the equipment, and does not already have it (they are not upgrading). 

`upgradeCosts` determines the cost of acquiring each level that should be obtainable from this shop via *upgrading* (that is, the player already has an equipment of that type, and is upgrading it). 

`modifier` is the transaction modifier that should be applied to the transaction in order to determine affordability. 

### InteractingPredicate
**Name**: `zombies.map.shop.predicate.interacting`\
**Fields**: `delegatePath` (string), `interactorPaths` (string list)\
**Example**:
```yml {showLineNumbers}
type: zombies.map.shop.predicate.interacting
delegatePath: ./someOtherPredicate
interactorPaths: [ ./someInteractor ]

someOtherPredicate:
    #...

someInteractor:
    #...
```

**Description**: A predicate which delegates to another predicate, pointed to by `delegatePath`. If the delegate predicate succeeds, the list of interactors is activated, and this predicate succeeds. Otherwise, the interactors are not called.

## Logic Predicates

Logic predicates are special predicates whose result depends on those of one or more additional predicates. 

### AndPredicate
**Name**: `zombies.map.shop.predicate.and`\
**Fields**: `paths` (string list)\
**Example**: 
```yml {showLineNumbers}
type: zombies.map.shop.predicate.and
shortCircuit: false
paths: [ ./someOtherPredicate1, ./someOtherPredicate2 ]

someOtherPredicate1:
    #...

someOtherPredicate2:
    #...
```

**Description**: This predicate will only succeed if all of its dependent predicates also succeed. If `shortCircuit` is true, as the dependent predicates are evaluated in order, if one evaluates to false, the remaining ones *will not be evaluated*.

### OrPredicate
**Name**: `zombies.map.shop.predicate.or`\
**Fields**: `paths` (string list)\
**Example**: 
```yml {showLineNumbers}
type: zombies.map.shop.predicate.or
shortCircuit: false
paths: [ ./someOtherPredicate1, ./someOtherPredicate2 ]

someOtherPredicate1:
    #...

someOtherPredicate2:
    #...
```

**Description**: This predicate will only succeed if at least one of its dependent predicates succeeds. If `shortCircuit` is true, as the dependent predicates are evaluated in order, if one evaluates to true, the remaining ones *will not be evaluated*.

### XorPredicate
**Name**: `zombies.map.shop.predicate.xor`\
**Fields**: `paths` (string list)\
**Example**: 
```yml {showLineNumbers}
type: zombies.map.shop.predicate.xor
shortCircuit: false
paths: [ ./someOtherPredicate1, ./someOtherPredicate2 ]

someOtherPredicate1:
    #...

someOtherPredicate2:
    #...
```

**Description**: This predicate will only succeed if exactly one of its dependent predicates succeeds. If `shortCircuit` is true, as the dependent predicates are evaluated in order, if more than one predicate evaluates to true, remaining predicates are not evaluated.

### NotPredicate
**Name**: `zombies.map.shop.predicate.not`\
**Fields**: `predicate` (string)\
**Example**: 
```yml {showLineNumbers}
type: zombies.map.shop.predicate.not
predicate: ./someOtherPredicate1 

someOtherPredicate1:
    #...
```

**Description**: This predicate will only succeed if its dependent predicate fails, and vice-versa.