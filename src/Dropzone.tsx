import React, { useCallback, useState } from 'react';
import { Box, makeStyles, Paper, Typography } from '@material-ui/core';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import { useDropzone } from 'react-dropzone';

const useStyles = makeStyles((theme) => ({
  paper: {
    textAlign: 'center',
    minHeight: '50vh',
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

  const onDropCallback = useCallback(async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    const text = await file.text();
    onDrop && onDrop(text);
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
              {dropTargetText || "Drag 'n' drop some files here, or click to select files"}
            </Typography>
            <AttachFileIcon fontSize="large" style={{ marginTop: '40px' }} />
          </>
        )}
      </Box>
    </Paper>
  );
}
