import React, { useState, useEffect } from 'react';
import { InlineMath } from 'react-katex';
import 'katex/dist/katex.min.css';
import confetti from 'canvas-confetti';

const CakeFractions = ({ onComplete }) => {
  const [level, setLevel] = useState(1);
  const [pieces, setPieces] = useState(2);
  const [selectedPieces, setSelectedPieces] = useState([]);
  const [question, setQuestion] = useState('');
  const [isCorrect, setIsCorrect] = useState(false);
  const [showHint, setShowHint] = useState(false);

  const generateQuestion = () => {
    const numerator = Math.floor(Math.random() * (pieces - 1)) + 1;
    setQuestion(`\\frac{${numerator}}{${pieces}}`);
    setSelectedPieces([]);
    setIsCorrect(false);
    setShowHint(false);
  };

  useEffect(() => {
    generateQuestion();
  }, [pieces]);

  const handlePieceClick = (index) => {
    if (selectedPieces.includes(index)) {
      setSelectedPieces(selectedPieces.filter(i => i !== index));
    } else {
      setSelectedPieces([...selectedPieces, index]);
    }
  };

  const checkAnswer = () => {
    const [numerator] = question.match(/\\frac{(\d+)}/)[1];
    if (selectedPieces.length === parseInt(numerator)) {
      setIsCorrect(true);
      confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#ff69b4', '#ff1493', '#ff69b4', '#dda0dd']
      });
      setTimeout(() => {
        if (level < 5) {
          setLevel(level + 1);
          setPieces(pieces + 2);
        } else {
          onComplete && onComplete();
        }
      }, 2000);
    } else {
      setShowHint(true);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-50 to-pink-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-purple-600 mb-4">
            Chia Bánh Sinh Nhật 🎂
          </h1>
          <div className="bg-white rounded-2xl shadow-lg p-6 inline-block">
            <div className="space-y-2">
              <p className="text-2xl font-bold text-gray-800">Cấp độ {level}/5</p>
              <p className="text-xl text-gray-600">
                Hãy chọn <InlineMath math={question} /> phần của chiếc bánh
              </p>
            </div>
          </div>
        </div>

        {/* Cake SVG */}
        <div className="flex justify-center mb-8">
          <div className="relative">
            <svg
              width="400"
              height="400"
              viewBox="0 0 400 400"
              className="transform hover:scale-105 transition-transform duration-500"
            >
              {/* Cake plate */}
              <circle cx="200" cy="200" r="190" fill="#fce7f3" stroke="#f472b6" strokeWidth="8" />
              
              {/* Cake base */}
              <circle cx="200" cy="200" r="170" fill="#fbcfe8" />
              
              {/* Cake pieces */}
              {[...Array(pieces)].map((_, index) => {
                const angle = (360 / pieces) * index;
                const largeArc = 360 / pieces > 180 ? 1 : 0;
                const radius = 150;

                const x1 = 200 + radius * Math.cos((angle * Math.PI) / 180);
                const y1 = 200 + radius * Math.sin((angle * Math.PI) / 180);
                const x2 = 200 + radius * Math.cos(((angle + 360 / pieces) * Math.PI) / 180);
                const y2 = 200 + radius * Math.sin(((angle + 360 / pieces) * Math.PI) / 180);

                const isSelected = selectedPieces.includes(index);

                return (
                  <g key={index}>
                    <path
                      d={`M200,200 L${x1},${y1} A${radius},${radius} 0 ${largeArc},1 ${x2},${y2} Z`}
                      fill={isSelected ? '#c084fc' : '#fdf2f8'}
                      stroke="#db2777"
                      strokeWidth="2"
                      className="cursor-pointer transition-all duration-300 hover:brightness-95"
                      onClick={() => handlePieceClick(index)}
                    />
                    {/* Decorative dots */}
                    <circle
                      cx={200 + (radius - 30) * Math.cos(((angle + 360 / pieces / 2) * Math.PI) / 180)}
                      cy={200 + (radius - 30) * Math.sin(((angle + 360 / pieces / 2) * Math.PI) / 180)}
                      r="4"
                      fill="#f472b6"
                      className="animate-pulse"
                    />
                  </g>
                );
              })}

              {/* Center decoration */}
              <circle cx="200" cy="200" r="30" fill="#f472b6" />
              <circle cx="200" cy="200" r="20" fill="#db2777" />
              <circle cx="200" cy="200" r="10" fill="#be185d" />
            </svg>

            {/* Candles */}
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="absolute top-12 transform -translate-x-1/2"
                style={{
                  left: `${50 + (i - 1) * 20}%`,
                }}
              >
                <div className="w-4 h-16 bg-gradient-to-b from-yellow-200 to-yellow-400 rounded-full" />
                <div className="w-2 h-2 mx-auto -mt-2 bg-orange-500 rounded-full animate-flame" />
              </div>
            ))}
          </div>
        </div>

        {/* Controls */}
        <div className="flex flex-col items-center space-y-6">
          <button
            onClick={checkAnswer}
            className="px-8 py-4 text-xl font-bold text-white bg-gradient-to-r from-pink-500 to-purple-500 rounded-full shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-xl active:scale-95"
          >
            Kiểm tra
          </button>

          {showHint && !isCorrect && (
            <div className="bg-red-100 text-red-700 px-6 py-3 rounded-lg text-center animate-bounce">
              Hãy thử lại! Bạn cần chọn đúng số phần được yêu cầu.
            </div>
          )}

          {isCorrect && (
            <div className="bg-green-100 text-green-700 px-6 py-3 rounded-lg text-center animate-bounce">
              🎉 Tuyệt vời! Cùng tiếp tục nào! 🎉
            </div>
          )}
        </div>
      </div>

      {/* Custom styles */}
      <style jsx>{`
        @keyframes flame {
          0%, 100% { transform: scale(1) rotate(-2deg); }
          50% { transform: scale(1.1) rotate(2deg); }
        }
        .animate-flame {
          animation: flame 1s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default CakeFractions; 