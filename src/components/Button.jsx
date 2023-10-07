import React from "react";

export default function Button({ setNewGame }) {
  return (
    <div>
      <button
        className="px-4 py-2 rounded-sm transition-colors bg-slate-600 text-white hover:bg-red-400"
        onClick={() => setNewGame(true)}
      >
        New Game
      </button>
    </div>
  );
}
