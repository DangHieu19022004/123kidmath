import 'katex/dist/katex.min.css';
import { InlineMath } from 'react-katex';
import { useState, useEffect } from "react";
import { useGame } from "../GameContext";
import { motion, AnimatePresence } from "framer-motion";
import { FaBirthdayCake } from 'react-icons/fa';

const questions = [
  {
    question: "\\frac{1}{2} bằng phân số nào?",
    choices: ["\\frac{2}{4}", "\\frac{1}{3}", "\\frac{2}{5}", "\\frac{3}{6}"],
    correct: "\\frac{2}{4}",
    visualAid: {
      type: "candies",
      total: 4,
      highlighted: 2
    }
  },
  {
    question: "Tổng \\frac{1}{4} + \\frac{1}{4} bằng?",
    choices: ["\\frac{1}{2}", "\\frac{2}{4}", "\\frac{1}{8}", "\\frac{3}{4}"],
    correct: "\\frac{1}{2}",
    visualAid: {
      type: "pizza",
      total: 4,
      highlighted: 2
    }
  },
  {
    question: "Hiệu \\frac{3}{4} - \\frac{1}{4} là?",
    choices: ["\\frac{2}{4}", "\\frac{1}{4}", "\\frac{3}{3}", "\\frac{4}{4}"],
    correct: "\\frac{2}{4}",
    visualAid: {
      type: "chocolate",
      total: 4,
      highlighted: 2
    }
  },
  {
    question: "Phân số nào lớn hơn \\frac{1}{3}?",
    choices: ["\\frac{2}{3}", "\\frac{1}{4}", "\\frac{1}{5}", "\\frac{2}{6}"],
    correct: "\\frac{2}{3}",
    visualAid: {
      type: "cake",
      total: 3,
      highlighted: 2
    }
  },
  {
    question: "Tối giản \\frac{4}{8} là?",
    choices: ["\\frac{1}{2}", "\\frac{2}{4}", "\\frac{3}{6}", "\\frac{2}{5}"],
    correct: "\\frac{1}{2}",
    visualAid: {
      type: "cookies",
      total: 8,
      highlighted: 4
    }
  },
  {
    question: "Kết quả \\frac{2}{5} + \\frac{1}{5} là?",
    choices: ["\\frac{3}{5}", "\\frac{1}{5}", "\\frac{2}{10}", "\\frac{1}{2}"],
    correct: "\\frac{3}{5}",
    visualAid: {
      type: "icecream",
      total: 5,
      highlighted: 3
    }
  },
];

const visualEmojis = {
  candies: "🍬",
  pizza: "🍕",
  chocolate: "🍫",
  cake: "🍰",
  cookies: "🍪",
  icecream: "🍦"
};

const FloatingShape = ({ emoji, delay, size = "text-4xl", customAnimation }) => (
  <motion.div
    initial={{ scale: 0 }}
    animate={{ 
      ...customAnimation,
      scale: [1, 1.2, 1],
    }}
    transition={{
      duration: Math.random() * 2 + 2,
      delay: delay,
      repeat: Infinity,
      ease: "easeInOut"
    }}
    className={`absolute ${size} pointer-events-none`}
    style={{
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
    }}
  >
    {emoji}
  </motion.div>
);

const BubbleBackground = () => (
  <div className="absolute inset-0 overflow-hidden">
    {[
      { emoji: "🌈", size: "text-6xl", animation: { rotate: 360, y: [-20, 20, -20] } },
      { emoji: "⭐", size: "text-3xl", animation: { x: [-20, 20, -20] } },
      { emoji: "🎨", size: "text-5xl", animation: { y: [-30, 30, -30] } },
      { emoji: "✏️", size: "text-4xl", animation: { rotate: [-20, 20, -20] } },
      { emoji: "📚", size: "text-5xl", animation: { scale: [1, 1.3, 1] } },
      { emoji: "🎯", size: "text-4xl", animation: { y: [-25, 25, -25] } },
      { emoji: "🔢", size: "text-5xl", animation: { rotate: [-30, 30, -30] } },
      { emoji: "🎪", size: "text-6xl", animation: { scale: [1, 1.2, 1] } },
      { emoji: "🎠", size: "text-5xl", animation: { y: [-15, 15, -15] } },
      { emoji: "🎡", size: "text-4xl", animation: { rotate: 360 } },
    ].map((item, i) => (
      <FloatingShape 
        key={i} 
        emoji={item.emoji} 
        delay={i * 0.3} 
        size={item.size}
        customAnimation={item.animation}
      />
    ))}
  </div>
);

