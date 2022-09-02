export function randomValue(min: number, max: number): number {
  return (Math.random() * (max - min + 1) + min)
}

export function randomInt(min: number, max: number): number {
  return Math.floor(randomValue(min, max))
}
