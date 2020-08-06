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
  dateOfBirth: new Date(),
  scoutGroup: '',
  county: '',
  didEnterLastYear: false,
  isRangeOfficer: false,
  rangeOfficerProofUrl: '',
};
