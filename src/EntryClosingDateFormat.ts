// Formats an entry-closing instant for display to entrants.
//
// EntryClosingDate is set to 01:00 UTC on the day *after* the intended
// local closing date (see the comment on it in CompetitionConstants.ts) —
// a deliberate one-hour grace period that errs in the entrant's favour. A
// bare date-only string (`toLocaleDateString()`) hides that hour: it reads
// as "the form is open for the whole of this day", when the true cutoff is
// 01:00 that morning. Showing the date *and* time sidesteps the BST/GMT
// arithmetic needed to recover "the intended closing date" and states the
// actual cutoff instant, so the text can never mislead an entrant about
// when the form shuts.
export function formatClosingDateTime(date: Date): string {
  return date.toLocaleString("en-GB", {
    dateStyle: "long",
    timeStyle: "short",
    timeZone: "Europe/London",
  });
}
