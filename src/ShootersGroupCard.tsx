import { Card, CardHeader, Divider } from '@material-ui/core';
import * as React from 'react';
import { IndividualEntry } from './IndividualEntry';
import ShooterSummary from './ShooterSummary';

type ShootersGroupCardProps = {
  scoutGroupName: string;
  shootersInGroup: IndividualEntry[];
};

function buildSummaryOfShooters(shootersInGroup: IndividualEntry[]) {
  const allShooterSummaries = shootersInGroup.map((individualEntry) => (
    <ShooterSummary
      shooter={individualEntry.shooter}
      eventsEntered={individualEntry.eventsEntered}
    />
  ));

  const withDividers = allShooterSummaries.map((summaryElement, index) => [
    index > 0 && <Divider variant="middle" style={{ margin: '0.5rem' }} />,
    summaryElement,
  ]);

  return withDividers;
}

function ShootersGroupCard({
  scoutGroupName,
  shootersInGroup,
}: ShootersGroupCardProps): JSX.Element {
  return (
    <Card key={scoutGroupName}>
      <CardHeader title={scoutGroupName} />
      <div
        style={{
          paddingLeft: '1rem',
          paddingRight: '1rem',
          paddingBottom: '1rem',
        }}
      >
        {buildSummaryOfShooters(shootersInGroup)}
      </div>
    </Card>
  );
}

export default ShootersGroupCard;
