import { useAvoidGame } from "@/lib/stores/useAvoidGame";

export function GameUI() {
  const { phase, score, start, restart } = useAvoidGame();

  return (
    <div className="absolute inset-0 pointer-events-none">
      <div className="absolute top-4 left-4 bg-black/70 text-white px-4 py-2 rounded-lg">
        <span className="text-xl font-bold">Score: {score}</span>
      </div>

      {phase === "ready" && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-auto">
          <div className="bg-black/80 text-white p-8 rounded-xl text-center max-w-md">
            <h1 className="text-4xl font-bold mb-4">Avoid Game</h1>
            <p className="text-lg mb-2">Use arrow keys to move left and right</p>
            <p className="text-lg mb-6">Avoid the falling red blocks!</p>
            <button
              onClick={start}
              className="bg-green-500 hover:bg-green-600 text-white text-xl font-bold px-8 py-4 rounded-lg transition-colors"
            >
              Start Game
            </button>
          </div>
        </div>
      )}

      {phase === "ended" && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-auto">
          <div className="bg-black/80 text-white p-8 rounded-xl text-center max-w-md">
            <h1 className="text-4xl font-bold mb-4 text-red-400">Game Over!</h1>
            <p className="text-2xl mb-6">Final Score: {score}</p>
            <button
              onClick={restart}
              className="bg-blue-500 hover:bg-blue-600 text-white text-xl font-bold px-8 py-4 rounded-lg transition-colors"
            >
              Play Again
            </button>
          </div>
        </div>
      )}

      {phase === "playing" && (
        <div className="absolute bottom-4 left-4 bg-black/50 text-white px-3 py-1 rounded text-sm">
          Use ← → arrow keys to move
        </div>
      )}
    </div>
  );
}
