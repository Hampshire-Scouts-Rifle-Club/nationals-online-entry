import { Typography } from '@material-ui/core';
import * as React from 'react';
import { CampHelper } from './CampHelper';

type CampHelpersListProps = {
  campHelpers: CampHelper[];
};

function buildDbsElement(scoutAssociationId: string) {
  const hasNoScoutAssociationId = scoutAssociationId.trim().length === 0;

  if (hasNoScoutAssociationId) {
    return (
      <Typography display="inline" color="error">
        DBS: Missing
      </Typography>
    );
  }
  return (
    <Typography display="inline">{`DBS:${scoutAssociationId}`}</Typography>
  );
}

function buildCampHelperElement(campHelper: CampHelper) {
  const id =
    campHelper.firstName + campHelper.lastName + campHelper.scoutAssociationId;

  return (
    <Typography key={id}>
      {`${campHelper.firstName} ${campHelper.lastName}, `}
      {buildDbsElement(campHelper.scoutAssociationId)}
    </Typography>
  );
}

function CampHelpersList({ campHelpers }: CampHelpersListProps): JSX.Element {
  const campHelperElements = campHelpers.map(
    (campHelper) => buildCampHelperElement(campHelper)
    // eslint-disable-next-line function-paren-newline
  );

  if (campHelperElements.length > 0) {
    campHelperElements.push(<hr />);
  }

  return (
    <>
      {campHelperElements}
      <Typography variant="caption" paragraph color="textSecondary">
        All adult camp helpers must be listed and have a Scout DBS.
      </Typography>
    </>
  );
}

export default CampHelpersList;
