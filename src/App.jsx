import { invoke } from "@tauri-apps/api/core";
import { useEffect, useState } from "react";
import { listen } from "@tauri-apps/api/event";

export default function App() {
  const [handleTime, setHandleTime] = useState(0);
  function msgHandler(msg) {
    setHandleTime((prev) => prev + 1);
    console.log(msg);
  }
  useEffect(() => {
    let unlistenPromise = listen("event", msgHandler);

    return async () => {
      const unlisten = await unlistenPromise;
      if (unlisten) {
        unlisten()
          .then((rst) => {
            console.log("call unlisten");
          })
          .catch((e) => {
            alert("call unlisten error: " + e);
          });
      }
    };
  }, []);

  return (
    <>
      {/* This button invoke app.emit("event","msg") */}
      <button
        onClick={() => {
          setHandleTime(0);
          invoke("emit", "msg");
        }}
      >
        emit
      </button>
      <h1>handleTime: {handleTime}</h1>
    </>
  );
}
