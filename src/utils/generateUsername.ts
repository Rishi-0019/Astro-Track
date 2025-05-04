// utils/generateUsername.ts
const adjectives = ['stellar', 'lunar', 'cosmic', 'star', 'nova', 'galactic'];
const nouns = ['rishi', 'phoenix', 'titan', 'voyager', 'nebula', 'comet'];

export function generateUsername() {
  const adj = adjectives[Math.floor(Math.random() * adjectives.length)];
  const noun = nouns[Math.floor(Math.random() * nouns.length)];
  const num = Math.floor(1000 + Math.random() * 9000); // 4-digit number
  return `${adj}_${noun}_${num}`;
}
