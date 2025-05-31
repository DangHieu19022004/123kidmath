import { useState, useEffect } from "react";
import LessonTestScreen from "./LessonTestScreen";

const generateLessons = (topic) => {
  return Array.from({ length: 10 }, (_, i) => ({
    title: `Bài ${i + 1}`,
    unlocked: i === 0,
    completed: false,
    topic,
  }));
};

export default function TopicDetailScreen({ topic, onSelectLesson, onBack, onProgressUpdate  }) {
  const [lessons, setLessons] = useState([]);
 const [selectedLesson, setSelectedLesson] = useState(null);


  useEffect(() => {
    setLessons(generateLessons(topic));
  }, [topic]);

   const handleLessonComplete = (lesson) => {
    setLessons((prev) => {
      const updated = prev.map((l, i) => {
        if (l.title === lesson.title) return { ...l, completed: true };
        if (i === prev.findIndex((item) => item.title === lesson.title) + 1) {
          return { ...l, unlocked: true };
        }
        return l;
      });

      const completedCount = updated.filter((l) => l.completed).length;
      const percent = Math.round((completedCount / updated.length) * 100);
      onProgressUpdate(topic, percent);
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

    {!selectedLesson && (
      <button
        onClick={onBack}
        className="mt-8 px-6 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500"
      >
        🔙 Quay lại lộ trình học
      </button>
    )}
  </div>
  );
}
