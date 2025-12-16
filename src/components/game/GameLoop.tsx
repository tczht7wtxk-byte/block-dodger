import { useFrame } from "@react-three/fiber";
import { useKeyboardControls } from "@react-three/drei";
import { useAvoidGame } from "@/lib/stores/useAvoidGame";

enum Controls {
  left = "left",
  right = "right",
}

export function GameLoop() {
  const setInput = useAvoidGame((state) => state.setInput);
  const gameLoop = useAvoidGame((state) => state.gameLoop);
  const [, getKeys] = useKeyboardControls<Controls>();

  useFrame((_, delta) => {
    const { left, right } = getKeys();
    setInput(left, right);
    gameLoop(delta * 1000);
  });

  return null;
}
