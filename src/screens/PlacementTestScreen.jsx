import { useState } from "react";
import { useGame } from "../GameContext";

const questions = [
  {
    question: "6 × 7 = ?",
    choices: ["42", "36", "48", "56"],
    correct: "42",
  },
  {
    question: "12 : 3 = ?",
    choices: ["4", "6", "3", "5"],
    correct: "4",
  },
  {
    question: "Biểu thức: 5 + 2 × 3 = ?",
    choices: ["11", "21", "17", "10"],
    correct: "11",
  },
  {
    question: "25 chia hết cho số nào?",
    choices: ["2", "3", "4", "5"],
    correct: "5",
  },
  {
    question: "8 × 6 = ?",
    choices: ["42", "48", "56", "36"],
    correct: "48",
  },
  {
    question: "(10 - 4) × 2 = ?",
    choices: ["8", "6", "12", "16"],
    correct: "12",
  },
];

export default function PlacementTestScreen({ next }) {
  const { setLevel } = useGame();
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState(null);
  const [feedback, setFeedback] = useState("");
  const [finished, setFinished] = useState(false);

  const total = questions.length;
  const q = questions[current];

  const handleAnswer = (choice) => {
    const isCorrect = choice === q.correct;
    if (isCorrect) {
      setScore((prev) => prev + 1);
      setFeedback("✅ Chính xác!");
    } else {
      setFeedback(`❌ Sai rồi! Đáp án: ${q.correct}`);
    }
    setSelected(choice);

    setTimeout(() => {
      setSelected(null);
      setFeedback("");
      if (current + 1 < total) {
        setCurrent((prev) => prev + 1);
      } else {
        const percent = (score + (isCorrect ? 1 : 0)) / total;
        let result = "ontrack";
        if (percent >= 0.9) result = "pro";
        else if (percent < 0.6) result = "weak";
        setLevel(result);
        setScore((prev) => prev + (isCorrect ? 1 : 0));
        setFinished(true);
        setTimeout(() => {
          next();
        }, 3000);
      }
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-yellow-50 flex flex-col items-center justify-start p-6">
      <div className="w-full max-w-lg text-center">
        <h2 className="text-3xl font-bold text-indigo-700 mb-4">🎯 Khảo sát đầu vào</h2>

        <div className="mb-6">
          <div className="w-full h-4 bg-gray-300 rounded-full">
            <div
              className="h-4 bg-lime-500 rounded-full transition-all duration-300"
              style={{ width: `${((current + (finished ? 1 : 0)) / total) * 100}%` }}
            ></div>
          </div>
          <p className="text-sm text-gray-600 mt-1">
            Câu {current + 1} / {total}
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-md p-6">
          {finished ? (
            <div className="text-xl font-bold text-green-600 space-y-2">
              🎉 Hoàn thành khảo sát!
              <div>Số câu đúng: {score}/{total}</div>
              <div>
                Phân loại:{" "}
                <span className="capitalize text-indigo-700">
                  {score >= 5 ? "Pro" : score >= 3 ? "On-track" : "Cần củng cố"}
                </span>
              </div>
            </div>
          ) : (
            <>
              <p className="text-lg font-semibold mb-5">
  🧠 {q.question}
</p>
              <div className="grid grid-cols-2 gap-3">
                {q.choices.map((c, i) => (
                  <button
  key={i}
  onClick={() => handleAnswer(c)}
  disabled={selected !== null}
  className={`py-4 rounded-xl text-lg font-bold shadow-md transition-all duration-200 w-full ${
    selected === c
      ? c === q.correct
        ? "bg-green-500 text-white"
        : "bg-red-400 text-white"
      : "bg-blue-50 hover:bg-blue-100 text-blue-800"
  }`}
>
  {selected === c
    ? c === q.correct
      ? "✅ " + c
      : "❌ " + c
    : "🔹 " + c}
</button>


                ))}
              </div>

              {feedback && (
                <div className="mt-4 text-base font-semibold text-orange-600">{feedback}</div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
