import { Canvas } from "@react-three/fiber";
import { KeyboardControls } from "@react-three/drei";
import { Player } from "./Player";
import { FallingBlocks } from "./FallingBlocks";
import { GameUI } from "./GameUI";
import { GameLoop } from "./GameLoop";

const keyMap = [
  { name: "left", keys: ["ArrowLeft", "KeyA"] },
  { name: "right", keys: ["ArrowRight", "KeyD"] },
];

function GameScene() {
  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={1} />
      
      <mesh position={[0, -4.5, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[12, 10]} />
        <meshStandardMaterial color="#1e293b" />
      </mesh>

      <mesh position={[-6, 0, 0]}>
        <boxGeometry args={[0.2, 10, 1]} />
        <meshStandardMaterial color="#475569" />
      </mesh>
      <mesh position={[6, 0, 0]}>
        <boxGeometry args={[0.2, 10, 1]} />
        <meshStandardMaterial color="#475569" />
      </mesh>

      <GameLoop />
      <Player />
      <FallingBlocks />
    </>
  );
}

export function Game() {
  return (
    <div className="w-full h-full relative">
      <KeyboardControls map={keyMap}>
        <Canvas
          camera={{
            position: [0, 0, 10],
            fov: 50,
            near: 0.1,
            far: 100,
          }}
        >
          <color attach="background" args={["#0f172a"]} />
          <GameScene />
        </Canvas>
        <GameUI />
      </KeyboardControls>
    </div>
  );
}
