// import {
//     useEffect,
//     useState
// } from 'react'
// import {
//     API,
//     graphqlOperation
// } from 'aws-amplify'
// import {
//     listShooters
// } from './graphql/queries'
import { of } from 'rxjs';
import useObservable from './useObservable';
import { Shooter } from './Shooter';

const mockShooters: Shooter[] = [
  {
    id: '1',
    firstName: 'John',
    lastName: 'Holcroft',
    scoutGroup: '1st Knaphill',
    dateOfBirth: new Date('November 15, 1974 00:00:01'),
    didEnterLastYear: true,
    isRangeOfficer: true,
    rangeOfficerProofUrl: '',
    county: 'Surrey',
  },
];

const mockShooters$ = of(mockShooters);

export default function X(): Shooter[] {
  return useObservable(mockShooters$, []);
}
