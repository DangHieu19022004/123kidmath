import { useState } from "react";
import { InlineMath } from 'react-katex';

const lessonQuestions = {
  "Phân số - Bài 1": [
    { question: "Phân số nào bằng \\frac{1}{2}?", choices: ["\\frac{2}{4}", "\\frac{3}{5}", "\\frac{1}{3}", "\\frac{2}{5}"], correct: "\\frac{2}{4}" },
    { question: "Phân số nào lớn hơn \\frac{1}{3}?", choices: ["\\frac{1}{4}", "\\frac{2}{3}", "\\frac{1}{5}", "\\frac{2}{6}"], correct: "\\frac{2}{3}" },
    { question: "Phân số tối giản của \\frac{4}{8} là?", choices: ["\\frac{1}{2}", "\\frac{2}{4}", "\\frac{3}{6}", "\\frac{2}{5}"], correct: "\\frac{1}{2}" },
  ],
  "Phân số - Bài 2": [
    { question: "Tổng của \\frac{1}{4} + \\frac{1}{4} là?", choices: ["\\frac{1}{2}", "\\frac{2}{4}", "\\frac{1}{8}", "\\frac{3}{4}"], correct: "\\frac{1}{2}" },
    { question: "Kết quả \\frac{2}{5} + \\frac{1}{5} là?", choices: ["\\frac{3}{5}", "\\frac{2}{10}", "\\frac{4}{5}", "\\frac{1}{5}"], correct: "\\frac{3}{5}" },
    { question: "Phân số \\frac{6}{6} bằng?", choices: ["1", "0", "\\frac{6}{1}", "\\frac{1}{6}"], correct: "1" },
  ],
  "Phân số - Bài 3": [
    { question: "Hiệu \\frac{5}{6} - \\frac{2}{6} là?", choices: ["\\frac{3}{6}", "\\frac{1}{2}", "\\frac{2}{6}", "\\frac{1}{6}"], correct: "\\frac{3}{6}" },
    { question: "Phân số lớn nhất là?", choices: ["\\frac{2}{3}", "\\frac{4}{5}", "\\frac{1}{2}", "\\frac{3}{4}"], correct: "\\frac{4}{5}" },
    { question: "Phân số bé nhất là?", choices: ["\\frac{1}{5}", "\\frac{1}{2}", "\\frac{3}{5}", "\\frac{2}{4}"], correct: "\\frac{1}{5}" },
  ],
  "Phân số - Bài 4": [
    { question: "Phân số nào bằng \\frac{3}{6}?", choices: ["\\frac{1}{2}", "\\frac{2}{3}", "\\frac{3}{4}", "\\frac{1}{4}"], correct: "\\frac{1}{2}" },
    { question: "Kết quả \\frac{2}{3} - \\frac{1}{3} là?", choices: ["\\frac{1}{3}", "\\frac{2}{6}", "\\frac{3}{3}", "\\frac{1}{6}"], correct: "\\frac{1}{3}" },
    { question: "Phân số nào không tối giản?", choices: ["\\frac{2}{4}", "\\frac{1}{3}", "\\frac{3}{7}", "\\frac{2}{5}"], correct: "\\frac{2}{4}" },
  ],
  "Phân số - Bài 5": [
    { question: "Mẫu số của \\frac{3}{7} là?", choices: ["3", "7", "10", "4"], correct: "7" },
    { question: "Tử số của \\frac{5}{8} là?", choices: ["3", "5", "8", "2"], correct: "5" },
    { question: "Phân số nào bằng 1?", choices: ["\\frac{6}{6}", "\\frac{2}{3}", "\\frac{5}{4}", "\\frac{1}{2}"], correct: "\\frac{6}{6}" },
  ],
  "Phân số - Bài 6": [
    { question: "Phân số lớn hơn \\frac{1}{4}?", choices: ["\\frac{2}{4}", "\\frac{1}{5}", "\\frac{1}{6}", "\\frac{1}{8}"], correct: "\\frac{2}{4}" },
    { question: "Phân số bé hơn \\frac{1}{2}?", choices: ["\\frac{1}{4}", "\\frac{3}{4}", "\\frac{2}{3}", "\\frac{4}{5}"], correct: "\\frac{1}{4}" },
    { question: "Số nào là phân số?", choices: ["\\frac{2}{3}", "2.5", "3", "0"], correct: "\\frac{2}{3}" },
  ],
  "Phân số - Bài 7": [
    { question: "Kết quả \\frac{3}{4} + \\frac{1}{4}?", choices: ["\\frac{4}{4}", "\\frac{2}{4}", "\\frac{1}{4}", "\\frac{5}{4}"], correct: "\\frac{4}{4}" },
    { question: "Tổng \\frac{2}{5} + \\frac{2}{5} là?", choices: ["\\frac{4}{5}", "\\frac{2}{10}", "\\frac{3}{5}", "\\frac{5}{5}"], correct: "\\frac{4}{5}" },
    { question: "Tổng \\frac{1}{2} + \\frac{1}{2} là?", choices: ["1", "\\frac{2}{2}", "\\frac{1}{4}", "\\frac{1}{1}"], correct: "1" },
  ],
  "Phân số - Bài 8": [
    { question: "Quy đồng mẫu \\frac{1}{2}, \\frac{1}{3}?", choices: ["\\frac{3}{6}, \\frac{2}{6}", "\\frac{2}{4}, \\frac{3}{4}", "\\frac{6}{6}, \\frac{3}{6}", "\\frac{4}{8}, \\frac{3}{8}"], correct: "\\frac{3}{6}, \\frac{2}{6}" },
    { question: "Kết quả \\frac{5}{6} - \\frac{1}{6}?", choices: ["\\frac{4}{6}", "\\frac{2}{3}", "\\frac{1}{6}", "\\frac{5}{5}"], correct: "\\frac{4}{6}" },
    { question: "Tối giản \\frac{6}{9}", choices: ["\\frac{2}{3}", "\\frac{3}{4}", "\\frac{4}{6}", "\\frac{1}{2}"], correct: "\\frac{2}{3}" },
  ],
  "Phân số - Bài 9": [
    { question: "Số nào không là phân số?", choices: ["3", "\\frac{2}{5}", "\\frac{1}{3}", "\\frac{7}{9}"], correct: "3" },
    { question: "Phân số bằng \\frac{1}{2}?", choices: ["\\frac{2}{4}", "\\frac{3}{5}", "\\frac{2}{3}", "\\frac{3}{6}"], correct: "\\frac{2}{4}" },
    { question: "Phân số bé nhất trong nhóm?", choices: ["\\frac{1}{5}", "\\frac{2}{3}", "\\frac{3}{5}", "\\frac{1}{2}"], correct: "\\frac{1}{5}" },
  ],
  "Phân số - Bài 10": [
    { question: "Phân số bằng 1 là?", choices: ["\\frac{3}{3}", "\\frac{2}{4}", "\\frac{4}{5}", "\\frac{5}{6}"], correct: "\\frac{3}{3}" },
    { question: "Phân số nào tối giản?", choices: ["\\frac{2}{3}", "\\frac{4}{6}", "\\frac{2}{4}", "\\frac{6}{9}"], correct: "\\frac{2}{3}" },
    { question: "Tổng \\frac{1}{6} + \\frac{2}{6}?", choices: ["\\frac{3}{6}", "\\frac{1}{2}", "\\frac{1}{3}", "\\frac{2}{3}"], correct: "\\frac{3}{6}" },
  ],
};


