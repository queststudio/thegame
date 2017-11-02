import { ROUNDS_TO_WIN, ROUNDS_TO_LOSE } from '../constants';
import { random } from '../utils';

export const startManos = [6, 13, 0];
export const startVentiles = [0, 0, 0, 0, 0, 0];

let successfulChecks = 0;
let unsuccessfulChecks = 0;

export const drop = () => {
  successfulChecks = 0;
  unsuccessfulChecks = 0;
};

const equals = (expected, actual) => {
  if (expected == null || actual == null) return false;
  if (expected.length !== actual.length) return false;

  const normalized = actual.map(x => (x > 0 ? 1 : 0));

  for (var i = 0; i < expected.length; ++i)
    if (expected[i] != normalized[i]) return false;
  return true;
};

const getA = (manos, ventiles) => {
  if (
    equals([0, 0, 0, 1, 1, 1], ventiles) ||
    equals([0, 0, 1, 1, 1, 1], ventiles) ||
    equals([0, 1, 0, 1, 1, 1], ventiles) ||
    equals([0, 1, 1, 1, 1, 1], ventiles) ||
    equals([1, 0, 0, 1, 1, 1], ventiles) ||
    equals([1, 0, 1, 1, 1, 1], ventiles) ||
    equals([1, 1, 0, 1, 1, 1], ventiles)
  )
    return (
      (manos[1] - manos[0]) *
      (Math.min(ventiles[3], ventiles[4], ventiles[5]) / 100)
    );

  if (
    equals([1, 1, 1, 0, 0, 0], ventiles) ||
    equals([1, 1, 1, 0, 0, 1], ventiles) ||
    equals([1, 1, 1, 0, 1, 0], ventiles) ||
    equals([1, 1, 1, 0, 1, 1], ventiles) ||
    equals([1, 1, 1, 1, 0, 1], ventiles)
  ) {
    return manos[0] * 0.65 * (Math.min(ventiles[0], ventiles[1], ventiles[2])/ 100);
  }

  if (
    equals([1, 1, 1, 1, 1, 0], ventiles) ||
    equals([1, 1, 1, 1, 1, 1], ventiles)
  ) {
    return (
      (manos[1] - manos[0]) *
      (Math.min(ventiles[3], ventiles[4], ventiles[5]) / 100)
    );
  }
};

const getMano1 = (manos, ventiles) => {
  return random(50, 100) / 10;
};

const getMano2 = (manos, ventiles) => {
  let r = manos[1];
  const a = getA(manos, ventiles);

  if (
    equals([0, 0, 0, 1, 1, 1], ventiles) ||
    equals([0, 0, 1, 1, 1, 1], ventiles) ||
    equals([0, 1, 0, 1, 1, 1], ventiles) ||
    equals([0, 1, 1, 1, 1, 1], ventiles) ||
    equals([1, 0, 0, 1, 1, 1], ventiles) ||
    equals([1, 0, 1, 1, 1, 1], ventiles) ||
    equals([1, 1, 0, 1, 1, 1], ventiles)
  ) {
    r = r - a;
  }
  if (
    equals([1, 1, 1, 0, 0, 0], ventiles) ||
    equals([1, 1, 1, 0, 0, 1], ventiles) ||
    equals([1, 1, 1, 0, 1, 0], ventiles) ||
    equals([1, 1, 1, 0, 1, 1], ventiles) ||
    equals([1, 1, 1, 1, 0, 1], ventiles)
  ) {
    r = r + a;
  }

  if (
    equals([1, 1, 1, 1, 1, 0], ventiles) ||
    equals([1, 1, 1, 1, 1, 1], ventiles)
  )
    r = r - 0.7 * a;

  return r;
};
const getMano3 = (manos, ventiles) => {
  let r = manos[0];
  const a = getA(manos, ventiles);

  if (
    equals([0, 0, 0, 1, 1, 1], ventiles) ||
    equals([0, 0, 1, 1, 1, 1], ventiles) ||
    equals([0, 1, 0, 1, 1, 1], ventiles) ||
    equals([0, 1, 1, 1, 1, 1], ventiles) ||
    equals([1, 0, 0, 1, 1, 1], ventiles) ||
    equals([1, 0, 1, 1, 1, 1], ventiles) ||
    equals([1, 1, 0, 1, 1, 1], ventiles)
  ) {
    r = r + a;
  }
  if (
    equals([1, 1, 1, 0, 0, 0], ventiles) ||
    equals([1, 1, 1, 0, 0, 1], ventiles) ||
    equals([1, 1, 1, 0, 1, 0], ventiles) ||
    equals([1, 1, 1, 0, 1, 1], ventiles) ||
    equals([1, 1, 1, 1, 0, 1], ventiles)
  ) {
    r = r - a;
  }

  if (
    equals([1, 1, 1, 1, 1, 0], ventiles) ||
    equals([1, 1, 1, 1, 1, 1], ventiles)
  )
    r = r + 0.7 * a;

  return r;
};

export const calculateNewState = (manos, ventiles) => {
  return [
    getMano1(manos, ventiles),
    getMano2(manos, ventiles),
    getMano3(manos, ventiles),
  ];
};

export const checkWinCondition = manos => {
  const win = isWinCondition(manos);
  if (win) {
    successfulChecks++;
    unsuccessfulChecks = 0;
  } else {
    unsuccessfulChecks++;
    successfulChecks = 0;
  }
  return successfulChecks >= ROUNDS_TO_WIN;
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
  return manos[2] >= 7 && manos[2] <= 8.5;
};
