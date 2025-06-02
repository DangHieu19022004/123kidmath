import './App.css'
import SelectGradeScreen from './screens/SelectGradeScreen'
import PlacementTestScreen from './screens/PlacementTestScreen'
import LearningMapScreen from './screens/LearningMapScreen'
import { GameProvider } from './GameContext'
import { useState } from 'react'
import TopicDetailScreen from './screens/TopicDetailScreen'
import QuestionScreen from './screens/QuestionScreen'
import 'katex/dist/katex.min.css';
import { InlineMath } from 'react-katex';


function AppContent() {
  const [step, setStep] = useState(1);
  const [selectedTopic, setSelectedTopic] = useState("");
  const [lessonData, setLessonData] = useState({});
  const [nodeProgress, setNodeProgress] = useState({
  "Phân số": 0,
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
    setNodeProgress((prev) => ({ ...prev, [topic]: percent }));
  }}
  savedLessons={lessonData[selectedTopic]}
  onSaveLessons={(lessons) =>
    setLessonData((prev) => ({ ...prev, [selectedTopic]: lessons }))
  }
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
