import { useState } from "react";
import { useGame } from "../GameContext";
import classroomBg from "../assets/classroom.png";
import { motion, AnimatePresence } from "framer-motion";

export default function SelectGradeScreen({ next }) {
  const { grade, setGrade } = useGame();
  const [selected, setSelected] = useState(grade || 3);
  const [isHovering, setIsHovering] = useState(null);
  const gradeOptions = [1, 2, 3, 4, 5];

  const handleStart = () => {
    setGrade(selected);
    next();
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  const gradeEmojis = {
    1: "🌱",
    2: "🌿",
    3: "🌺",
    4: "🌸",
    5: "🌳"
  };

  return (
    <div
      className="w-screen h-screen bg-cover bg-center bg-no-repeat flex items-center justify-center relative overflow-hidden"
      style={{
        backgroundImage: `url(${classroomBg})`,
        aspectRatio: '16/9',
        maxWidth: '1920px',
        maxHeight: '1080px',
        width: '100%',
        height: '100%',
        margin: '0 auto',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)'
      }}
    >
      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-white rounded-full"
            animate={{
              x: [0, Math.random() * 100 - 50],
              y: [-20, window.innerHeight],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: Math.random() * 2 + 3,
              repeat: Infinity,
              ease: "linear",
              delay: Math.random() * 2,
            }}
            style={{
              left: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative text-center w-11/12 max-w-4xl"
      >
        <motion.h1
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-7xl font-bold mb-16 tracking-wider"
          style={{
            color: '#FFD700',
            textShadow: '2px 2px 0 #FFA500, 4px 4px 0 rgba(0,0,0,0.2), 0 0 20px rgba(255,215,0,0.5)',
          }}
        >
          Bạn đang học lớp mấy?
        </motion.h1>

        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="flex flex-wrap justify-center gap-8 mb-16"
        >
          {gradeOptions.map((g) => (
            <motion.button
              key={g}
              variants={item}
              whileHover={{ 
                scale: 1.1,
                y: -5,
              }}
              whileTap={{ scale: 0.95 }}
              onHoverStart={() => setIsHovering(g)}
              onHoverEnd={() => setIsHovering(null)}
              onClick={() => setSelected(g)}
              className={`
                relative px-14 py-6 rounded-2xl font-bold text-3xl transition-all duration-300
                ${selected === g
                  ? "bg-gradient-to-r from-yellow-400 to-orange-500 text-white shadow-[0_0_20px_rgba(255,215,0,0.5)] transform scale-105"
                  : "bg-white text-gray-700 hover:text-gray-900 shadow-lg hover:shadow-xl hover:shadow-white/50"
                }
              `}
            >
              <AnimatePresence>
                {isHovering === g && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.5, y: -10 }}
                    animate={{ opacity: 1, scale: 1.2, y: -20 }}
                    exit={{ opacity: 0, scale: 0.5, y: -10 }}
                    className="absolute left-1/2 transform -translate-x-1/2 -top-8"
                  >
                    <span className="text-4xl filter drop-shadow-lg">{gradeEmojis[g]}</span>
                  </motion.div>
                )}
              </AnimatePresence>
              Lớp {g}
            </motion.button>
          ))}
        </motion.div>

        <motion.button
          whileHover={{ 
            scale: 1.05,
          }}
          whileTap={{ scale: 0.98 }}
          onClick={handleStart}
          className="group relative px-16 py-7 bg-gradient-to-r from-emerald-400 to-teal-500
                     text-white text-3xl font-bold rounded-2xl 
                     transition-all duration-300 shadow-lg hover:shadow-2xl hover:shadow-emerald-500/50"
        >
          <div className="absolute inset-0 rounded-2xl bg-black/10" />
          <div className="relative flex items-center justify-center">
            <span className="inline-block group-hover:scale-110 transition-transform duration-300">🚀</span>
            <span className="ml-4 font-bold">Bắt đầu khảo sát đầu vào</span>
          </div>
        </motion.button>

        {/* Background decorative elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.1, 0.2, 0.1],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute -left-20 -top-20 w-60 h-60 bg-yellow-500/20 rounded-full blur-3xl"
          />
          <motion.div
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.1, 0.15, 0.1],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1,
            }}
            className="absolute -right-20 -bottom-20 w-60 h-60 bg-emerald-500/20 rounded-full blur-3xl"
          />
        </div>
      </motion.div>
    </div>
  );
}