export default function LessonTestScreen({ lesson, onBack, onComplete }) {
  const allQuestions = lessonQuestions[`${lesson.topic} - ${lesson.title}`] || [];
  const [queue, setQueue] = useState([...allQuestions]);
  const [current, setCurrent] = useState(allQuestions[0]);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState(null);
  const [feedback, setFeedback] = useState("");
  const [finished, setFinished] = useState(false);

  const handleFinish = () => {
    onComplete(lesson, score, allQuestions.length);
    setTimeout(() => onBack(), 0);
  };

  const handleAnswer = (choice) => {
    const isCorrect = choice === current.correct;
    if (isCorrect) setScore((prev) => prev + 1);
    setFeedback(
  isCorrect
    ? { type: "correct", content: "✅ Chính xác!" }
    : { type: "wrong", content: current.correct }
);

    setSelected(choice);

    setTimeout(() => {
      setSelected(null);
      setFeedback("");
      setQueue((prevQueue) => {
        const [, ...rest] = prevQueue;
        const updatedQueue = isCorrect ? rest : [...rest, current];
        if (updatedQueue.length === 0) setFinished(true);
        else setCurrent(updatedQueue[0]);
        return updatedQueue;
      });
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-purple-50 p-6 flex flex-col items-center">
      <h1 className="text-xl font-bold text-purple-700 mb-2">
        📘 {lesson.topic} – {lesson.title}
      </h1>
      <div className="w-full max-w-lg bg-white rounded-xl shadow-md p-6 text-center">
        {finished ? (
          <div className="text-xl font-bold text-green-700 space-y-2">
            🎉 Hoàn thành bài học!
            <div>Số câu đúng: {score} / {allQuestions.length}</div>
            <button onClick={handleFinish} className="mt-4 px-5 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
              🔙 Quay lại danh sách bài học
            </button>
          </div>
        ) : (
          <>
            <p className="text-lg font-semibold mb-4">
              <InlineMath math={current.question} />
            </p>
            <div className="grid grid-cols-2 gap-3">
              {current.choices.map((c, i) => (
                <button
                  key={i}
                  onClick={() => handleAnswer(c)}
                  disabled={selected !== null}
                  className={`py-3 rounded-full text-lg font-bold border-2 transition-all duration-200 ${
                    selected === c
                      ? c === current.correct
                        ? "bg-green-500 text-white border-green-600"
                        : "bg-red-400 text-white border-red-600"
                      : "bg-white border-purple-400 hover:bg-purple-100 text-purple-800"
                  }`}
                >
                  <InlineMath math={c} />
                </button>
              ))}
            </div>
           {feedback && (
  <div className="mt-4 text-base font-semibold text-orange-600">
    {feedback.type === "correct" ? (
      feedback.content
    ) : (
      <>
        ❌ Sai rồi! Đáp án: <InlineMath math={feedback.content} />
      </>
    )}
  </div>
)}

          </>
        )}
      </div>
    </div>
  );
}