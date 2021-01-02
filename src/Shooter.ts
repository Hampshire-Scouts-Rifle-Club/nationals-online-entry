export type Shooter = {
  id: string;
  firstName: string;
  lastName: string;
  dateOfBirth: Date;
  scoutGroup: string;
  county: string;
  didEnterLastYear: boolean;
  isRangeOfficer: boolean;
  rangeOfficerProofUrl: string;
};

export const EmptyShooter: Shooter = {
  id: '',
  firstName: '',
  lastName: '',
  dateOfBirth: new Date('January 1, 1900 00:00:01'),
  scoutGroup: '',
  county: '',
  didEnterLastYear: false,
  isRangeOfficer: false,
  rangeOfficerProofUrl: '',
};
