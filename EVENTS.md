Centralize the documentation of the protocol used to communicate between the
client and the server.


## Notes

- The communication should exclusively be done via object.


## Server

### Broadcast `states`

Emit the states of all the players, every 20ms.

`(Object)`
  - `time (Number)`: The current server timestamp in milliseconds
  - `players (Object[])`
    - `position (Object)`
      - `x (Number)`
      - `y (Number)`
    - `speed (Object)`
      - `x (Number)`
      - `y (Number)`


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
