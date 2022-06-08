import * as React from 'react';
import { IndividualEntry } from './IndividualEntry';
import { ShootersGroup } from './ShootersGroup';

interface ShootersProps {
  shooters: IndividualEntry[];
  handleEdit: (entry: IndividualEntry) => void;
  isReadOnly: Boolean;
}

function buildShootersByScoutGroup(shooters: IndividualEntry[]) {
  const competitorsByScoutGroup: Map<string, IndividualEntry[]> = new Map();

  const entryToComparableShooterName = (entry: IndividualEntry) =>
    `${entry.shooter.lastName},${entry.shooter.firstName}`;

  const orderedShooters = shooters.sort((entryA, entryB) => {
    const nameA = entryToComparableShooterName(entryA);
    const nameB = entryToComparableShooterName(entryB);
    return nameA.localeCompare(nameB);
  });

  orderedShooters.forEach((entry) => {
    const { scoutGroup } = entry.shooter;
    const isScoutGroupInMap = competitorsByScoutGroup.has(scoutGroup);
    if (!isScoutGroupInMap) {
      competitorsByScoutGroup.set(scoutGroup, []);
    }
    const scoutGroupCompetitors = competitorsByScoutGroup.get(scoutGroup);
    if (scoutGroupCompetitors != null) {
      scoutGroupCompetitors.push(entry);
    }
  });
  return competitorsByScoutGroup;
}

export function ShootersList({
  shooters,
  handleEdit,
  isReadOnly,
}: ShootersProps): JSX.Element {
  const competitorsByScoutGroup = buildShootersByScoutGroup(shooters);

  const elementsToReturn: JSX.Element[] = [];

  competitorsByScoutGroup.forEach((shootersInGroup, scoutGroup) => {
    const groupKey = scoutGroup;
    elementsToReturn.push(
      <ShootersGroup
        scoutGroupName={scoutGroup}
        shootersInGroup={shootersInGroup}
        key={groupKey}
        handleEdit={handleEdit}
        isReadOnly={isReadOnly}
      />
    );
  });

  const elementsToReturnSortedByGroup = elementsToReturn.sort(
    (elementA, elementB) => {
      const keyA = elementA.key?.toString() ?? '';
      const keyB = elementB.key?.toString() ?? '';
      return keyA.localeCompare(keyB);
    }
  );

  // eslint-disable-next-line react/jsx-no-useless-fragment
  return <>{elementsToReturnSortedByGroup}</>;
}
