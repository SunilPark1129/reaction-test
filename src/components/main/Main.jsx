import React, { useState } from "react";
import Start from "../start/Start";
function Intro() {
  const [hasStarted, setHasStarted] = useState(false);

  if (!hasStarted)
    return (
      <section className="flex justify-center flex-col gap-4 text-center">
        <h1 className="text-3xl font-bold">Reaction Speed Test</h1>
        <p className="text-lg max-w-md">
          When a <span className="text-green-700 font-bold">GREEN</span> screen
          appears,
          <br /> press the screen as quickly as possible
        </p>
        <button
          className="w-fit m-auto py-2 px-4 rounded-sm bg-slate-600 text-white cursor-pointer hover:bg-red-500 transition-colors"
          onClick={() => setHasStarted(true)}
        >
          START
        </button>
      </section>
    );

  if (hasStarted) return <Start />;
}

export default function Main() {
  return (
    <main className="h-screen flex justify-center items-center p-4 bg-slate-200 min-h-400 ">
      <Intro />
    </main>
  );
}
