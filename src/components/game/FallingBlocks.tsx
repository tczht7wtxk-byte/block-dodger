import * as THREE from "three";
import { useAvoidGame, Block, BLOCK_SIZE } from "@/lib/stores/useAvoidGame";

interface BlockMeshProps {
  block: Block;
}

function BlockMesh({ block }: BlockMeshProps) {
  return (
    <mesh position={[block.x, block.y, 0]}>
      <boxGeometry args={[BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE]} />
      <meshStandardMaterial color="#ef4444" />
    </mesh>
  );
}

export function FallingBlocks() {
  const blocks = useAvoidGame((state) => state.blocks);

  return (
    <>
      {blocks.map((block) => (
        <BlockMesh key={block.id} block={block} />
      ))}
    </>
  );
}
