import { replace } from 'lodash';

// ----------------------------------------------------------------------

export function fCurrency(number) {
  return format(Number.isInteger(number) ? '$0,0' : '$0,0.00');
}

export function fPercent(number) {
  return format('0.0%');
}

export function fNumber(number) {
  return format();
}

export function fShortenNumber(number) {
  return replace(format('0.00a'), '.00', '');
}

export function fData(number) {
  return format('0.0 b');
}
