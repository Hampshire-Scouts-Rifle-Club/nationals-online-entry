import { Card, CardContent } from '@material-ui/core';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
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
      key={individualEntry.shooter.id}
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
      <CardContent>
        <Typography gutterBottom variant="h5" component="h2">
          {scoutGroupName}
        </Typography>
        {buildSummaryOfShooters(shootersInGroup)}
      </CardContent>
    </Card>
  );
}

export default ShootersGroupCard;
