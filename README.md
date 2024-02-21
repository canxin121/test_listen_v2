issue #8916 
pr fix #8930

This example opens two `window` with same front-end code, but the function is related to the current window label, so they are completely independent.

The front-end uses `useEffect` to `listen` a event with the name of the `windowLabel` after the page loads, and `unlisten` to clear the side-effect. The back-end creates a `command fn` called `emit`, which sends a message to the front-end with the eventName `windowLabel`, and clicking the button on the front-end invokes the `emit` command. 