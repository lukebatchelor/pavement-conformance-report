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
import PictureAsPdfIcon from '@material-ui/icons/PictureAsPdf';
import { Dropzone } from './Dropzone';
import { PDFGenerator } from './PDFGenerator';
import { HeaderSelect } from './HeaderSelect';
import { headers, Header } from './headers';

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
  const [header, setHeader] = useState<Header>(headers[0]);
  const [customHeader, setCustomHeader] = useState<File>(null);

  const onHeaderSelected = (selectedHeader: Header) => {
    setHeader(selectedHeader);
  };

  const onCustomHeaderSelected = (newCustomHeader: File) => {
    setCustomHeader(newCustomHeader);
  };

  const onFileDrop = (fileStr: string) => {
    setReportStr(fileStr);
  };

  return (
    <>
      <Container maxWidth="md">
        <CssBaseline />
        <AppBar position="fixed">
          <Toolbar>
            <IconButton color="inherit" aria-label="Home" edge="start">
              <Avatar className={classes.avatar}>
                <PictureAsPdfIcon />
              </Avatar>
            </IconButton>
            <Typography variant="h5">12d report to pdf generator</Typography>
          </Toolbar>
        </AppBar>
        <Box mt={12} />
        <Box display="flex" flexDirection="column" alignItems="center">
          <Typography variant="body1" gutterBottom={true}>
            Just a small webapp for converting d12 reports (<code>.rpt</code> files) to pdf whilst adding a header to
            the top of each page.
          </Typography>
          <Typography variant="body1">
            A custom header template can be used but they must be a <code>.pdf</code> file that is no larger than{' '}
            <code>175px</code> high)
          </Typography>
        </Box>
        <Box mt={8} />
        <Box display="flex" justifyContent="center">
          <HeaderSelect onCustomHeaderSelected={onCustomHeaderSelected} onHeaderSelected={onHeaderSelected} />
        </Box>
        <Box mt={10} />
        <Box display="flex" justifyContent="center">
          <Dropzone onDrop={onFileDrop} />
        </Box>
        <Box mt={10} />
        <Box display="flex" justifyContent="center">
          <PDFGenerator reportStr={reportStr} header={header} customHeader={customHeader} />
        </Box>
      </Container>
    </>
  );
}