export default function PlacementTestScreen({ next }) {
  const { setLevel } = useGame();
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState(null);
  const [feedback, setFeedback] = useState("");
  const [finished, setFinished] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const total = questions.length;
  const q = questions[current];

  const handleAnswer = (choice) => {
    setIsAnimating(true);
    const isCorrect = choice === q.correct;
    if (isCorrect) {
      setScore((prev) => prev + 1);
      setFeedback("✨ Tuyệt vời! Bạn trả lời đúng rồi!");
    } else {
      setFeedback(`💫 Cố gắng lần sau nhé! Đáp án đúng là: `);
    }
    setSelected(choice);

    setTimeout(() => {
      setSelected(null);
      setFeedback("");
      setIsAnimating(false);
      if (current + 1 < total) {
        setCurrent((prev) => prev + 1);
      } else {
        const percent = (score + (isCorrect ? 1 : 0)) / total;
        let result = "ontrack";
        if (percent >= 0.9) result = "pro";
        else if (percent < 0.6) result = "weak";
        setLevel(result);
        setFinished(true);
        setTimeout(() => next(), 3000);
      }
    }, 1500);
  };

  const renderVisualAid = () => {
    const { type, total, highlighted } = q.visualAid;
    const emoji = visualEmojis[type];
    
    return (
      <div className="flex flex-wrap justify-center gap-2 mb-6">
        {[...Array(total)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: i * 0.1 }}
            className={`text-3xl transform transition-all duration-300 hover:scale-110
              ${i < highlighted ? 'opacity-100' : 'opacity-40'}`}
          >
            {emoji}
          </motion.div>
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen w-full flex flex-col" style={{background: 'linear-gradient(90deg, #f8f3ff 0%, #ffe0b2 100%)'}}>
      {/* Header màu cam */}
      <div className="w-full bg-[#FFA726] py-4 flex items-center justify-center shadow-md relative">
        <FaBirthdayCake className="text-2xl md:text-3xl text-white mr-2" />
        <span className="text-xl md:text-2xl font-bold text-white tracking-wide">Khảo Sát Đầu Vào</span>
      </div>

      {/* Nội dung chính căn giữa, rộng hơn trên PC */}
      <div className="flex-1 flex items-center justify-center px-2 md:px-0">
        {!finished ? (
          <div className="w-full max-w-md md:max-w-3xl bg-white rounded-3xl shadow-2xl p-6 md:p-16 flex flex-col items-center">
            {/* Progress */}
            <div className="text-gray-500 font-semibold mb-2 md:mb-4 md:text-lg">Câu {current + 1} / {total}</div>

            {/* Câu hỏi phân số lớn màu cam */}
            <div className="text-center mb-4 md:mb-8">
              <div className="text-lg md:text-2xl font-semibold text-gray-700 mb-1">Hãy thể hiện phân số:</div>
              <div className="text-5xl md:text-8xl font-extrabold text-[#FFA726] mb-2">
                <InlineMath math={q.question.replace('bằng phân số nào?', '')} />
              </div>
            </div>

            {/* Hình minh họa */}
            <div className="w-full flex justify-center mb-2 md:mb-6">
              <div className="scale-110 md:scale-150 lg:scale-175">
                {renderVisualAid()}
              </div>
            </div>

            {/* Các lựa chọn đáp án */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full my-4 md:my-8">
              {q.choices.map((c, i) => (
                <button
                  key={i}
                  onClick={() => !isAnimating && handleAnswer(c)}
                  disabled={isAnimating}
                  className={`w-full py-3 md:py-5 rounded-xl text-lg md:text-2xl font-bold border transition-all duration-200
                    ${selected === c
                      ? (c === q.correct
                          ? 'bg-green-500 text-white border-green-500 shadow-md'
                          : 'bg-red-400 text-white border-red-400 shadow-md')
                      : 'bg-gray-100 text-gray-700 border-gray-200 hover:bg-[#ffe0b2]'}
                  `}
                >
                  <InlineMath math={c} />
                </button>
              ))}
            </div>

            {/* Feedback */}
            {feedback && (
              <div className={`mt-2 text-base md:text-xl font-semibold ${feedback.includes('Tuyệt vời') ? 'text-green-600' : 'text-orange-500'}`}
              >
                {feedback} {!feedback.includes('Tuyệt vời') && <InlineMath math={q.correct} />}
              </div>
            )}
          </div>
        ) : (
          <div className="w-full max-w-md md:max-w-3xl bg-white rounded-3xl shadow-2xl p-8 md:p-16 flex flex-col items-center animate-fade-in">
            <div className="text-5xl mb-4">🎉</div>
            <div className="text-2xl md:text-3xl font-bold text-green-600 mb-2">Hoàn thành khảo sát!</div>
            <div className="text-lg md:text-xl text-gray-700 mb-2">Số câu đúng: <span className="font-bold text-indigo-600">{score}/{total}</span></div>
            <div className="text-lg md:text-xl text-purple-700 mb-4">
              Đánh giá: <span className="font-extrabold text-indigo-600">
                {score >= 5 ? "Siêu sao toán học 🌟" : score >= 3 ? "Khá tốt 👍" : "Cần thêm luyện tập 💪"}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// Add to your global CSS or tailwind.config.js
const style = document.createElement('style');
style.textContent = `
  @keyframes gradient-xy {
    0%, 100% {
      background-size: 400% 400%;
      background-position: left top;
    }
    25% {
      background-size: 400% 400%;
      background-position: right top;
    }
    50% {
      background-size: 400% 400%;
      background-position: right bottom;
    }
    75% {
      background-size: 400% 400%;
      background-position: left bottom;
    }
  }
  .animate-gradient-xy {
    animation: gradient-xy 15s ease infinite;
  }
  @keyframes float {
    0%, 100% {
      transform: translateY(0) scale(1);
      opacity: 0.1;
    }
    50% {
      transform: translateY(-20px) scale(1.1);
      opacity: 0.2;
    }
  }
  .animate-float {
    animation: float 10s ease-in-out infinite;
  }
  .animate-text-shimmer {
    background-size: 200% auto;
    animation: shimmer 2s linear infinite;
  }
  @keyframes shimmer {
    to {
      background-position: 200% center;
    }
  }
  .animate-border-rainbow {
    animation: border-rainbow 4s ease infinite;
  }
  @keyframes border-rainbow {
    0%, 100% {
      transform: rotate(0deg);
    }
    50% {
      transform: rotate(180deg);
    }
  }
  @font-face {
    font-family: 'Chalk';
    src: url('https://fonts.googleapis.com/css2?family=Architects+Daughter&display=swap');
  }
  .font-chalk {
    font-family: 'Architects Daughter', cursive;
    text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
    letter-spacing: 1px;
  }
  .font-chalk .katex {
    text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
    filter: drop-shadow(0 2px 2px rgba(0,0,0,0.3));
  }
  @keyframes fade-in {
    from { opacity: 0; transform: scale(0.95); }
    to { opacity: 1; transform: scale(1); }
  }
  .animate-fade-in {
    animation: fade-in 0.4s ease;
  }
`;
document.head.appendChild(style);
