import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import * as React from 'react';
import { IndividualEntry } from './IndividualEntry';
import ShooterSummary from './ShooterSummary';

type ShootersGroupCardProps = {
  scoutGroupName: string;
  shootersInGroup: IndividualEntry[];
  handleEdit: (entry: IndividualEntry) => void;
};

function ShootersGroupCard({
  scoutGroupName,
  shootersInGroup,
  handleEdit,
}: ShootersGroupCardProps): JSX.Element {
  function buildSummaryOfShooters() {
    const allShooterSummaries = shootersInGroup.map((individualEntry) => (
      <ShooterSummary
        key={individualEntry.shooter.id}
        shooter={individualEntry.shooter}
        eventsEntered={individualEntry.eventsEntered}
        handleEdit={() => handleEdit(individualEntry)}
      />
    ));
    const withDividers = allShooterSummaries.map((summaryElement, index) => [
      index > 0 && <Divider variant="middle" style={{ margin: '0.5rem' }} />,
      summaryElement,
    ]);

    return withDividers;
  }

  return (
    <>
      <div
        key={scoutGroupName}
        style={{
          backgroundColor: '#e0e0e0',
          marginLeft: '-0.5rem',
          marginRight: '-0.5rem',
        }}
      >
        <Typography
          gutterBottom
          variant="h6"
          component="h2"
          style={{ marginLeft: '0.5rem', marginRight: '0.5rem' }}
        >
          {scoutGroupName}
        </Typography>
      </div>
      <div style={{ marginBottom: '1rem' }}>{buildSummaryOfShooters()}</div>
    </>
  );
}

export default ShootersGroupCard;
