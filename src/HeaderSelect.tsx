import React, { useEffect, useState } from 'react';
import { FormControl, InputLabel, makeStyles, MenuItem, Select, Box } from '@material-ui/core';
import { useDropzone } from 'react-dropzone';
import { Header, headers } from './headers';

const useStyles = makeStyles((theme) => ({
  formControl: {
    minWidth: theme.spacing(20),
  },
  hidden: {
    display: 'none',
  },
}));

type HeaderSelectProps = {
  onHeaderSelected: (header: Header) => void;
  onCustomHeaderSelected: (customHeader: File) => void;
};
export function HeaderSelect(props: HeaderSelectProps) {
  const classes = useStyles();
  const { onHeaderSelected, onCustomHeaderSelected } = props;

  const [selectedHeader, setSelectedHeader] = useState<Header>(headers[0]);
  const [customHeader, setCustomHeader] = useState<File>(null);

  const onDropCallback = (acceptedFiles: Array<File>) => {
    // if no file selected, fall back to default header
    if (!acceptedFiles.length) {
      setSelectedHeader(headers[0]);
      return;
    }
    const customHeader = acceptedFiles[0];
    setCustomHeader(customHeader);
    onCustomHeaderSelected(customHeader);
    setLastHeader({ customHeader });
  };
  const { getRootProps, getInputProps, open } = useDropzone({ onDrop: onDropCallback });

  useEffect(() => {
    const lastHeaderFromStorage = getLastHeader();
    if (lastHeaderFromStorage.lastHeader) setSelectedHeader(lastHeaderFromStorage.lastHeader);
    if (lastHeaderFromStorage.customHeader) setCustomHeader(lastHeaderFromStorage.customHeader);
  }, []);

  const handleChange = (e: React.ChangeEvent<{ value: Header }>) => {
    const selectedHeader = e.target.value;
    setSelectedHeader(selectedHeader);
    onHeaderSelected(selectedHeader);
    setLastHeader({ lastHeader: selectedHeader });
    if (selectedHeader === 'Custom') {
      // open the file selection dialog
      open();
    } else {
      if (!!customHeader) {
        setCustomHeader(null);
        clearCustomHeader();
      }
    }
  };

  return (
    <Box>
      <FormControl className={classes.formControl}>
        <InputLabel id="report-header-label">Report Header</InputLabel>
        <Select labelId="report-header-label" id="report-header" value={selectedHeader} onChange={handleChange}>
          {headers.map((header, idx) => (
            <MenuItem value={header} key={idx}>
              {header}
              {header === 'Custom' && !!customHeader ? `: ${customHeader.name}` : ''}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Box {...getRootProps()} className={classes.hidden}>
        <input {...getInputProps()} />
      </Box>
    </Box>
  );
}

type LastHeader = {
  lastHeader: Header | undefined;
  customHeader: File;
};

function getLastHeader(): LastHeader {
  const lastHeader = localStorage.getItem('lastHeader') as Header;
  const customHeaderName = localStorage.getItem('customHeaderName');
  const customHeaderBlob = localStorage.getItem('customHeaderBlob');

  const customHeader = customHeaderBlob && new File([customHeaderBlob], customHeaderName, { type: 'application/pdf' });
  console.log('Fetched custom header from localstorage: ', { customHeader });
  return {
    lastHeader,
    customHeader,
  };
}

async function setLastHeader(lastHeader: Partial<LastHeader>) {
  console.log('Setting custom header to localstorage', { lastHeader });
  if (lastHeader.customHeader) {
    const customHeaderName = lastHeader.customHeader.name;
    const customHeaderBlob = await lastHeader.customHeader.text();
    localStorage.setItem('customHeaderName', customHeaderName);
    localStorage.setItem('customHeaderBlob', customHeaderBlob);
  }

  if (lastHeader.lastHeader) {
    localStorage.setItem('lastHeader', lastHeader.lastHeader);
  }
}

function clearCustomHeader() {
  localStorage.removeItem('customHeaderName');
  localStorage.removeItem('customHeaderBlob');
}
