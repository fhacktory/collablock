Centralize the documentation of the protocol used to communicate between the
client and the server.


## Notes

- The communication should exclusively be done via object.


## Server

### Emit `handshake`

Contain information about the user.

`(Object)`
  - `id (String)`: the player unique id

### Broadcast (to all but the player) `new_player`

The information about a newly connected player.

_The message is the same as for `handshake`._

### Broadcast (to all) `player_leaved`

The information about a player which recently leaved.

_The message is the same as for `handshake`._

### Broadcast (to all) `states`

The states of all the players.

`(Object)`
  - `time (Number)`: The current server timestamp in milliseconds
  - `level (Number)`:
  - `players (Object)`
    - `PLAYER_ID (String)`
      - `position (Object)`
        - `x (Number)`
        - `y (Number)`
      - `speed (Object)`
        - `x (Number)`
        - `y (Number)`

### Emit `level`

Information about a level.

`(Object)`
  - `name (String)`: the name of the level
  - `data (Object)`: the level data


## Client

### Emit `state`

Update the player position/speed in the level.

`(Object)`
  - `player (Object)`
    - `position (Object)`
      - `x (Number)`
      - `y (Number)`
    - `speed (Object)`
      - `x (Number)`
      - `y (Number)`
