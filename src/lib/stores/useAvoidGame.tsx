import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";

export type GamePhase = "ready" | "playing" | "ended";

export interface Block {
  id: string;
  x: number;
  y: number;
  speed: number;
}

const SPAWN_INTERVAL = 800;
const BLOCK_SPEED = 4;
const SPAWN_Y = 5;
const DESPAWN_Y = -5;
const BOUNDARY = 5;
const PLAYER_SIZE = 0.8;
const BLOCK_SIZE = 0.7;
const PLAYER_Y = -3.5;
const PLAYER_SPEED = 8;

let blockIdCounter = 0;

interface AvoidGameState {
  phase: GamePhase;
  score: number;
  playerX: number;
  blocks: Block[];
  lastSpawnTime: number;
  lastScoreTime: number;
  leftPressed: boolean;
  rightPressed: boolean;
  
  start: () => void;
  restart: () => void;
  setInput: (left: boolean, right: boolean) => void;
  gameLoop: (deltaMs: number) => void;
}

export const useAvoidGame = create<AvoidGameState>()(
  subscribeWithSelector((set, get) => ({
    phase: "ready",
    score: 0,
    playerX: 0,
    blocks: [],
    lastSpawnTime: 0,
    lastScoreTime: 0,
    leftPressed: false,
    rightPressed: false,
    
    start: () => {
      set({ 
        phase: "playing", 
        score: 0, 
        blocks: [], 
        playerX: 0,
        lastSpawnTime: 0,
        lastScoreTime: 0,
        leftPressed: false,
        rightPressed: false
      });
    },
    
    restart: () => {
      set({ 
        phase: "ready", 
        score: 0, 
        blocks: [], 
        playerX: 0,
        lastSpawnTime: 0,
        lastScoreTime: 0,
        leftPressed: false,
        rightPressed: false
      });
    },
    
    setInput: (left, right) => set({ leftPressed: left, rightPressed: right }),
    
    gameLoop: (deltaMs: number) => {
      const state = get();
      if (state.phase !== "playing") return;
      
      const deltaSec = deltaMs / 1000;
      
      let movement = 0;
      if (state.leftPressed) movement -= PLAYER_SPEED * deltaSec;
      if (state.rightPressed) movement += PLAYER_SPEED * deltaSec;
      
      let newPlayerX = state.playerX + movement;
      newPlayerX = Math.max(-BOUNDARY, Math.min(BOUNDARY, newPlayerX));
      
      let newBlocks = [...state.blocks];
      let newLastSpawnTime = state.lastSpawnTime + deltaMs;
      let newLastScoreTime = state.lastScoreTime + deltaMs;
      let newScore = state.score;
      
      if (newLastSpawnTime >= SPAWN_INTERVAL) {
        newLastSpawnTime = 0;
        const randomX = (Math.random() - 0.5) * BOUNDARY * 2;
        const newBlock: Block = {
          id: `block_${Date.now()}_${blockIdCounter++}`,
          x: randomX,
          y: SPAWN_Y,
          speed: BLOCK_SPEED + Math.random() * 2,
        };
        newBlocks.push(newBlock);
      }
      
      if (newLastScoreTime >= 100) {
        newLastScoreTime = 0;
        newScore = state.score + 1;
      }
      
      newBlocks = newBlocks
        .map((block) => ({
          ...block,
          y: block.y - block.speed * deltaSec,
        }))
        .filter((block) => block.y > DESPAWN_Y);
      
      for (const block of newBlocks) {
        const dx = Math.abs(block.x - newPlayerX);
        const dy = Math.abs(block.y - PLAYER_Y);
        const collisionThreshold = (PLAYER_SIZE + BLOCK_SIZE) / 2;
        
        if (dx < collisionThreshold && dy < collisionThreshold) {
          console.log("Collision detected! Game over.");
          set({ 
            phase: "ended",
            blocks: [],
            playerX: newPlayerX,
            lastSpawnTime: 0,
            lastScoreTime: 0,
            leftPressed: false,
            rightPressed: false
          });
          return;
        }
      }
      
      set({
        playerX: newPlayerX,
        blocks: newBlocks,
        lastSpawnTime: newLastSpawnTime,
        lastScoreTime: newLastScoreTime,
        score: newScore,
      });
    },
  }))
);

export { PLAYER_SIZE, BLOCK_SIZE, PLAYER_Y };
