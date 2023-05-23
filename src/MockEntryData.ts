import { Shooter } from './Shooter';
import {
  advancedFieldTarget,
  knockout,
  airRifle6yd,
  airPistol6yd,
  fieldTarget,
  ownPistol,
  ownRifle10mSporter,
  ownRifle6yd,
  smallBore,
  targetSprint,
  threePositionSporter,
} from './AllEvents';
import { IndividualEntry } from './IndividualEntry';

export const shooterBillyBloggs: Shooter = {
  id: 'billybloggs',
  firstName: 'Billy',
  lastName: 'Bloggs',
  scoutGroup: '1st Knaphill',
  dateOfBirth: '2008-01-01T00:00:01.000Z',
  previousCompetitorNumber: '209',
  isRangeOfficer: false,
  rangeOfficerProofUrl: '',
  county: 'Surrey',
};
export const entryBillyBloggs: IndividualEntry = {
  shooter: shooterBillyBloggs,
  enteredEventIds: [
    knockout.id,
    airRifle6yd.id,
    airPistol6yd.id,
    fieldTarget.id,
  ],
};
export const shooterJohnHolcroft: Shooter = {
  id: '1',
  firstName: 'John',
  lastName: 'Holcroft',
  scoutGroup: '1st Knaphill',
  dateOfBirth: '1974-11-15T00:00:01.000Z',
  previousCompetitorNumber: '',
  isRangeOfficer: true,
  rangeOfficerProofUrl: '',
  county: 'Surrey',
};
export const entryJohnHolcroft: IndividualEntry = {
  shooter: shooterJohnHolcroft,
  enteredEventIds: [
    knockout.id,
    airRifle6yd.id,
    airPistol6yd.id,
    fieldTarget.id,
    ownRifle6yd.id,
    ownRifle10mSporter.id,
    ownPistol.id,
    targetSprint.id,
  ],
};
export const shooterJonCulshaw: Shooter = {
  id: '2',
  firstName: 'Jon',
  lastName: 'Culshaw',
  scoutGroup: '1st Knaphill',
  dateOfBirth: '1967-04-11T00:00:01.000Z',
  previousCompetitorNumber: '',
  isRangeOfficer: true,
  rangeOfficerProofUrl: '',
  county: 'Surrey',
};
export const entryJonCulshaw: IndividualEntry = {
  shooter: shooterJonCulshaw,
  enteredEventIds: [
    knockout.id,
    airRifle6yd.id,
    airPistol6yd.id,
    fieldTarget.id,
    ownRifle6yd.id,
    ownRifle10mSporter.id,
    ownPistol.id,
    advancedFieldTarget.id,
  ],
};
export const shooterJamesWest: Shooter = {
  id: '3',
  firstName: 'James',
  lastName: 'West',
  scoutGroup: '1st Knaphill',
  dateOfBirth: '2007-12-09T00:00:01.000Z',
  previousCompetitorNumber: '123',
  isRangeOfficer: false,
  rangeOfficerProofUrl: '',
  county: 'Surrey',
};
export const entryJamesWest: IndividualEntry = {
  shooter: shooterJamesWest,
  enteredEventIds: [
    knockout.id,
    airRifle6yd.id,
    airPistol6yd.id,
    fieldTarget.id,
    ownRifle6yd.id,
    ownRifle10mSporter.id,
    ownPistol.id,
  ],
};
export const shooterLukeHolcroft: Shooter = {
  id: '4',
  firstName: 'Luke',
  lastName: 'Holcroft',
  scoutGroup: 'Woking ESU',
  dateOfBirth: '2005-11-01T00:00:01.000Z',
  previousCompetitorNumber: '123',
  isRangeOfficer: false,
  rangeOfficerProofUrl: '',
  county: 'Surrey',
};
export const entryLukeHolcroft: IndividualEntry = {
  shooter: shooterLukeHolcroft,
  enteredEventIds: [
    knockout.id,
    airRifle6yd.id,
    airPistol6yd.id,
    fieldTarget.id,
    ownRifle6yd.id,
    ownRifle10mSporter.id,
    ownPistol.id,
    smallBore.id,
    targetSprint.id,
  ],
};
export const shooterJennaCulshaw: Shooter = {
  id: '5',
  firstName: 'Jenna',
  lastName: 'Culshaw',
  scoutGroup: 'Woking ESU',
  dateOfBirth: '2004-04-01T00:00:01.000Z',
  previousCompetitorNumber: '',
  isRangeOfficer: false,
  rangeOfficerProofUrl: '',
  county: 'Surrey',
};
export const entryJennaCulshaw: IndividualEntry = {
  shooter: shooterJennaCulshaw,
  enteredEventIds: [
    knockout.id,
    airRifle6yd.id,
    airPistol6yd.id,
    fieldTarget.id,
    ownRifle6yd.id,
    ownRifle10mSporter.id,
    ownPistol.id,
    smallBore.id,
    targetSprint.id,
    threePositionSporter.id,
  ],
};
