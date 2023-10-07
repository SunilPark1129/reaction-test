import React, { useEffect, useState } from "react";
import Button from "../Button";

const MAX_MS = 4000;
const MIN_MS = 1000;
const GAME_ROUND = 3;

let timerId, startTime;

export default function Start() {
  const [newGame, setNewGame] = useState(true);
  const [times, setTimes] = useState([]);
  const [timeToPress, setTimeToPress] = useState(false);
  const [record, setRecord] = useState([]);
  const [gameover, setGameover] = useState(false);

  // starting a new game
  useEffect(() => {
    if (newGame) {
      const TempArr = [];
      setGameover(false);
      setTimeToPress(false);
      setRecord([]);
      for (let i = 0; i < GAME_ROUND; i++) {
        const randomNum = Math.floor(
          Math.random() * (MAX_MS - MIN_MS) + MIN_MS
        );
        TempArr.push(randomNum);
      }
      setTimes(TempArr);
    }
  }, [newGame]);

  // record current time
  useEffect(() => {
    if (times.length !== 0) {
      timerId = setTimeout(() => {
        setTimeToPress(true);
        startTime = Date.now();
      }, times[0]);
    }
    return () => {
      clearTimeout(timerId);
    };
  }, [times]);

  function resetFn() {
    setNewGame(false);
    setTimes([]);
    setTimeToPress(false);
    setRecord([]);
  }

  function colorClickHandler() {
    if (timeToPress) {
      // calculating time it spent
      const total = (Date.now() - startTime) / 1000;
      setRecord((prev) => [...prev, total]);

      // preparing for the next round
      setTimeToPress(false);
      setTimes((prev) => prev.slice(1));
      if (times.length === 1) setNewGame(false);
    } else {
      // when the game is over by mistake
      resetFn();
      setGameover(true);
    }
  }

  /* Game is running */
  if (newGame)
    return (
      <div
        className={`w-full h-full relative cursor-pointer rounded-md select-none ${
          !timeToPress && times.length !== 0 ? "bg-red-400" : "bg-green-400"
        }`}
        onClick={colorClickHandler}
      >
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-4xl pointer-events-none">
          {timeToPress ? "PRESS" : "READY"}
        </div>
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-4">
          {new Array(GAME_ROUND).fill().map((_, idx) => (
            <div
              key={idx}
              className={`w-2 h-2 rounded-full transition-colors ${
                idx < record.length ? "bg-slate-950" : "bg-gray-200"
              }`}
            ></div>
          ))}
        </div>
      </div>
    );

  if (gameover)
    return (
      <div className="w-full h-full flex flex-col justify-center items-center text-center gap-4">
        <p className="text-lg">
          You pressed in <span className="text-red-600 font-bold">wrong</span>{" "}
          timing
        </p>
        <p>
          You should not press when the screen is{" "}
          <span className="text-red-600 font-bold">red</span> but press when it
          turns <span className="text-green-600 font-bold">green</span>.
        </p>
        <Button setNewGame={(bool) => setNewGame(bool)} />
      </div>
    );

  /* When game is completed */
  if (!newGame) {
    let total = 0;
    for (let c of record) {
      total += c;
    }
    const avg = (total / GAME_ROUND).toFixed(3);
    let above;

    if (0.6 < avg) {
      above = 95;
    } else if (0.5 < avg) {
      above = 85;
    } else if (0.4 < avg) {
      above = 65;
    } else if (0.35 < avg) {
      above = 45;
    } else if (0.3 < avg) {
      above = 25;
    } else if (0.25 < avg) {
      above = 10;
    } else if (0.2 < avg) {
      above = 2;
    } else if (0.15 < avg) {
      above = 0.1;
    } else if (0.1 < avg) {
      above = 0.001;
    } else {
      above = 100;
    }

    return (
      <div className="w-full h-full flex flex-col justify-center items-center text-center gap-2 lg:gap-4">
        <p className="font-bold text-2xl ">Test Result</p>
        <p>
          Your Score is
          <br />
          <span className="font-bold text-lg">{avg}</span> ms
        </p>
        <p>
          Your skills are in the top
          <br />
          <span className="text-red-700 font-bold text-3xl">{above}</span>%
          <br />
          of the average skilled individuals
        </p>
        <div>
          <p className="font-bold">Records</p>
          <ul>
            {record.map((item, idx) => (
              <li key={idx}>{item} ms</li>
            ))}
          </ul>
        </div>
        <Button setNewGame={(bool) => setNewGame(bool)} />
      </div>
    );
  }
}
