import basic from './basic';
import brackets from './brackets';
import operators from './operators';

export const tokens = {
  ...basic,
  ...brackets,
  ...operators,
}

export default [
  ...basic,
  ...brackets,
  ...operators,
];
