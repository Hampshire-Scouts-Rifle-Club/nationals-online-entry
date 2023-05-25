export function calculateAge(dateOfBirth: Date, onDate = Date.now()): number {
  const differenceFromNow = onDate - dateOfBirth.getTime();
  const ageAsDate = new Date(differenceFromNow);

  return Math.abs(ageAsDate.getUTCFullYear() - 1970);
}

export function earliestDateOfBirthForAge(
  age: number,
  onDate = Date.now()
): Date {
  const earliestDate = new Date(onDate);
  earliestDate.setFullYear(earliestDate.getFullYear() - age);
  return earliestDate;
}
