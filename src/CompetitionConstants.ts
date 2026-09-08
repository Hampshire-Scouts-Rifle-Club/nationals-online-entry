export const CurrentCompetitionYear = '2026';

// PROVISIONAL — the organisers have not confirmed the 2026 dates.
// CompetitionDate is not cosmetic: ages are calculated against it and decide
// the over-18 / 14-18 / under-14 bands that gate event eligibility, so this
// must be replaced with the real date before the form is opened.
export const CompetitionDate = Date.parse('2027-01-30T00:00Z');

// The form is deliberately CLOSED. AppPostal.tsx opens it on
// `now < EntryClosingDate` alone, so any future date here opens the form to
// the public. This sentinel keeps it shut; specific addresses are unlocked
// through the closing-date-override table instead. Opening the form for real
// is a one-line change to this date, once the organisers confirm.
export const EntryClosingDate = new Date('2000-01-01T00:00:00Z');
export const GracePeriodEntryClosingDate = new Date('2000-01-01T00:00:00Z');

// Still the 2025 artwork: no 2026 logo exists in public/ yet. This constant
// and the file in public/ must change together and match byte for byte —
// that mismatch was B3.
export const logoImage = 'NSRC 2025 Logo.svg';
export const logoImageAltText = 'National Scout Rifle Postal Competition 2025';

export const BaseEntryCost = 5;
export const MaxEventSlots = 8;
export const MaxRoEventSlots = 8;
export const RoDiscount = 0;
