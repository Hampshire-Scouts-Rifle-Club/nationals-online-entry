import { ShootingEvent } from './ShootingEvent';

const noDecimalsFormatter = new Intl.NumberFormat('en-GB', {
  style: 'currency',
  currency: 'GBP',
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});

const decimalsFormatter = new Intl.NumberFormat('en-GB', {
  style: 'currency',
  currency: 'GBP',
  minimumFractionDigits: 2,
});

export function sumCost(events: ShootingEvent[]): number {
  return events.map(({ cost }) => cost).reduce((sum, i) => sum + i, 0);
}

export function sumSlots(events: ShootingEvent[]): number {
  return events.map(({ slots }) => slots).reduce((sum, i) => sum + i, 0);
}

export function getCostString(cost: number): string {
  const isWholeNumber = cost % 1 === 0;
  const formatter = isWholeNumber ? noDecimalsFormatter : decimalsFormatter;
  return formatter.format(cost);
}
