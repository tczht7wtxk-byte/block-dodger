import { useAvoidGame, PLAYER_SIZE, PLAYER_Y } from "@/lib/stores/useAvoidGame";

export function Player() {
  const playerX = useAvoidGame((state) => state.playerX);

  return (
    <mesh position={[playerX, PLAYER_Y, 0]}>
      <boxGeometry args={[PLAYER_SIZE, PLAYER_SIZE, PLAYER_SIZE]} />
      <meshStandardMaterial color="#4ade80" />
    </mesh>
  );
}
