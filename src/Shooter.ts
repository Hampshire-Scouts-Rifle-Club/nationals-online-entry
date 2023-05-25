export type Shooter = {
  id: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  isOver18: boolean;
  scoutGroup: string;
  county: string;
  previousCompetitorNumber: string;
  isRangeOfficer: boolean;
  rangeOfficerProofUrl: string;
};

export const EmptyShooter: Shooter = {
  id: '',
  firstName: '',
  lastName: '',
  dateOfBirth: new Date('January 1, 1900 00:00:01').toISOString(),
  isOver18: false,
  scoutGroup: '',
  county: '',
  previousCompetitorNumber: '',
  isRangeOfficer: false,
  rangeOfficerProofUrl: '',
};
