export const CurrentCompetitionYear = '2026';

// The competition is on 23 November 2026. Ages are calculated against this
// date and decide the over-18 / 14-18 / under-14 bands that gate event
// eligibility, so it is not cosmetic.
export const CompetitionDate = Date.parse('2026-11-23T00:00Z');

// The entry window. AppPostal.tsx opens the form on
// `EntryOpeningDate <= now < EntryClosingDate`, so both ends matter.
//
// Both are written as the UTC instant of midnight UK local time, per the
// convention in docs/annual-rollover.md:
//   opening — TEMPORARILY midnight BST on 11 September 2026 (23:00Z on
//             10 September) so the form can be tested end to end before
//             launch. The real opening is midnight BST on 1 October 2026,
//             which is 23:00Z on 30 September — restore
//             `2026-09-30T23:00:00Z` before launch; tracked as D36 in
//             docs/backlog.md.
//   closing — the day after the intended close of 21 November 2026, at
//             01:00:00Z. November is GMT, so this gives entrants an hour
//             past midnight rather than closing exactly at midnight. That
//             errs in the entrant's favour and is the existing convention;
//             do not change it without telling the organisers.
//
// Individual addresses can be let in outside this window through the
// closing-date-override table, which unlocks both ends of it.
export const EntryOpeningDate = new Date('2026-09-10T23:00:00Z');
export const EntryClosingDate = new Date('2026-11-22T01:00:00Z');

// Declared in all four copies of this file and read by nothing — see D9 in
// docs/backlog.md. Kept aligned with EntryClosingDate for consistency; it
// does not extend anyone's deadline.
export const GracePeriodEntryClosingDate = new Date('2026-11-22T01:00:00Z');

// The 2026 artwork is an SVG and is present in both this repository's
// public/ and the deployed fork's, so both copies of this file now name the
// same file. This constant and the file must match byte for byte — that
// mismatch was B3.
export const logoImage = 'NSRC 2026 Logo.svg';
export const logoImageAltText = 'National Scout Rifle Postal Competition 2026';

export const BaseEntryCost = 5;
export const MaxEventSlots = 8;
export const MaxRoEventSlots = 8;
export const RoDiscount = 0;
