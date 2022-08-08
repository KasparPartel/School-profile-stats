// Calculates what level this amount of XP would be at
export function calculateLevel(xp) {
  let level = 0;

  while (levelNeededXP(++level) < xp) {}

  return level - 1;
}

// Returns the amount of XP needed for any given level
export function levelNeededXP(level) {
  return Math.round(level * (176 + 3 * level * (47 + 11 * level)));
}
