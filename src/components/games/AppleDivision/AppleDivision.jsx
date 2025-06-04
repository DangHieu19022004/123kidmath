import React, { useState, useEffect } from 'react';
import { InlineMath } from 'react-katex';
import confetti from 'canvas-confetti';

const AppleDivision = ({ onComplete }) => {
  const [level, setLevel] = useState(1);
  const [totalApples, setTotalApples] = useState(6);
  const [groups, setGroups] = useState(2);
  const [userAnswer, setUserAnswer] = useState([]);
  const [isCorrect, setIsCorrect] = useState(false);
  const [showHint, setShowHint] = useState(false);

  const generateQuestion = () => {
    const newTotal = Math.floor(Math.random() * 4) * 2 + 6; // 6, 8, 10, or 12 apples
    const newGroups = Math.floor(Math.random() * 2) + 2; // 2 or 3 groups
    setTotalApples(newTotal);
    setGroups(newGroups);
    setUserAnswer(Array(newGroups).fill(0));
    setIsCorrect(false);
    setShowHint(false);
  };

  useEffect(() => {
    generateQuestion();
  }, [level]);

  const handleGroupChange = (groupIndex, increment) => {
    const newAnswer = [...userAnswer];
    if (increment) {
      if (newAnswer.reduce((a, b) => a + b, 0) < totalApples) {
        newAnswer[groupIndex]++;
      }
    } else {
      if (newAnswer[groupIndex] > 0) {
        newAnswer[groupIndex]--;
      }
    }
    setUserAnswer(newAnswer);
  };

  const checkAnswer = () => {
    const correctApplesPerGroup = totalApples / groups;
    const isAllCorrect = userAnswer.every(count => count === correctApplesPerGroup);
    
    if (isAllCorrect) {
      setIsCorrect(true);
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
      setTimeout(() => {
        if (level < 5) {
          setLevel(level + 1);
        } else {
          onComplete && onComplete();
        }
      }, 2000);
    } else {
      setShowHint(true);
    }
  };

  return (
    <div className="flex flex-col items-center p-8 bg-gradient-to-b from-green-100 to-yellow-100 min-h-screen">
      <h1 className="text-4xl font-bold text-green-600 mb-8">Chia Táo 🍎</h1>
      
      <div className="mb-8 text-center">
        <p className="text-xl mb-4">Cấp độ {level}/5</p>
        <p className="text-lg mb-2">
          Chia {totalApples} quả táo vào {groups} nhóm bằng nhau
        </p>
        <p className="text-md text-gray-600">
          <InlineMath math={`${totalApples} \\div ${groups} = ?`} />
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
        {userAnswer.map((count, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-lg font-semibold mb-4">Nhóm {index + 1}</h3>
            <div className="flex flex-wrap justify-center gap-2 mb-4">
              {[...Array(count)].map((_, i) => (
                <span key={i} className="text-2xl">🍎</span>
              ))}
            </div>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => handleGroupChange(index, false)}
                className="px-3 py-1 bg-red-500 text-white rounded-full"
              >
                -
              </button>
              <span className="text-xl font-bold">{count}</span>
              <button
                onClick={() => handleGroupChange(index, true)}
                className="px-3 py-1 bg-green-500 text-white rounded-full"
              >
                +
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center mb-4">
        <p className="text-lg">
          Tổng số táo đã chia: {userAnswer.reduce((a, b) => a + b, 0)}/{totalApples}
        </p>
      </div>

      <button
        onClick={checkAnswer}
        className="px-6 py-3 bg-green-500 text-white rounded-full text-lg font-semibold hover:bg-green-600 transition-colors"
      >
        Kiểm tra
      </button>

      {showHint && !isCorrect && (
        <p className="mt-4 text-red-500">
          Hãy thử lại! Mỗi nhóm phải có số táo bằng nhau.
        </p>
      )}

      {isCorrect && (
        <div className="mt-4 text-green-500 text-xl font-bold animate-bounce">
          🎉 Tuyệt vời! 🎉
        </div>
      )}
    </div>
  );
};

export default AppleDivision; 