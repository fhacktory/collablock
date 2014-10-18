Centralize the documentation of the protocol used to communicate between the
client and the server.


## Notes

- The communication should exclusively be done via object.


## Server

### Emit `handshake`

Contain information about the user.

`(Object)`
  - `id (String)`: the player unique id
  - `level (String)`: the level name
  - `players (Object[])`: the players states

### Broadcast (to all but the player) `new_player`

The information about a newly connected player.

_The message is the same as for `handshake`._

### Broadcast (to all) `player_left`

The information about a player which recently left.

_The message is the same as for `handshake`._

### Broadcast (to all but the player) `state`

The states of a single player.

`(Object)`
  - `id (String)`: the player id
  - `position (Object)`
    - `x (Number)`
    - `y (Number)`
  - `velocity (Object)`
    - `x (Number)`
    - `y (Number)`

### Emit `level`

Information about a level. The client should store it and play it when asked by
the `current_level` event.

`(Object)`
  - `name (String)`: the name of the level
  - `data (Object)`: the level data

### Emit `current_level`

Define the current level. The clients should restart on the given level.

`(Object)`
  - `name (String)`: the name of the level which should be played


## Client

### Emit `state`

Update the player position/velocity in the level.

`(Object)`
  - `position (Object)`
    - `x (Number)`
    - `y (Number)`
  - `velocity (Object)`
    - `x (Number)`
    - `y (Number)`

### Emit `level_finished`

Inform the server that the user finishes the level.

`(Object)`
