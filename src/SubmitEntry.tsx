import { Alert, Button, Stack, Typography } from '@mui/material';

export function SubmitEntry() {
  const feedbackAlertText =
    "This site is still in testing. If you've saved your entry - by signing in - you will be emailed when we are ready to accept entries.";
  return (
    <Stack spacing={1} paddingBottom={2}>
      <Alert
        severity="info"
        action={
          <Button
            color="inherit"
            size="small"
            href="mailto:andrew.travell@btinternet.com"
          >
            Provide Feedback
          </Button>
        }
      >
        {feedbackAlertText}
      </Alert>
      <Button variant="contained" disabled>
        Submit Entry
      </Button>
      <Typography align="center">
        <em>You can amend your entry up to the closing date.</em>
      </Typography>
    </Stack>
  );
}
