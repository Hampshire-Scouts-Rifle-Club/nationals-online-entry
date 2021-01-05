export function calculateAge(dateOfBirth: Date, onDate = Date.now()): number {
  const differenceFromNow = onDate - dateOfBirth.getTime();
  const ageAsDate = new Date(differenceFromNow);

  return Math.abs(ageAsDate.getUTCFullYear() - 1970);
}

export default calculateAge;
