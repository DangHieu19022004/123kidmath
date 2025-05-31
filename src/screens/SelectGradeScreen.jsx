import { useState } from "react";
import { useGame } from "../GameContext";

export default function SelectGradeScreen({ next }) {
  const { grade, setGrade } = useGame();
  const [selected, setSelected] = useState(grade || 3);

  const handleStart = () => {
    setGrade(selected);
    next(); // chuyển sang màn tiếp theo
  };

  const gradeOptions = [1, 2, 3, 4, 5];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-blue-100 text-gray-800 p-4">
      <h1 className="text-3xl font-bold mb-6">Bạn đang học lớp mấy?</h1>

      <div className="flex space-x-4 mb-8">
        {gradeOptions.map((g) => (
          <button
            key={g}
            className={`px-6 py-3 rounded-lg border-2 ${
              selected === g
                ? "bg-blue-500 text-white border-blue-700"
                : "bg-white border-gray-300"
            }`}
            onClick={() => setSelected(g)}
          >
            Lớp {g}
          </button>
        ))}
      </div>

      <button
        onClick={handleStart}
        className="bg-green-500 hover:bg-green-600 text-white px-8 py-3 rounded-xl text-lg font-semibold"
      >
        Bắt đầu khảo sát đầu vào
      </button>
    </div>
  );
}
