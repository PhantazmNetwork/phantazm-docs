---
id: interactors-reference
title: Interactors Reference
description: List of all available interactors
---
# Interactors References  
### PlaySoundInteractor
**Name**: `zombies.map.shop.interactor.play_sound`\
**Fields**: `sound` (sound), `broadcast` (boolean)\
**Example**: 
```yml {showLineNumbers}
type: zombies.map.shop.interactor.play_sound
sound: 
    name: minecraft:entity.arrow.hit_player
    source: MASTER
    volume: 1.0
    pitch: 1.0
broadcast: false
```

**Description**: This interactor plays a specific sound. If `broadcast` is false, the sound is played at the player's location. If true, it is played world-wide.

### PlayerFlaggingInteractor
**Name**: `zombies.map.shop.interactor.player_flagging`\
**Fields**: `flag` (key), `action` (flag action)\
**Example**: 
```yml {showLineNumbers}
type: zombies.map.shop.interactor.player_flagging
flag: zombies.map.flag.insta_kill
action: SET
```

**Description**: This interactor is used to set, clear, or toggle a specific flag on the player who activates this shop. 

### OpenGuiInteractor
**Name**: `zombies.map.shop.interactor.open_gui`\
**Fields**: `title` (component), `inventoryType` (inventory type), `guiItems` (string list), `dynamic` (boolean)
**Example**:
```yml {showLineNumbers}
type: zombies.map.shop.interactor.open_gui
title: <red>This is a title!
inventoryType: CHEST_3_ROW
guiItems: [ ./exampleItem ]
dynamic: false

exampleItem:
    type: zombies.map.shop.gui.click_handler.interacting
    clickType: LEFT_CLICK
    blacklist: false
    updatingItem: ./item
    clickInteractor: ./interactor

    item:
        type: zombies.updating_item.static
        item: '{id:"stone",Count:1}'

    interactor:
        type: zombies.map.shop.interactor.messaging
        messages: [ '<red>You clicked on the stone block!' ] 
```

**Description**: This interactor opens up an inventory-based GUI for the interacting player. It can be used as the basis to design a typical Zombies team machine. The above example uses a few additional elements `zombies.updating_item.static` and `zombies.map.shop.interactor.messaging`, which you can read about below.

The `title` parameter specifies the title of the inventory, which is displayed in the upper-left corner. 

The `inventoryType` parameter specifies what kind of inventory is opened. 

`guiItems` is a list of paths to the (interaction-capable?) items present in the user interface.

`dynamic` specifies whether or not the shop should support animated items. It should be set to `false` if there are no animated items in use.

### MessagingInteractor
**Name**: `zombies.map.shop.interactor.messaging`\
**Fields**: `messages` (component list), `broadcast` (boolean)\
**Example**: 
```yml {showLineNumbers}
type: zombies.map.shop.interactor.messaging
messages: 
    - '<red>This is the first message, and is red'
    - '<green>This is the second message, and is green'
broadcast: false
```

**Description**: If `broadcast` is false, this interactor will send the messages specifically to the activating player. Otherwise, every player in the world will receive the messages. Each individual message is sent on a separate line.

### MapFlaggingInteractor
**Name**: `zombies.map.shop.interactor.map_flagging`\
**Fields**: `flag` (key), `action` (flag action)\
**Example**: 
```yml {showLineNumbers}
type: zombies.map.shop.interactor.map_flagging
flag: zombies.map.flag.insta_kill
action: SET
```

**Description**: Works the same as `zombies.map.shop.interactor.player_flagging`, but the flag is applied or cleared globally to or from the entire map, not just the activating player. 

### DelayedInteractor
**Name**: zombies.map.shop.interactor.delayed
**Fields**: `targetPath` (string), `delayTicks` (integer), `resetOnInteract` (boolean
**Example**: 
```yml {showLineNumbers}
type: zombies.map.shop.interactor.delayed
targetPath: ./target
delayTicks: 20
resetOnInteract: false

target: 
    type: zombies.map.shop.interactor.messaging
    messages: [ 'This message will be received by the activating player after a 1-second delay.' ]
    broadcast: false
```

**Description**: This interactor activates another interactor after a set delay. If `resetOnInteract` is true, receiving another interaction during the delay period will cause the interactor to reset the cooldown; otherwise, the new interaction will be ignored. 

### DeductCoinsInteractor

**Name**: zombies.map.shop.interactor.deduct_coins
**Fields**: `cost` (integer), `modifierType` (key)
**Example**: 
```yml {showLineNumbers}
type: zombies.map.shop.interactor.deduct_coins
cost: 100
modifierType: coin_spend
```

**Description**: This modifier will remove some coins from the activating player, after applying any present modifiers added to the given `modifierType`. If `cost` is negative, coins will be added instead.