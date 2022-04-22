import { Box, Grid, Typography } from '@material-ui/core';
import ErrorIcon from '@material-ui/icons/Error';

const errorBoxStyle = {
  flex: 1,
  display: 'flex',
  flexDirection: 'column' as const,
  alignItems: 'center',
  padding: '20px',
  borderWidth: 2,
  borderColor: '#C72B1F',
  borderStyle: 'solid',
  backgroundColor: '#fcf1ef',
  outline: 'none',
};

export type ErrorBoxProps = {
  error: Error;
};
export function ErrorBox({ error }: ErrorBoxProps): JSX.Element {
  return (
    <Box sx={errorBoxStyle}>
      <Grid container direction="row" alignItems="flex-start" spacing={1}>
        <Grid item>
          <ErrorIcon color="error" />
        </Grid>
        <Grid item>
          <Typography>{error}</Typography>
        </Grid>
      </Grid>
    </Box>
  );
}
