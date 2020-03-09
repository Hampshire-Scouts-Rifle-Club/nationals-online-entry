import * as React from 'react';
import useShootersList from './useShootersList';

function ShootersList() {
    const shooters = useShootersList()

    return <div>
              <ul>
                {shooters.map(shooter => <li key={shooter.id}>{shooter.firstName} {shooter.surname}</li>)}
              </ul>
           </div>;
}

export default ShootersList;