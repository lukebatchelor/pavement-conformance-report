import React, { useCallback, useState } from 'react';
import { Box, makeStyles, Paper, Typography } from '@material-ui/core';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import { useDropzone } from 'react-dropzone';

const useStyles = makeStyles((theme) => ({
  paper: {
    textAlign: 'center',
    minHeight: '40vh',
    minWidth: '50vw',
    paddingTop: theme.spacing(2),
    marginBottom: theme.spacing(4),
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
}));

type DropzoneProps = {
  /** Text displayed when nothing is being dragged */
  dropTargetText?: string;
  /** Text displayed when something is being dragged */
  draggingTargetText?: string;
  /** callback when a file is dropped */
  onDrop?: (fileStr: string) => void;
};
export function Dropzone(props: DropzoneProps) {
  const classes = useStyles();
  const { dropTargetText, draggingTargetText, onDrop } = props;

  const [rptFileName, setRptFileName] = useState<String>(null);

  const onDropCallback = useCallback(async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    const text = await file.text();
    onDrop && onDrop(text);
    setRptFileName(file.name);
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop: onDropCallback });

  return (
    <Paper {...getRootProps()} className={classes.paper}>
      <Box display="flex" alignItems="center" justifyContent="center" flexDirection="column" justifyItems="center">
        <input {...getInputProps()} />
        {isDragActive ? (
          <Typography variant="h5">{draggingTargetText || 'Drop the files here ...'}</Typography>
        ) : (
          <>
            <Typography variant="h5">
              {rptFileName || dropTargetText || "Drag 'n' drop report file here, or click to select file"}
            </Typography>
            <AttachFileIcon fontSize="large" style={{ marginTop: '40px' }} />
          </>
        )}
      </Box>
    </Paper>
  );
}
