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
import {of} from 'rxjs'
import useObservable from './useObservable'

export type Shooter = {
    id: string;
    firstName: string;
    surname: string;
    scoutGroup: string;
    ageDuringCompetition: number;
    enteredLastYear: boolean;
    isRangeOfficer: boolean;
    rangeOfficerCertificate: string;
}

const mockShooters: Shooter[] = [
    { id: "1", firstName: "John", surname: "Holcroft", scoutGroup: "1st Knaphill", ageDuringCompetition: 45, enteredLastYear: true, isRangeOfficer: true, rangeOfficerCertificate: ""},
    { id: "2", firstName: "Jon", surname: "Culshaw", scoutGroup: "1st Knaphill", ageDuringCompetition: 51, enteredLastYear: true, isRangeOfficer: true, rangeOfficerCertificate: ""},
    { id: "3", firstName: "Luke", surname: "Holcroft", scoutGroup: "1st Knaphill", ageDuringCompetition: 15, enteredLastYear: true, isRangeOfficer: false, rangeOfficerCertificate: ""},
];

const mockShooters$ = of(mockShooters);

export default function (): Shooter[] {
    // const [shooters, updateShooters] = useState([{id: "abc", firstName: "Joe", "surname": "Bloggs"}])

    // useEffect(() => {
    //     async function retrieveShooters() {
    //         try {
    //             const shooters = await API.graphql(graphqlOperation(listShooters, {filter:null}))
    //             updateShooters(shooters.data.listShooters.items)
    //         } catch (err) {
    //             updateShooters([{id: "abcs", firstName: "Oh", "surname": "Dear!"}])
    //             console.log('error: ', err)
    //         }
    //     }
    //     retrieveShooters();
    // }, [])

    // return shooters

    return useObservable(mockShooters$, []);
}