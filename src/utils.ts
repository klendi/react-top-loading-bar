export function randomInt(min: number, max: number): number {
  // @ts-ignore
  return Math.floor(Math.random() * (max - min + 1) + min)
}
