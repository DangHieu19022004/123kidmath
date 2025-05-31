import { createContext, useContext, useState } from "react";

const GameContext = createContext();

export const GameProvider = ({ children }) => {
  const [grade, setGrade] = useState(3);
  const [level, setLevel] = useState(null); // 'pro' | 'ontrack' | 'weak'
  const [xp, setXp] = useState(0);

  return (
    <GameContext.Provider value={{ grade, setGrade, level, setLevel, xp, setXp }}>
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => useContext(GameContext);
