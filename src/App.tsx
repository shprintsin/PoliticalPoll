// src/App.tsx
import { useState, useEffect, type JSX } from "react";
import "./App.css";
import {
  type Question,
  questionsData,
  type Results,
} from "./Questions";
import { FaGavel, FaLandmark, FaMoneyBill, FaUsers } from "react-icons/fa";

// Predefined mapping of category keys to Hebrew label and icon
const catLabels: Record<
  string,
  { label: string; icon: JSX.Element }
> = {
  politics: { label: "מדיני", icon: <FaMoneyBill size={24} /> },
  economics: { label: "כלכלי", icon: <FaLandmark size={24} /> },
  socity: { label: "חברתי", icon: <FaUsers size={24} /> },
  legal: { label: "משפטי", icon: <FaGavel  size={24} /> },
};

export default function App(): JSX.Element {
  const [questions, setQuestions] = useState<Question[]>(questionsData);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [results, setResults] = useState<Results | null>(null);
  const [visible, setVisible] = useState<boolean>(true);

  const totalQuestions = questions.length;
  const currentQuestion = questions[currentIndex];

  useEffect(() => {
    setVisible(true);
  }, [currentIndex]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        triggerBack();
      }
      if (e.key === "ArrowRight" && currentQuestion.selectedValue) {
        triggerNext();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [currentIndex, questions]);

  const triggerBack = () => {
    if (currentIndex === 0) return;
    setVisible(false);
    setTimeout(() => {
      setCurrentIndex(currentIndex - 1);
    }, 150);
  };

  const triggerNext = () => {
    if (!currentQuestion.selectedValue || currentIndex === totalQuestions - 1)
      return;
    setVisible(false);
    setTimeout(() => {
      setCurrentIndex(currentIndex + 1);
    }, 150);
  };

  const handleAnswer = (value: string) => {
    const updated = [...questions];
    updated[currentIndex] = {
      ...updated[currentIndex],
      selectedValue: value,
    };
    setQuestions(updated);
    if (currentIndex < totalQuestions - 1) {
      setVisible(false);
      setTimeout(() => {
        setCurrentIndex(currentIndex + 1);
      }, 150);
    }
  };

  const computeAllScores = (): void => {
    const obj: Results = {};
    const topics = Array.from(new Set(questions.map((q) => q.field)));
    topics.forEach((topic) => {
      const subset = questions.filter((q) => q.field === topic);
      let sumSelected = 0;
      let sumAvailable = 0;
      subset.forEach((q) => {
        if (q.selectedValue) {
          sumSelected += parseInt(q.selectedValue, 10);
        }
        sumAvailable += 5;
      });
      obj[topic] = { result: sumSelected, total: sumAvailable };
    });
    setResults(obj);
  };

  const valueToBg = (val: string): string => {
    switch (val) {
      case "1":
        return "bg-blue-100 hover:bg-blue-200";
      case "2":
        return "bg-blue-200 hover:bg-blue-300";
      case "3":
        return "bg-blue-300 hover:bg-blue-400";
      case "4":
        return "bg-blue-400 hover:bg-blue-500";
      case "5":
        return "bg-blue-500 hover:bg-blue-600 text-white";
      default:
        return "bg-gray-100 hover:bg-gray-200";
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
  <div className="relative w-full max-w-2xl bg-white shadow-lg rounded-lg p-4 sm:p- md:p-8 flex flex-col">
    {results === null ? (
          <>
            <div className="relative">
              <button
                onClick={triggerBack}
                disabled={currentIndex === 0}
                className="absolute left-0 top-0 transform -translate-y-1/2 rounded-full hover:bg-gray-200 disabled:opacity-50 z-10"
                aria-label="Previous"
              >
                <FaGavel size={20} />
              </button>

              <div
                className={`mb-8 text-center transition-opacity duration-300 ease-in-out ${
                  visible ? "opacity-100" : "opacity-0"
                }`}
              >
                <p className="text-gray-600">
                  שאלה {currentIndex + 1}/{totalQuestions}
                </p>
                <h2 className="mt-2 text-2xl font-semibold" key={currentIndex}>
                  {currentQuestion.Question}
                </h2>
              </div>

              <div
  className={`flex flex-wrap justify-center gap-4 mb-8 transition-opacity duration-300 ease-in-out ${
    visible ? "opacity-100" : "opacity-0"
  }`}
>
                {currentQuestion.answers.map((a) => {
                  const isSelected =
                    currentQuestion.selectedValue === a.value;
                  const bgClass = isSelected
                    ? valueToBg(a.value) + " ring-2 ring-blue-600"
                    : valueToBg(a.value);
                  return (
                    <button
        key={a.value}
        onClick={() => handleAnswer(a.value)}
        className={`px-3 py-2 w-20 md:w-24 rounded text-center text-gray-800 text-sm md:text-base ${bgClass}`}
      >
                      {a.label}
                    </button>
                  );
                })}
              </div>

              <button
                onClick={triggerNext}
                disabled={
                  !currentQuestion.selectedValue ||
                  currentIndex === totalQuestions - 1
                }
                className="absolute right-0 top-0 transform -translate-y-1/2 rounded-full hover:bg-gray-200 disabled:opacity-50 z-10"
                aria-label="Next"
              >
                <FaLandmark size={20} />
              </button>
            </div>

            {currentIndex === totalQuestions - 1 && (
              <button
                onClick={computeAllScores}
                className="mt-8 bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
              >
                תוצאות
              </button>
            )}
          </>
        ) : (
          <div className="space-y-8">
            <h1 className="text-center bold text-xl">אלו התוצאות שלך</h1>
            {Object.entries(results).map(
              ([topicKey, { result, total }]) => {
                const leftPct =
                  total > 0 ? Math.round((result / total) * 100) : 0;
                const rightPct = 100 - leftPct;

                // Use predefined label and icon
                const category = catLabels[topicKey] || {
                  label: topicKey,
                  icon: null,
                };

                return (
                  <div key={topicKey} className="flex flex-col gap-2">
                    
                    <div className="flex flex-row items-center">
                      {/* Left icon from catLabels */}
                      <div className="w-12 flex justify-center text-blue-600">
                        {category.icon}
                      </div>

                      {/* Bar container */}
                      <div className="flex-1 h-8 bg-gray-200 rounded-full overflow-hidden mx-4 flex">
                        <div
                          className="bg-blue-500 h-full"
                          style={{ width: `${leftPct}%` }}
                        />
                        <div
                          className="bg-red-500 h-full"
                          style={{ width: `${rightPct}%` }}
                        />
                      </div>

                      {/* Empty placeholder for right icon */}
                      <div className="w-12" />
                    </div>

                    <div className="flex flex-row justify-between text-sm">
                      <span className="text-blue-600">{leftPct}%</span>
                        {category.label}
                      <span className="font-semibold">
                      </span>
                      {/* <span className="text-red-600">{rightPct}%</span> */}
                    </div>
                  </div>
                );
              }
            )}
          </div>
          
        )}
      </div>
    </div>
  );
}
