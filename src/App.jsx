import './App.css'
import SelectGradeScreen from './screens/SelectGradeScreen'
import PlacementTestScreen from './screens/PlacementTestScreen'
import LearningMapScreen from './screens/LearningMapScreen'
import { GameProvider } from './GameContext'
import { useState } from 'react'
import TopicDetailScreen from './screens/TopicDetailScreen'
import QuestionScreen from './screens/QuestionScreen'

function AppContent() {
  const [step, setStep] = useState(1);
  const [selectedTopic, setSelectedTopic] = useState("");
  const [nodeProgress, setNodeProgress] = useState({
    "Phép nhân": 0,
    "Phép chia": 0,
    "Biểu thức có ngoặc": 0
  });

  if (step === 1) return <SelectGradeScreen next={() => setStep(2)} />;
  if (step === 2) return <PlacementTestScreen next={() => setStep(3)} />;
  
if (step === 3) return (
  <LearningMapScreen
    progressData={nodeProgress}
    onSelectNode={(nodeName) => {
      setSelectedTopic(nodeName);
      setStep(4);
    }}
  />
);
if (step === 4) return (
  <TopicDetailScreen
    topic={selectedTopic}
    onBack={() => setStep(3)}
    onProgressUpdate={(topic, percent) => {
      setNodeProgress((prev) => ({
        ...prev,
        [topic]: percent
      }));
    }}
  />
);

}

function App() {
  return (
    <GameProvider>
      <AppContent />
    </GameProvider>
  );
}

export default App;
