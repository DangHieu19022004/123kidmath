import { useState } from "react";
import { useGame } from "../GameContext";
import 'katex/dist/katex.min.css';
import { InlineMath } from 'react-katex';

const mockQuestions = [
  {
    question: "6 x 4 = ?",
    choices: ["24", "18", "20", "28"],
    correct: "24",
  },
  {
    question: "10 + 2 x 3 = ?",
    choices: ["36", "20", "16", "28"],
    correct: "16",
  },
  {
    question: "Phép chia: 15 : 3 = ?",
    choices: ["3", "5", "6", "9"],
    correct: "5",
  },
];

export default function QuestionScreen({ topic = "Phép nhân", onBack }) {
  const { xp, setXp } = useGame();
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);

  const q = mockQuestions[index];

  const handleAnswer = (choice) => {
    const isCorrect = choice === q.correct;
    if (isCorrect) {
      setScore((prev) => prev + 1);
      setXp((prev) => prev + 10); // +10 XP nếu đúng
    }
    setSelected(choice);
    setTimeout(() => {
      setSelected(null);
      if (index + 1 < mockQuestions.length) {
        setIndex((prev) => prev + 1);
      } else {
        setDone(true);
      }
    }, 1000);
  };

  if (done) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-green-100 p-4">
        <h2 className="text-2xl font-bold mb-4">🎉 Hoàn thành chủ đề: {topic}</h2>
        <p className="text-lg">Bạn đúng {score} / {mockQuestions.length} câu.</p>
        <p className="text-lg text-blue-700 mt-2">Tổng XP hiện tại: {xp}</p>
        <button
          onClick={onBack}
          className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          🔙 Quay lại lộ trình học
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-yellow-50 p-4">
      <h2 className="text-xl font-bold text-blue-700 mb-2">Chủ đề: {topic}</h2>
      <p className="text-lg font-semibold mb-6">Câu {index + 1}: {q.question}</p>
      <div className="grid grid-cols-2 gap-4 max-w-md w-full">
        {q.choices.map((c, i) => (
          <button
            key={i}
            onClick={() => handleAnswer(c)}
            disabled={selected !== null}
            className={`py-3 px-4 border rounded-lg text-lg font-medium ${
              selected
                ? c === q.correct
                  ? "bg-green-400 text-white border-green-600"
                  : c === selected
                  ? "bg-red-400 text-white border-red-600"
                  : "bg-gray-100"
                : "bg-white border-gray-300 hover:bg-blue-100"
            }`}
          >
            {c}
          </button>
        ))}
      </div>
    </div>
  );
}
