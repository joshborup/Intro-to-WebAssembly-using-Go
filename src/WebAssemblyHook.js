import React, { useEffect, useState } from "react";
const go = new window.Go();
let inst, mod;

export default function WebAssemblyHook() {
  const [ready, setReady] = useState(false);
  async function runIt() {
    go.run(inst)
      .then(data => {
        console.log(data);
        WebAssembly.instantiate(mod, go.importObject).then(myReset => {
          console.log(myReset.exports);
          inst = myReset;
        });
      })
      .catch(err => console.log(err));
  }
  useEffect(() => {
    if (WebAssembly) {
      fetch("/main.wasm")
        .then(response => {
          return response;
        })
        .then(resp => {
          resp.arrayBuffer().then(buffer => {
            WebAssembly.instantiate(buffer, go.importObject).then(obj => {
              mod = obj.module;
              inst = obj.instance;
              runIt().then(insta => {
                console.log(insta);
                setReady(true);
              });
            });
          });
        });
    }
  }, [inst, mod]);

  return [ready, window._myExpensiveGO];
}
