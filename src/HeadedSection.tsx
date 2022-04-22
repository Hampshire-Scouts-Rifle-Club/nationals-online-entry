import React, { PropsWithChildren } from 'react';
import { Typography, Box } from '@material-ui/core';

type HeadedSectionProps = {
  title: string;
};

export function HeadedSection({
  title,
  children,
}: PropsWithChildren<HeadedSectionProps>): JSX.Element {
  return (
    <div>
      <Typography variant="h5">{title}</Typography>
      <Box
        borderColor="grey.500"
        borderRadius="borderRadius"
        bgcolor="background.paper"
        border={1}
        padding={1}
        marginBottom={2}
      >
        {children}
      </Box>
    </div>
  );
}
