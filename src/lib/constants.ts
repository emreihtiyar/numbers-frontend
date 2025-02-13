export const GRID_SIZE = 10;

export const MOVE_RULES = {
  VERTICAL_HORIZONTAL_DISTANCE: 3,
  DIAGONAL_DISTANCE: 2,
} as const;

export const UNDO_RULES = {
  MAX_DIRECT_UNDO_STEPS: 1,
} as const; 