import { invoke } from "@tauri-apps/api/core";
import { useEffect, useState } from "react";
import { listen } from "@tauri-apps/api/event";
import { getCurrent, getAll } from "@tauri-apps/api/window";

const CrtWindow = getCurrent();
let windowLabel = CrtWindow.label;
export default function App() {
  const [handleTime, setHandleTime] = useState(0);
  useEffect(() => {
    function msgHandler(msg) {
      setHandleTime((prev) => prev + 1);
      console.log(msg);
    }
    const cleanUp = () => {
      unlisten.then((func) => {
        func();
      });
    };
    const unlisten = listen(windowLabel, msgHandler);
    return cleanUp;
  }, []);

  useEffect(() => {
    window.crtWindow = CrtWindow;
  }, []);
  return (
    <div>
      <h1>{windowLabel}</h1>
      <h1>handleTime: {handleTime}</h1>
      <button
        onClick={() => {
          setHandleTime(0);
          invoke("emit", { label: windowLabel });
        }}
      >
        emit
      </button>
      <button
        onClick={() => {
          invoke("plugin:event|unlisten_all")
            .then()
            .catch((e) => {
              console.error("Failed to clear residual listensers: " + e);
            });
        }}
      >
        clear listeners
      </button>
    </div>
  );
}
