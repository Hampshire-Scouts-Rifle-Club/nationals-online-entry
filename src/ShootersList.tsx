import * as React from 'react';
import useShootersList, {Shooter} from './useShootersList';

function ShootersList() {
    const shooters = useShootersList()

    return <>
              <ul className="shooters-list">
                {shooters.map((shooter:Shooter) => <li key={shooter.id}>{shooter.firstName} {shooter.surname}</li>)}
              </ul>
           </>;
}

export default ShootersList;