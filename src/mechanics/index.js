import { ROUNDS_TO_WIN, ROUNDS_TO_LOSE } from '../constants';

export const startManos = [6, 13, 0];
export const startVentiles = [0, 0, 0, 0, 0, 0];

let successfulChecks = 0;
let unsuccessfulChecks = 0;

export const checkWinCondition = manos => {
  const win = isWinCondition(manos);
  if (win) {
    successfulChecks++;
    unsuccessfulChecks = 0;
  } else {
    unsuccessfulChecks++;
    successfulChecks = 0;
  }
  return successfulChecks > ROUNDS_TO_WIN;
};

export const isLoseCondition = manos => {
  if (manos[2] > 10) return true;
  if (manos[1] > 25) return true;
  if (manos[1] < 10) return true;

  return false;
};

export const isIdleCondition = manos => {
  if (unsuccessfulChecks > ROUNDS_TO_LOSE) return true;
};

export const isWinCondition = manos => {
  return manos[2] >= 7.6 && manos[2] <= 8.4;
};
