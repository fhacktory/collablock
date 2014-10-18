Centralize the documentation of the protocol used to communicate between the
client and the server.


## Notes

- The communication should exclusively be done via object.


## Server

### Emit `handshake`

Contain information about the user.

`(Object)`
  - `user (Object)`: the user information
    - `id (Number)`: the user unique identifier
  - `game (String)`: the global game information
  - `states (Object[])`: the players states (id/position/velocity)

### Broadcast (to all but the player) `new_player`

The information about a newly connected player.

`(Object)`
  - `id (Number)`: the player unique id

### Broadcast (to all) `player_left`

The information about a player which recently left.

_Send the same message as `new_player`._

### Broadcast (to all but the player) `state`

The state of a single player.

`(Object)`
  - `id (String)`: the player id
  - `p (Object)`: the player position
    - `x (Number)`: the player x position
    - `y (Number)`: the player y position
  - `v (Object)`: the player velocity
    - `x (Number)`: the player x velocity
    - `y (Number)`: the player y velocity

### Emit `level`

Information about a level. The client should store it and play it when receiving
the `current_level` event.

`(Object)`
  - `name (String)`: the name of the level
  - `data (Object)`: the level data

### Broadcast (to all) `current_level`

Define the current level. The clients should restart a new game at the given
level.

`(Object)`
  - `name (String)`: the name of the level which should be played

### Broadcast (to all): `no_more_levels`

Emitted when they are no more levels to play.

`(Object)`


## Client

### Emit `state`

Update the player position/velocity.

`(Object)`
  - `p (Object)`: the player position
    - `x (Number)`: the player x position
    - `y (Number)`: the player y position
  - `v (Object)`: the player velocity
    - `x (Number)`: the player x position
    - `y (Number)`: the player y position

### Emit `level_finished`

Inform the server that the user finishes the level.

`(Object)`
