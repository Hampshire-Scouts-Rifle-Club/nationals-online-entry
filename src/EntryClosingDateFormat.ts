// Formats an entry-closing instant for display to entrants.
//
// EntryClosingDate is set to 01:00 UTC on the day *after* the intended
// local closing date (see the comment on it in CompetitionConstants.ts) —
// a deliberate one-hour grace period that errs in the entrant's favour.
// Neither a bare date ("22/11/2026", reads as "open all day on this date")
// nor a bare date-and-time ("22 November 2026 at 01:00", where the eye
// lands on the day name and the time reads as a technicality) says
// unambiguously when the form shuts. formatClosingDeadline states the
// exact cutoff instant *and* the day organisers actually advertise as the
// closing date, so neither reading can mislead an entrant.
//
// formatIntendedClosingDay recovers that advertised day without repeating
// the BST/GMT arithmetic mistake this file's history already made once:
// subtracting the fixed one-hour grace period from EntryClosingDate does
// NOT reliably land on the intended day (in GMT it lands back on the
// day-after instant itself — a case this file's own test coverage
// exercises). What *is* always true, in both BST and GMT, is that
// EntryClosingDate's local calendar date (Europe/London) is exactly one
// calendar day after the intended closing date — that is what "the day
// after" in the constant's convention means. So the correct closing day is
// found by reading EntryClosingDate's local calendar date and subtracting
// one whole calendar day, not any fixed number of hours.

function formatLongDate(date: Date, timeZone: string): string {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone,
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).formatToParts(date);
  const part = (type: string) =>
    parts.find((p) => p.type === type)?.value ?? "";
  return `${part("weekday")} ${part("day")} ${part("month")} ${part("year")}`;
}

function localCalendarDateParts(date: Date, timeZone: string) {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(date);
  const get = (type: string) => Number(parts.find((p) => p.type === type)?.value);
  return { year: get("year"), month: get("month"), day: get("day") };
}

/** "01:00 on Sunday 22 November 2026" — the exact cutoff instant. */
export function formatClosingInstant(date: Date): string {
  const time = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Europe/London",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
  return `${time} on ${formatLongDate(date, "Europe/London")}`;
}

/**
 * "Saturday 21 November 2026" — the closing date organisers actually
 * advertise, one whole calendar day before EntryClosingDate's local date.
 * Anchored at UTC noon on that calendar day, then formatted in UTC, so the
 * result does not depend on the reader's own timezone.
 */
export function formatIntendedClosingDay(date: Date): string {
  const { year, month, day } = localCalendarDateParts(date, "Europe/London");
  const closingCalendarDay = new Date(Date.UTC(year, month - 1, day, 12));
  closingCalendarDay.setUTCDate(closingCalendarDay.getUTCDate() - 1);
  return formatLongDate(closingCalendarDay, "UTC");
}

/**
 * "01:00 on Sunday 22 November 2026 — in practice, the end of Saturday 21
 * November 2026." States the literal cutoff so it cannot mislead, and
 * names the day the organisers advertise so it does not read as a
 * technicality either.
 */
export function formatClosingDeadline(date: Date): string {
  return `${formatClosingInstant(date)} — in practice, the end of ${formatIntendedClosingDay(date)}`;
}
