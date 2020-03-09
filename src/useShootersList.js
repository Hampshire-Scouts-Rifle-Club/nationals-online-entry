import {
    useEffect,
    useState
} from 'react'
import {
    API,
    graphqlOperation
} from 'aws-amplify'
import {
    listShooters
} from './graphql/queries'

export default function () {
    const [shooters, updateShooters] = useState([{id: "abc", firstName: "Joe", "surname": "Bloggs"}])

    useEffect(() => {
        async function retrieveShooters() {
            try {
                const shooters = await API.graphql(graphqlOperation(listShooters))
                updateShooters(shooters.data.listShooters.items)
            } catch (err) {
                updateShooters([{id: "abcs", firstName: "Oh", "surname": "Dear!"}])
                console.log('error: ', err)
            }
        }
        retrieveShooters();
    }, [])

    return shooters
}