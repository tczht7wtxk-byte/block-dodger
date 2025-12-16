import { Game } from "./components/game/Game";
import "@fontsource/inter";

function App() {
  return (
    <div style={{ width: '100vw', height: '100vh', position: 'relative', overflow: 'hidden' }}>
      <Game />
    </div>
  );
}

export default App;
