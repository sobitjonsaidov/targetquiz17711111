import { useState, useEffect } from "react";
import { QUESTIONS } from "./data/questions";
import { FaSun, FaMoon } from "react-icons/fa";
import logo from "./assets/itschool.png";
import Question from "./components/Question";

const TOTAL_TIME = 20 * 60;

export default function App() {
  const [time, setTime] = useState(TOTAL_TIME);
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [finished, setFinished] = useState(false);
  const [dark, setDark] = useState(false);

  // Light/Dark toggle
  useEffect(() => {
    if (dark) document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
  }, [dark]);

  // Timer
  useEffect(() => {
    if (finished) return;
    if (time <= 0) return setFinished(true);

    const timer = setInterval(() => setTime((prev) => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [time, finished]);

  const choose = (i) => setAnswers({ ...answers, [index]: i });

  const score = Object.entries(answers).reduce(
    (s, [i, v]) => s + (QUESTIONS[i]?.a === v ? 1 : 0),
    0
  );

  const level =
    score <= 25
      ? "Beginner"
      : score <= 35
      ? "Elementary"
      : score <= 45
      ? "Pre-Intermediate"
      : "Intermediate";

  // Wrapper va card classlari
  const wrapperClasses = `min-h-screen flex flex-col items-center justify-center transition-colors duration-300 px-4 sm:px-6 md:px-8 ${
    dark ? "bg-slate-900" : "bg-slate-200"
  }`;

  const cardClasses = `text-center w-full max-w-md sm:max-w-lg md:max-w-2xl mx-auto rounded-2xl shadow p-6 select-none transition-colors duration-300 
    ${dark ? "bg-slate-800 text-white" : "bg-white text-gray-900"}`;

  const toggleBtnClasses = `mb-6 px-4 py-2 rounded-xl transition-colors duration-300 ${
    dark ? "bg-slate-700 text-white" : "bg-slate-400 text-gray-900"
  }`;

  if (finished) {
    return (
      <div className={wrapperClasses}>
        <div className="w-full flex mb-6">
          <button
            onClick={() => setDark(!dark)}
            className={`relative w-20 h-10 rounded-full transition-colors duration-300 ${
              dark ? "bg-gray-700" : "bg-slate-500"
            } ml-auto mr-6`}
          >
            <div
              className={`absolute top-1 left-1 w-8 h-8 rounded-full bg-white shadow-md flex items-center justify-center transition-transform duration-300 ${
                dark ? "translate-x-10" : "translate-x-0"
              }`}
            >
              {dark ? <FaMoon className="text-slate-400" /> : <FaSun className="text-slate-400" />}
            </div>
          </button>
        </div>

        <img
          src={logo}
          alt="Logo"
          className="w-40 sm:w-48 md:w-52 lg:w-56 xl:w-64 mb-6 object-contain mx-auto"
        />

        <div className={cardClasses}>
          <h1 className="text-2xl font-bold mb-4">Result</h1>
          <p className="text-lg">Score: {score}</p>
          <p className="text-xl font-semibold mt-2">Level: {level}</p>
        </div>
      </div>
    );
  }

  return (
    <div className={wrapperClasses}>
      <div className="w-full flex mb-6">
        <button
          onClick={() => setDark(!dark)}
          className={`relative w-20 h-10 rounded-full transition-colors duration-300 ${
            dark ? "bg-gray-700" : "bg-slate-500"
          } ml-auto mr-6`}
        >
          <div
            className={`absolute top-1 left-1 w-8 h-8 rounded-full bg-white shadow-md flex items-center justify-center transition-transform duration-300 ${
              dark ? "translate-x-10" : "translate-x-0"
            }`}
          >
            {dark ? <FaMoon className="text-slate-400" /> : <FaSun className="text-slate-400" />}
          </div>
        </button>
      </div>

      <img
        src={logo}
        alt="Logo"
        className="w-40 sm:w-48 md:w-52 lg:w-56 xl:w-64 mb-6 object-contain mx-auto"
      />

      <div className={cardClasses}>
        <div className="flex justify-between mb-4 text-sm text-inherit">
          <span>
            Question {index + 1}/{QUESTIONS.length}
          </span>
          <span>
            ⏱️ {Math.floor(time / 60)}:{String(time % 60).padStart(2, "0")}
          </span>
        </div>

        <Question question={QUESTIONS[index]} selected={answers[index]} choose={choose} />

        <div className="flex justify-between mt-6">
          <button
            onClick={() =>
              index + 1 === QUESTIONS.length ? setFinished(true) : setIndex((i) => i + 1)
            }
            className="px-4 py-2 rounded-xl bg-slate-600 text-white"
          >
            {index + 1 === QUESTIONS.length ? "Finish" : "Next"}
          </button>
        </div>
      </div>
    </div>
  );
}
