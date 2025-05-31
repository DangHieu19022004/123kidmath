import { useState } from "react";

const lessonQuestions = {
  "Phép nhân - Bài 1": [
    { question: "2 × 3 = ?", choices: ["5", "6", "4", "7"], correct: "6" },
    { question: "5 × 1 = ?", choices: ["0", "4", "5", "6"], correct: "5" },
    { question: "4 × 2 = ?", choices: ["6", "8", "9", "10"], correct: "8" },
  ],
  "Phép nhân - Bài 2": [
    { question: "7 × 3 = ?", choices: ["20", "21", "22", "23"], correct: "21" },
    { question: "6 × 6 = ?", choices: ["36", "30", "24", "28"], correct: "36" },
    { question: "9 × 2 = ?", choices: ["18", "16", "20", "15"], correct: "18" },
  ],
  "Phép nhân - Bài 3": [
    { question: "3 × 5 = ?", choices: ["8", "10", "12", "15"], correct: "15" },
    { question: "4 × 4 = ?", choices: ["16", "12", "14", "18"], correct: "16" },
    { question: "2 × 8 = ?", choices: ["16", "14", "18", "20"], correct: "16" },
  ],
  "Phép nhân - Bài 4": [
    { question: "5 × 2 = ?", choices: ["10", "9", "8", "12"], correct: "10" },
    { question: "3 × 3 = ?", choices: ["6", "8", "9", "10"], correct: "9" },
    { question: "7 × 1 = ?", choices: ["6", "7", "8", "9"], correct: "7" },
  ],
  "Phép nhân - Bài 5": [
    { question: "6 × 4 = ?", choices: ["24", "20", "22", "28"], correct: "24" },
    { question: "3 × 6 = ?", choices: ["18", "15", "16", "20"], correct: "18" },
    { question: "8 × 2 = ?", choices: ["14", "16", "18", "20"], correct: "16" },
  ],
  "Phép nhân - Bài 6": [
    { question: "4 × 3 = ?", choices: ["11", "12", "10", "14"], correct: "12" },
    { question: "9 × 1 = ?", choices: ["8", "9", "10", "11"], correct: "9" },
    { question: "7 × 2 = ?", choices: ["14", "13", "15", "12"], correct: "14" },
  ],
  "Phép nhân - Bài 7": [
    { question: "10 × 1 = ?", choices: ["10", "9", "11", "12"], correct: "10" },
    { question: "2 × 6 = ?", choices: ["12", "10", "14", "13"], correct: "12" },
    { question: "5 × 5 = ?", choices: ["20", "25", "30", "24"], correct: "25" },
  ],
  "Phép nhân - Bài 8": [
    { question: "6 × 2 = ?", choices: ["10", "12", "14", "16"], correct: "12" },
    { question: "4 × 5 = ?", choices: ["20", "18", "22", "24"], correct: "20" },
    { question: "3 × 4 = ?", choices: ["10", "12", "14", "11"], correct: "12" },
  ],
  "Phép nhân - Bài 9": [
    { question: "8 × 3 = ?", choices: ["24", "26", "28", "30"], correct: "24" },
    { question: "2 × 9 = ?", choices: ["18", "17", "19", "20"], correct: "18" },
    { question: "1 × 7 = ?", choices: ["6", "7", "8", "9"], correct: "7" },
  ],
  "Phép nhân - Bài 10": [
    { question: "5 × 3 = ?", choices: ["15", "12", "13", "14"], correct: "15" },
    { question: "6 × 1 = ?", choices: ["5", "6", "7", "8"], correct: "6" },
    { question: "2 × 5 = ?", choices: ["10", "9", "11", "12"], correct: "10" },
  ],
};


export default function LessonTestScreen({ lesson, onBack, onComplete }) {
  const questions = lessonQuestions[`${lesson.topic} - ${lesson.title}`] || [];
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState(null);
  const [feedback, setFeedback] = useState("");
  const [finished, setFinished] = useState(false);

  const q = questions[current];

  const handleFinish = () => {
  onComplete(lesson); // đánh dấu bài đã hoàn thành
  setTimeout(() => {
    onBack();         // quay lại sau 1 frame render
  }, 0);
};
  
  const handleAnswer = (choice) => {
    const isCorrect = choice === q.correct;
    if (isCorrect) setScore((prev) => prev + 1);
    setFeedback(isCorrect ? "✅ Chính xác!" : `❌ Sai rồi! Đáp án: ${q.correct}`);
    setSelected(choice);

    setTimeout(() => {
      setSelected(null);
      setFeedback("");
      if (current + 1 < questions.length) {
        setCurrent((prev) => prev + 1);
      } else {
        setFinished(true);
      }
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
            <div>Số câu đúng: {score} / {questions.length}</div>
            <button
              onClick={handleFinish}
              className="mt-4 px-5 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
            >
              🔙 Quay lại danh sách bài học
            </button>
          </div>
        ) : (
          <>
            <p className="text-lg font-semibold mb-4">{q.question}</p>
            <div className="grid grid-cols-2 gap-3">
              {q.choices.map((c, i) => (
                <button
                  key={i}
                  onClick={() => handleAnswer(c)}
                  disabled={selected !== null}
                  className={`py-3 rounded-full text-lg font-bold border-2 transition-all duration-200 ${
                    selected === c
                      ? c === q.correct
                        ? "bg-green-500 text-white border-green-600"
                        : "bg-red-400 text-white border-red-600"
                      : "bg-white border-purple-400 hover:bg-purple-100 text-purple-800"
                  }`}
                >
                  {c}
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
  );
}
