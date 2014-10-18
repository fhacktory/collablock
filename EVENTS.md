Centralize the documentation of the protocol used to communicate between the
client and the server.


## Notes

- The communication should exclusively be done via object. For each event
  described below, the _Message_ contains the description of each key of this
  object.


## Server

### Broadcast `states`

Emit the states of all the players, every 20ms.

_Message_:

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

_Message_:

  - `position (Object)`
    - x
    - y
  - `speed (Object)`
    - x
    - y
