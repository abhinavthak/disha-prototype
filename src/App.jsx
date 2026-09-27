import { useState } from 'react';
import DetailsScreen from './screens/DetailsScreen.jsx';
import ConnectingScreen from './screens/ConnectingScreen.jsx';
import ConversationScreen from './screens/ConversationScreen.jsx';
import ReportScreen from './screens/ReportScreen.jsx';

export default function App() {
  const [screen, setScreen] = useState('details'); // details | connecting | conversation | report
  const [key, setKey] = useState(0);

  function restart() {
    setKey((k) => k + 1);
    setScreen('details');
  }

  return (
    <div className="app-frame">
      {screen === 'details' && (
        <DetailsScreen onStart={() => setScreen('connecting')} />
      )}
      {screen === 'connecting' && (
        <ConnectingScreen onDone={() => setScreen('conversation')} onCancel={restart} />
      )}
      {screen === 'conversation' && (
        <ConversationScreen key={key} onEnd={restart} onFinish={() => setScreen('report')} />
      )}
      {screen === 'report' && (
        <ReportScreen onRestart={restart} />
      )}
    </div>
  );
}
