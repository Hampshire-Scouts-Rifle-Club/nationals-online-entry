import * as React from 'react';
import { Shooter } from "./Shooter";

type ShootersProps = {
  shooters: Shooter[];
}

function ShootersList({ shooters }: ShootersProps) {
  return <>
    <ul className="shooters-list">
      {shooters.map((shooter: Shooter) => <li key={shooter.id}>{shooter.firstName} {shooter.lastName}, {calculateAge(shooter.dateOfBirth).toString()}{buildIsRoString(shooter.isRangeOfficer)} </li>)}
    </ul>
  </>;
}

function calculateAge(dateOfBirth: Date) {
  var differenceFromNow = Date.now() - dateOfBirth.getTime();
  var ageAsDate = new Date(differenceFromNow);

  return Math.abs(ageAsDate.getUTCFullYear() - 1970);
}

function buildIsRoString(isRangeOfficer: boolean) {
  if (isRangeOfficer) {
    return ", RO";
  } else { 
    return "";
  }
}

export default ShootersList;