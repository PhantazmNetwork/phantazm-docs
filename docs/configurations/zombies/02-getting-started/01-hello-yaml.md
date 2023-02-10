---
id: hello-yaml
title: Hello, YAML!
sidebar_position: 1
description: What is YAML? Basic syntax of YAML...
---

# Hello YAML!
## What is YAML?
Configuration files can exist in a number of different formats. The format used for most Phantazm configuration is called YAML, which is a recursive acronym meaning "YAML Ain't Markup Language". YAML files end in either `.yml` or `.yaml`.

```yml {showLineNumbers}
lineOfText: "This is a line of text in YAML"
lineOfText2: You can write text without quoting it unless you use certain special characters!
listOfValues: [this is the first value, this is the second value]
number: 100
subConfiguration:
  subValue: 10
  subText: this is a bit of nested configuration
listOfObjects:
  - name: This is the first in a list of objects!
    value: 10

  - name: This is the second in a list of objects!
    value: 11
```

The core concept of YAML (or any configuration format for that matter) is the _key-value pair_, which can be thought of as some arbitrary value (types of values include text, a number, a list of values, more key-value pairs, etc.) that is associated with a single _key_, acting as its name.

## Basic Syntax
The key is separated from the value by a colon `:` character, followed by a space. For example:

```yml
isInstaKill: true
```

Here, the key (name) `isInstaKill` is associated with the value `true`. One rule to keep in mind: you (normally) _can't_ have two identical keys in the same indentation level, like below:

```yml
isInstaKill: true
isInstaKill: false
```

Your keys also shouldn't contain spaces. By convention, keep the first letter of the key lowercase, with the first letter of each subsequent word uppercase (this is also known as camelCase).

Lists of values can be defined using square brackets `[` and `]` and separated by commas `,`, or on separate lines by adding the `-` character before the value.

```yml
playersInGame: ["Steank", "TachibanaYui", "Typhoon_Alex"]
playersInGameOnSeparateLines:
  - "Steank"
  - "TachibanaYui"
  - "Typhoon_Alex"
```

Keys can point to additional blocks of configuration. This is used to categorize and organize related groups of values. For example:

```yml
powerupStates:
  instaKill: true
  doubleGold: true
  extraHealth: false

livingPlayers: ["Steank", "TachibanaYui", "Typhoon_Alex"]
```

"Blocks of configuration" are also referred to in this documentation as _objects_. You can have _lists_ of objects, too:

```yml
players:
  - name: "Steank"
    coins: 1000
    isAlive: true

  - name: "TachibanaYui"
    coins: 1000
    isAlive: true

  - name: "Typhoon_Alex"
    coins: 1000
    isAlive: false
```

Note the presence of a `-` character before the first key-value pair in every configuration block. This indicates the block is a member of a list. Therefore, it's acceptable for the keys `name`, `coins`, and `isAlive` to be repeated, even though they are the same indentation level, since they are actually all in their own separate blocks. However, the following example is _not_ valid:

```yml
players:
    - name: "Steank"
      coins: 1000
      isAlive: true

    - name: "TachibanaYui"
      coins: 1000
      coins: 2000
      isAlive: true

    - name: "Typhoon_Alex"
      coins: 1000
      isAlive: false
```

The second entry in the list has the `coins` key twice, which is not allowed.

Now that you understand the basic grammar, it is important to understand the concept of values having _types_. What type you want your value to be will dictate how you define it. For example, if you are trying to define a numeric value, you must _not_ add quotation marks or other extraneous characters. Each type, and how to define them, are listed below.

<table>
  <tr>
    <th>Type</th>
    <th>Examples</th>
    <th>Notes</th>
  </tr>
  <tr>
    <td>Text</td>
    <td>

```yml
name: "this is some text"
otherText: this is some unquoted text
otherOtherText: "this is some double-quoted text"
```
</td>
    <td>

You don't need to quote text with `'`, you can use `"` or nothing at all instead, but due to reasons that will be explained later, you should use `'` for every string unless you know what you're doing. This data type is sometimes referred to as a _string_.
</td>

  </tr>
  <tr>
    <td>Number</td>
    <td>

```yml
value: 10
decimalValue: 1.5
```

</td>
    <td>Numbers must be unquoted.</td>
  </tr>
  <tr>
    <td>Boolean</td>
    <td>

```yml
value: true
otherValue: false
```

</td>
<td>Boolean values are simply binary "yes" or "no" conditions. They must be un-quoted in order to interpret correctly.</td>
  </tr>
  <tr>
    <td>List</td>
    <td>

