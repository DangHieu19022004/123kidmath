import { useState, useEffect } from "react";
import LessonTestScreen from "./LessonTestScreen";
import 'katex/dist/katex.min.css';
import { InlineMath } from 'react-katex';

export default function TopicDetailScreen({
  topic,
  onBack,
  onProgressUpdate,
  savedLessons,
  onSaveLessons
}) {
  const [lessons, setLessons] = useState([]);
 const [selectedLesson, setSelectedLesson] = useState(null);
  const [finishedTopic, setFinishedTopic] = useState(false);
  const [totalCorrect, setTotalCorrect] = useState(0);

  useEffect(() => {
    // Nếu đã có lịch sử lưu, dùng lại
    if (savedLessons && savedLessons.length > 0) {
      setLessons(savedLessons);
    } else {
      const initial = Array.from({ length: 10 }, (_, i) => ({
        title: `Bài ${i + 1}`,
        unlocked: i === 0,
        completed: false,
        topic,
      }));
      setLessons(initial);
    }
  }, [topic]);

  const handleLessonComplete = (lesson, score, total) => {
  setLessons((prev) => {
    const updated = prev.map((l, i) => {
      if (l.title === lesson.title) return { ...l, completed: true, score, total };
      if (i === prev.findIndex((item) => item.title === lesson.title) + 1) {
        return { ...l, unlocked: true };
      }
      return l;
    });

    onSaveLessons(updated); // ← lưu lại

    const completed = updated.filter((l) => l.completed);
    const percent = Math.round((completed.length / updated.length) * 100);
    onProgressUpdate(topic, percent);

    if (completed.length === updated.length) {
      const totalScore = completed.reduce((s, l) => s + (l.score || 0), 0);
      const totalQ = completed.reduce((s, l) => s + (l.total || 0), 0);
      setTotalCorrect(`${totalScore}/${totalQ}`);
      setFinishedTopic(true);
    }

    return updated;
  });
};

console.log("Rendering TopicDetailScreen with selectedLesson =", selectedLesson);

  return (
    <div className="min-h-screen bg-emerald-50 p-6 flex flex-col items-center">
    <h2 className="text-2xl font-bold text-emerald-700 mb-6">📘 {topic}</h2>

    {!selectedLesson ? (
      <div className="grid grid-cols-2 gap-4 max-w-md w-full">
        {lessons.map((lesson, idx) => (
          <button
            key={idx}
            onClick={() => lesson.unlocked && setSelectedLesson(lesson)}
            disabled={!lesson.unlocked}
            className={`py-3 px-4 rounded-xl text-center font-semibold shadow-sm transition-all duration-200
              ${lesson.unlocked
                ? "bg-white text-emerald-800 border border-emerald-300 hover:bg-emerald-100"
                : "bg-gray-200 text-gray-400 cursor-not-allowed"}`}
          >
            <div>{lesson.title}</div>
            <div className="text-xl mt-1">
              {lesson.completed ? "✅" : lesson.unlocked ? "🔓" : "🔒"}
            </div>
          </button>
        ))}
      </div>
    ) : (
      <LessonTestScreen
        lesson={selectedLesson}
        onBack={() => setSelectedLesson(null)}
        onComplete={handleLessonComplete}
      />
    )}
<button
      onClick={onBack}
      className="mt-4 px-5 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
    >
      ⬅ Quay lại lộ trình học
    </button>
    {finishedTopic && (
  <div className="mt-6 text-center bg-white p-4 rounded-xl shadow-lg border border-green-300 max-w-md">
    <h3 className="text-xl font-bold text-green-700">🎉 Chúc mừng!</h3>
    <p className="mt-2 text-base">Bạn đã hoàn thành chủ đề <b>{topic}</b>.</p>
    <p className="mt-1 text-base font-medium text-indigo-700">Tổng điểm: {totalCorrect}</p>
    <button
      onClick={onBack}
      className="mt-4 px-5 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
    >
      ⬅ Quay lại lộ trình học
    </button>
  </div>
)}

  </div>
  );
}
