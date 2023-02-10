---
id: file-structure
title: File structure
description: How Phantazm organizes configuration files.
---
# Directory and File Structure 

## Configuration file location
On the Minestom server, shop configuration data is stored in `./zombies/maps/[map-name]/shops`. In the client-side mod, it is stored in `./config/mapeditor/[map-name]/shops`.

As of right now, shop files can be named anything. However, it is recommended to end the filename with `.yml`, as that will ensure future compatibility with any code changes that might be made to the file loading system.

## Mapeditor naming convention
The mapeditor mod will name files after the map-origin-relative coordinates of the shop's interaction point. So if its interaction point is `(1, 5, -3)`, the file produced will be named `1_5_-3.yml`. You are free to rename these files as you see fit, as long as it ends in `.yml`.  
