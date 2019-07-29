import React, { useState } from "react";

import WebAssemblyHook from "./WebAssemblyHook";
import "./App.css";

function App() {
  const [goReady, goExpensive] = WebAssemblyHook();
  const [goSpeed, setGoSpeed] = useState(0);
  const [jsSpeed, setJsSpeed] = useState(0);
  const [time, setTime] = useState(1000);

  function myFunTimer(num, cb, setter) {
    let start = Date.now();
    console.log(cb(num));

    setter(Date.now() - start);
  }

  function jsExpensive(num) {
    let result = 1;
    for (let i = 0; i < num; i++) {
      result *= num;

      for (let e = 1; e < num; e++) {
        if (result % 2 == 1) {
          if (result == 0) {
            result = 1 / e;
          } else {
            result /= e;
          }
        }
        result *= num;
      }
    }
    console.log(result);
    return result;
  }
  return (
    <div className="App">
      <header className="App-header">
        <h1>
          Go Evaluated this algorithm {jsSpeed / goSpeed}x faster than
          JavaScript
        </h1>
        <div>
          set time:{" "}
          <input
            type="number"
            value={time}
            onChange={e => setTime(parseInt(e.target.value))}
          />
        </div>
        <h1>ms for go: {goSpeed}</h1>
        <div>
          {goReady ? (
            <button onClick={() => myFunTimer(time, goExpensive, setGoSpeed)}>
              Go Click
            </button>
          ) : (
            "WebAssembly Loading up...."
          )}
        </div>
        <h1>ms for js: {jsSpeed}</h1>
        <div>
          {goReady ? (
            <button onClick={() => myFunTimer(time, jsExpensive, setJsSpeed)}>
              Js Click
            </button>
          ) : (
            "WebAssembly Loading up...."
          )}
        </div>
      </header>
    </div>
  );
}

export default App;
