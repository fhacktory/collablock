Centralize the documentation of the protocol used to communicate between the
client and the server.


## Notes

- The communication should exclusively be done via object.


## Server

### Broadcast `states`

The states of all the players, every 20ms.

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

### Broadcast `solved`

Indicate that the current level has been solved.

### Broadcast `level`

Information about a level.

`(Object)`
  - `data (JSON)`


## Client

### Emit `state`

Update the player position/speed in the level.

`(Object)`
  - `position (Object)`
    - `x (Number)`
    - `y (Number)`
  - `speed (Object)`
    - `x (Number)`
    - `y (Number)`

### Emit `solved`
