export type PostalAddress = {
  addresseeName: string;
  // Free text, one line of the address per line, ending with the postcode.
  address: string;
};

export const EmptyPostalAddress: PostalAddress = {
  addresseeName: '',
  address: '',
};

/**
 * Rewrites an address block the way the entry form stores it: one line of the
 * address per line. Entrants type addresses on a single line separated by
 * commas as readily as they press Return, so commas become line breaks and the
 * empty parts left by trailing or doubled commas are dropped.
 */
export function normaliseAddressBlock(address: string): string {
  return tidyLines(address.split(/[,\r\n]/)).join('\n');
}

/**
 * Whether an address has everything needed to post a parcel: a name and at
 * least one line of address. This is the rule the entry form enforces before
 * an entry can be submitted, and the same rule its dialog enforces before the
 * address can be saved.
 */
export function isPostalAddressComplete(
  postalAddress: PostalAddress | undefined,
): boolean {
  if (!postalAddress) {
    return false;
  }

  return (
    postalAddress.addresseeName.trim().length > 0 &&
    postalAddress.address.trim().length > 0
  );
}

/**
 * The lines of the free-text address block on their own, without the name —
 * one column each in the team download.
 */
export function buildAddressBlockLines(
  postalAddress: PostalAddress | undefined,
): string[] {
  if (!postalAddress) {
    return [];
  }

  return tidyLines(postalAddress.address.split(/\r?\n/));
}

/**
 * Flattens an address into the lines you would write on a parcel label: the
 * name, then each line of the free-text block. Blank lines are dropped and
 * each line trimmed, so an address nobody filled in gives no lines at all.
 * Entries submitted in years before the address was collected have none,
 * hence the undefined case.
 */
export function buildAddressLines(
  postalAddress: PostalAddress | undefined,
): string[] {
  if (!postalAddress) {
    return [];
  }

  return tidyLines([
    postalAddress.addresseeName,
    ...postalAddress.address.split(/\r?\n/),
  ]);
}

function tidyLines(lines: string[]): string[] {
  return lines.map((line) => line.trim()).filter((line) => line.length > 0);
}
