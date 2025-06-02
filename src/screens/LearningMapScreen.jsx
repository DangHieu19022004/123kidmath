import 'katex/dist/katex.min.css';
import { InlineMath } from 'react-katex';


export default function LearningMapScreen({ onSelectNode, progressData }) {
 const nodes = [
  { name: "Phân số" },
  { name: "Phép chia" },
  { name: "Biểu thức có ngoặc" },
];


 return (
  <div className="min-h-screen bg-blue-50 p-6 flex flex-col items-center">
    <h1 className="text-3xl font-bold text-indigo-800 mb-6">🗺️ Lộ trình học tập</h1>

    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 w-full max-w-3xl">
      {nodes.map((node, idx) => {
        const progress = progressData[node.name] || 0;
        const unlocked = idx === 0 || (progressData[nodes[idx - 1].name] || 0) >= 80;

        return (
          <button
            key={idx}
            onClick={() => unlocked && onSelectNode(node.name)}
            className={`p-4 rounded-xl shadow-md border text-left transition-all duration-200
              ${unlocked
                ? "bg-white hover:bg-blue-100 text-black"
                : "bg-gray-200 text-gray-400 cursor-not-allowed"}`}
          >
            <div className="font-bold text-lg mb-1">{node.name}</div>
            <div className="text-sm">Tiến độ: {progress}%</div>
            <div className="text-2xl mt-1">{unlocked ? "🔓" : "🔒"}</div>
          </button>
        );
      })}
    </div>
  </div>
);

}