```yml
values: [10, "some text"]
otherValues:
  - 10
  - "some text"
```

</td>
    <td>

Lists can either be defined using `[` and `]`, and separating entries with `,`, or they can be defined with each entry on a separate line starting with `-`.
</td>

  </tr>
  <tr>
    <td>Blocks</td>
    <td>

```yml
values:
  isOnFire: true
  height: 2
  width: 1
```

</td>
<td>

Blocks must be indented by exactly 4 spaces, and each key-value pair of the indented block must be at the same indentation level as the others. Blocks are sometimes referred to as _maps_, and are said to be "nested", which references how they are indented inside some other area in the configuration file.

</td>
  </tr>
</table>

Finally, YAML configuration has the concept of _comments_. Comments are notes you may leave for yourself or others to clarify what something is doing. Comments are indicated with a `#` character and cause everything after the symbol to be ignored by the computer. You are encouraged to leave descriptive comments whenever possible!

```yml
# This configuration file defines how many coins Steank has!
# This is an example to indicate how to use YML and isn't possible to use for an actual Zombies map.
name: "Steank" # The player's name
coins: 1000 # How many coins they have
isAlive: true # Whether or not they're alive
```

This concludes the basic knowledge you'll need to understand how YML files are structured. However, you should know that the format features some more advanced concepts that won't be covered here. It also has some pitfalls, which the next section will show you how to mitigate.

## YAML Pitfalls

Most of the "issues" with YAML center around two concepts: indentation, and how text values are handled. We'll cover each of them in turn and demonstrate how to avoid running into problems when designing configuration.

### Indentation

Most YAML documents, except for the most simple, will make some use of nested configuration blocks like below:

```yml
equipmentName: pistol
stats: # Stats defines a nested configuration block
  reloadTime: 10
  maxAmmo: 50
  maxClip: 16
```

When working with these, it is _extremely important_ to keep the indentation consistent. Take the below example:

```yml
equipmentName: pistol
stats: # Stats defines a nested configuration block
    reloadTime: 10
    maxAmmo: 50
   maxClip: 16 # maxClip is less indented than its neighbors so this file won't work!
```

Indented key-value pairs should have exactly 4 spaces before them, per each level of indentation needed. However, there is one exception to this, when lists of blocks are involved:

```yml
players:
    - name: "Steank"
      coins: 1000
      isAlive: true

    - name: "TachibanaYui"
      coins: 1000
      coins: 2000
      isAlive: true

    - name: "Typhoon_Alex"
      coins: 1000
      isAlive: false
```

When defining these, include 4 spaces before the `-` symbol, then a single additional space, then the key-value pair. Subsequent key-value pairs in the same block should be aligned with the first.

### Handling of text values

Throughout this tutorial, text has been shown both _with_ and _without_ quotes `"` or `'`. This is arbitrary. in YAML, you can define text either way. However, there are certain problems that can occur if you do not quote text. For one, if your text consists of entirely numerical digits, the computer will assume you mean to define a _number_ rather than some text that happens to contain a number.

```yml
name: 123456 # Interpreted as the number 123456! This can cause issues
```

To fix this, put the value in quotes:

```yml
name: "123456" # This will be read as text, not a number, so we're good
```

Of course, if you're defining something like the amount of ammo a gun has, you will _want_ your values to be interpreted as numbers, and so you should leave the quotes off.

In addition to numbers, there are other problematic values to watch out for when writing text. These include:

- `true`, `false`, `yes`, and `no`
- Text containing special values at the start of the text, like `@`, `:`, and **many** others not listed here
- Text containing `"` or `'`

As you can see, there's a lot of caveats to consider. However, a simple solution is to just quote all text using _single quotes_, like this:

```yml
text: 'This is a quoted string! It can contain special characters, "even quotation marks"'
```

If you want the text to contain a single quote, just type two of them together: `''`. Each pair of quotes inside of some text will be read as only one that is part of the string.

## Summary

- Configuration files consist of key-value pairs.
- Key-value pairs consist of a name and a value.
- Keys start with lowercase values, shouldn't contain spaces, and are separated from the value using a `:`
- Values can be one of several different types:
  - Text (strings)
  - Numbers
  - Booleans (true or false)
  - Lists
  - Blocks (maps)
- Indentation must be kept consistent to avoid issues.
  - Use 4 spaces for each level of indentation
  - When indenting lists of blocks, keep the key-value pairs of the block aligned with each other
- Text should generally be single-quoted, 'like this', unless you know what you're doing.
