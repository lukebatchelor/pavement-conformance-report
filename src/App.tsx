import React, { useEffect, useState } from 'react';
import {
  makeStyles,
  Avatar,
  Container,
  CssBaseline,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Box,
} from '@material-ui/core';
import { Dropzone } from './Dropzone';
import { PDFReader } from './PDFReader';

const useStyles = makeStyles((theme) => ({
  avatar: {
    background: theme.palette.success.main,
  },
}));

type AppProps = {
  children?: React.ReactNode;
};
export function App(props: AppProps) {
  const classes = useStyles();
  const [reportStr, setReportStr] = useState<string>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.has('debug')) {
      fetch('./debug.rpt')
        .then((res) => res.text())
        .then(setReportStr);
    }
  }, []);

  const onFileDrop = (fileStr: string) => {
    setReportStr(fileStr);
  };

  return (
    <>
      {!reportStr && (
        <Container>
          <CssBaseline />
          <AppBar position="fixed">
            <Toolbar>
              <IconButton color="inherit" aria-label="Home" edge="start">
                <Avatar src="/android-chrome-192x192.png" alt="LB" className={classes.avatar} />
              </IconButton>
              <Typography variant="h5">Pavement Performance Report Formatter</Typography>
            </Toolbar>
          </AppBar>
          <Box mt={10} />
          <Dropzone onDrop={onFileDrop} />
        </Container>
      )}
      {reportStr && (
        <>
          <PDFReader reportStr={reportStr} />
          <pre id="content">{reportStr}</pre>
        </>
      )}
    </>
  );
}
