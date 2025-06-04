import React, { useState } from 'react';
import CakeFractions from './games/CakeFractions/CakeFractions';
import AppleDivision from './games/AppleDivision/AppleDivision';
import BracketExpressions from './games/BracketExpressions/BracketExpressions';

const GameHub = () => {
  const [selectedGame, setSelectedGame] = useState(null);
  const [completedGames, setCompletedGames] = useState([]);

  const games = [
    {
      id: 'fractions',
      title: 'Chia Bánh Sinh Nhật',
      description: 'Học phân số qua việc chia bánh sinh nhật',
      icon: '🎂',
      component: CakeFractions,
      difficulty: 'Dễ',
      skills: ['Phân số', 'Chia đều']
    },
    {
      id: 'division',
      title: 'Chia Táo',
      description: 'Học phép chia qua việc chia táo vào các nhóm',
      icon: '🍎',
      component: AppleDivision,
      difficulty: 'Trung bình',
      skills: ['Phép chia', 'Nhóm']
    },
    {
      id: 'brackets',
      title: 'Biểu Thức Ngoặc',
      description: 'Học cách tính biểu thức có dấu ngoặc',
      icon: '🎯',
      component: BracketExpressions,
      difficulty: 'Khó',
      skills: ['Biểu thức', 'Thứ tự tính']
    }
  ];

  const handleGameComplete = (gameId) => {
    if (!completedGames.includes(gameId)) {
      setCompletedGames([...completedGames, gameId]);
    }
    setSelectedGame(null);
  };

  if (selectedGame) {
    const GameComponent = games.find(g => g.id === selectedGame).component;
    return (
      <div className="relative">
        <button
          onClick={() => setSelectedGame(null)}
          className="fixed top-4 left-4 z-10 px-4 py-2 bg-pink-400 text-white rounded-full hover:bg-pink-500 shadow-lg"
        >
          ← Quay lại
        </button>
        <GameComponent onComplete={() => handleGameComplete(selectedGame)} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-100 via-pink-100 to-purple-100 px-4 py-10">
      <div className="max-w-6xl mx-auto text-center space-y-8">
        <h1 className="text-4xl md:text-5xl font-extrabold text-purple-700 drop-shadow-sm">
          Học Toán Vui 🎮
        </h1>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {games.map((game) => (
            <div
              key={game.id}
              className={`bg-white rounded-3xl shadow-2xl p-6 flex flex-col items-center justify-between hover:scale-105 transition-all duration-300 ${
                completedGames.includes(game.id) ? 'border-4 border-green-400' : ''
              }`}
            >
              <div className="text-6xl mb-3 animate-bounce">{game.icon}</div>
              <h2 className="text-xl font-bold text-indigo-700 mb-1">{game.title}</h2>
              <p className="text-gray-600 text-sm mb-3 leading-relaxed">{game.description}</p>

              <div className="flex flex-wrap justify-center gap-2 mb-4">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    game.difficulty === 'Dễ'
                      ? 'bg-green-200 text-green-800'
                      : game.difficulty === 'Trung bình'
                      ? 'bg-yellow-200 text-yellow-800'
                      : 'bg-red-200 text-red-800'
                  }`}
                >
                  {game.difficulty}
                </span>
                {game.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium"
                  >
                    {skill}
                  </span>
                ))}
              </div>

              <button
                onClick={() => setSelectedGame(game.id)}
                className="bg-pink-500 text-white w-full py-2 mt-auto rounded-full shadow-md hover:bg-pink-600 transition duration-200"
              >
                {completedGames.includes(game.id) ? 'Chơi lại' : 'Bắt đầu'}
              </button>
            </div>
          ))}
        </div>

        {completedGames.length > 0 && (
          <div className="bg-white rounded-2xl shadow-xl p-6 mx-auto w-full max-w-md text-center">
            <h3 className="text-lg font-bold text-green-700">🎉 Thành tích của bạn</h3>
            <p className="text-gray-700 mb-3">
              Bạn đã hoàn thành {completedGames.length} / {games.length} trò chơi
            </p>
            <div className="h-4 w-full bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-green-500"
                style={{ width: `${(completedGames.length / games.length) * 100}%` }}
              ></div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GameHub;
