import React, { useState, useEffect } from 'react';
import { InlineMath } from 'react-katex';
import confetti from 'canvas-confetti';

const BracketExpressions = ({ onComplete }) => {
  const [level, setLevel] = useState(1);
  const [expression, setExpression] = useState('');
  const [options, setOptions] = useState([]);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isCorrect, setIsCorrect] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [currentProblem, setCurrentProblem] = useState(null);

  const generateQuestion = () => {
    let exp = '';
    let correctAnswer = 0;
    let problemData = {};
    
    switch(level) {
      case 1:
        // Simple brackets: (2 + 3) × 2
        problemData.num1 = Math.floor(Math.random() * 5) + 1;
        problemData.num2 = Math.floor(Math.random() * 5) + 1;
        problemData.multiplier = Math.floor(Math.random() * 3) + 2;
        exp = `(${problemData.num1} + ${problemData.num2}) \\times ${problemData.multiplier}`;
        correctAnswer = (problemData.num1 + problemData.num2) * problemData.multiplier;
        break;
      case 2:
        // Nested brackets: (2 + (3 × 2))
        problemData.inner1 = Math.floor(Math.random() * 3) + 1;
        problemData.inner2 = Math.floor(Math.random() * 3) + 2;
        problemData.outer = Math.floor(Math.random() * 3) + 1;
        exp = `(${problemData.outer} + (${problemData.inner1} \\times ${problemData.inner2}))`;
        correctAnswer = problemData.outer + (problemData.inner1 * problemData.inner2);
        break;
      case 3:
        // Multiple operations: (2 × 3) + (4 × 2)
        problemData.pair1a = Math.floor(Math.random() * 3) + 1;
        problemData.pair1b = Math.floor(Math.random() * 3) + 2;
        problemData.pair2a = Math.floor(Math.random() * 3) + 2;
        problemData.pair2b = Math.floor(Math.random() * 3) + 1;
        exp = `(${problemData.pair1a} \\times ${problemData.pair1b}) + (${problemData.pair2a} \\times ${problemData.pair2b})`;
        correctAnswer = (problemData.pair1a * problemData.pair1b) + (problemData.pair2a * problemData.pair2b);
        break;
      case 4:
        // Mixed operations: (2 + 3) × (4 - 1)
        problemData.sum1 = Math.floor(Math.random() * 3) + 1;
        problemData.sum2 = Math.floor(Math.random() * 3) + 2;
        problemData.diff1 = Math.floor(Math.random() * 3) + 3;
        problemData.diff2 = Math.floor(Math.random() * 2) + 1;
        exp = `(${problemData.sum1} + ${problemData.sum2}) \\times (${problemData.diff1} - ${problemData.diff2})`;
        correctAnswer = (problemData.sum1 + problemData.sum2) * (problemData.diff1 - problemData.diff2);
        break;
      case 5:
        // Complex expression: ((2 + 3) × 2) + 1
        problemData.base1 = Math.floor(Math.random() * 3) + 1;
        problemData.base2 = Math.floor(Math.random() * 3) + 2;
        problemData.mult = Math.floor(Math.random() * 2) + 2;
        problemData.add = Math.floor(Math.random() * 3) + 1;
        exp = `((${problemData.base1} + ${problemData.base2}) \\times ${problemData.mult}) + ${problemData.add}`;
        correctAnswer = ((problemData.base1 + problemData.base2) * problemData.mult) + problemData.add;
        break;
    }

    // Generate wrong answers
    const wrongAnswers = [
      correctAnswer + 1,
      correctAnswer - 1,
      correctAnswer + 2,
    ].sort(() => Math.random() - 0.5);

    setExpression(exp);
    setOptions([...wrongAnswers.slice(0, 3), correctAnswer].sort(() => Math.random() - 0.5));
    setSelectedAnswer(null);
    setIsCorrect(false);
    setShowHint(false);
    setCurrentProblem(problemData);
  };

  useEffect(() => {
    generateQuestion();
  }, [level]);

  const checkAnswer = () => {
    if (selectedAnswer === null) {
      setShowHint(true);
      return;
    }

    // Tính toán kết quả đúng dựa trên biểu thức
    let correctResult;
    
    switch(level) {
      case 1:
        // (2 + 3) × 2
        correctResult = (currentProblem.num1 + currentProblem.num2) * currentProblem.multiplier;
        break;
      case 2:
        // (2 + (3 × 2))
        correctResult = currentProblem.outer + (currentProblem.inner1 * currentProblem.inner2);
        break;
      case 3:
        // (2 × 3) + (4 × 2)
        correctResult = (currentProblem.pair1a * currentProblem.pair1b) + 
                       (currentProblem.pair2a * currentProblem.pair2b);
        break;
      case 4:
        // (2 + 3) × (4 - 1)
        correctResult = (currentProblem.sum1 + currentProblem.sum2) * 
                       (currentProblem.diff1 - currentProblem.diff2);
        break;
      case 5:
        // ((2 + 3) × 2) + 1
        correctResult = ((currentProblem.base1 + currentProblem.base2) * 
                         currentProblem.mult) + currentProblem.add;
        break;
      default:
        correctResult = 0;
    }

    if (selectedAnswer === correctResult) {
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
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-indigo-50 to-purple-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 mb-4">
            Biểu Thức Ngoặc 🎯
          </h1>
          <div className="bg-white rounded-2xl shadow-lg p-6 inline-block">
            <div className="space-y-4">
              <div className="flex items-center justify-center space-x-3">
                <span className="text-2xl font-bold text-gray-800">Cấp độ {level}/5</span>
                <div className="flex space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <div
                      key={i}
                      className={`w-3 h-3 rounded-full ${
                        i < level ? 'bg-indigo-500' : 'bg-gray-200'
                      }`}
                    />
                  ))}
                </div>
              </div>
              <div>
                <p className="text-xl font-medium text-gray-600 mb-2">Tính giá trị biểu thức:</p>
                <div className="bg-indigo-50 rounded-xl p-4 shadow-inner">
                  <div className="text-3xl md:text-4xl text-indigo-700">
                    <InlineMath math={expression} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Options Grid */}
        <div className="grid grid-cols-2 gap-4 md:gap-6 max-w-2xl mx-auto mb-8">
          {options.map((option, index) => (
            <button
              key={index}
              onClick={() => setSelectedAnswer(option)}
              className={`relative overflow-hidden p-6 md:p-8 text-2xl md:text-3xl font-bold rounded-2xl transition-all duration-300 transform hover:scale-105 ${
                selectedAnswer === option
                  ? 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-lg scale-105'
                  : 'bg-white text-gray-700 hover:shadow-lg'
              }`}
            >
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-indigo-400" />
                {[...Array(4)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-12 h-12 rounded-full border-4 border-current transform -translate-x-1/2 -translate-y-1/2"
                    style={{
                      left: `${25 + (i % 2) * 50}%`,
                      top: `${25 + Math.floor(i / 2) * 50}%`,
                    }}
                  />
                ))}
              </div>
              <span className="relative">{option}</span>
            </button>
          ))}
        </div>

        {/* Controls and Feedback */}
        <div className="flex flex-col items-center space-y-6">
          <button
            onClick={checkAnswer}
            disabled={selectedAnswer === null}
            className={`px-8 py-4 text-xl font-bold text-white rounded-full shadow-lg transform transition-all duration-300 ${
              selectedAnswer === null
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-gradient-to-r from-blue-500 to-indigo-500 hover:scale-105 hover:shadow-xl active:scale-95'
            }`}
          >
            Kiểm tra
          </button>

          {showHint && !isCorrect && (
            <div className="bg-red-100 text-red-700 px-6 py-3 rounded-lg text-center animate-bounce">
              Hãy thử lại! Nhớ tính các phép tính trong ngoặc trước.
            </div>
          )}

          {isCorrect && (
            <div className="bg-green-100 text-green-700 px-6 py-3 rounded-lg text-center animate-bounce">
              🎉 Tuyệt vời! Cùng tiếp tục nào! 🎉
            </div>
          )}

          {/* Tips Section */}
          <div className="bg-white rounded-2xl shadow-lg p-6 max-w-2xl w-full mt-8">
            <h3 className="text-xl font-bold text-indigo-600 mb-4 flex items-center">
              <span className="text-2xl mr-2">💡</span> Mẹo giải nhanh:
            </h3>
            <ul className="space-y-3 text-gray-600">
              <li className="flex items-start">
                <span className="text-indigo-500 mr-2">1.</span>
                Luôn tính phép tính trong ngoặc trước
              </li>
              <li className="flex items-start">
                <span className="text-indigo-500 mr-2">2.</span>
                Nếu có nhiều cặp ngoặc, tính từ trong ra ngoài
              </li>
              <li className="flex items-start">
                <span className="text-indigo-500 mr-2">3.</span>
                Nhớ thứ tự ưu tiên: × chia trước, + - sau
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BracketExpressions; 