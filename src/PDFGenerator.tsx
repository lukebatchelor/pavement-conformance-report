import React, { useEffect, useState } from 'react';
import { Button, makeStyles } from '@material-ui/core';
// import * as pdfjsLib from 'pdfjs-dist/webpack';
import * as pdfjs from 'pdfjs';
import * as courierFont from 'pdfjs/font/Courier';
import { Header } from './headers';

const useStyles = makeStyles((theme) => ({}));

type PDFGeneratorProps = {
  reportStr: string;
  header?: Header;
  customHeader?: File;
};
export function PDFGenerator(props: PDFGeneratorProps) {
  const classes = useStyles();
  const { reportStr, header, customHeader } = props;

  const [signatureFont, setSignatureFont] = useState<pdfjs.Font>(null);

  useEffect(() => {
    fetch('./fonts/Sacramento-Regular.ttf')
      .then((res) => res.arrayBuffer())
      .then((buffer) => new pdfjs.Font(buffer))
      .then((font) => setSignatureFont(font))
      .then(() => console.log('Loaded font'));
  }, []);

  const onDownloadClick = async () => {
    const headerFileName = header.replace(/ /g, '_');
    let pdfHeader = (header === 'Custom' && customHeader) || (await fetch(`./headers/${headerFileName}.pdf`));
    const pdfBuffer = await pdfHeader.arrayBuffer();
    const headerPdf = new pdfjs.ExternalDocument(pdfBuffer);
    const reportPdf = new pdfjs.Document({ font: courierFont, padding: 25 * pdfjs.mm, fontSize: 8 });
    reportPdf.setTemplate(headerPdf);
    reportPdf.header().cell('', { minHeight: 80 });
    const content = reportPdf.cell();
    const lines = reportStr.split('\n');
    lines.forEach((line, idx) => {
      if (line.startsWith('Signed:')) {
        const name = lines[idx + 2].trim();
        content.text().add('Signed: ').add(`${name}            `, { underline: true, font: signatureFont });
        return;
      }
      content.text().add(line + '\r\n');
    });
    reportPdf.asBuffer().then((outBuffer) => {
      var file = new Blob([outBuffer], { type: 'application/pdf' });
      var fileURL = URL.createObjectURL(file);
      window.open(fileURL);
    });
  };

  return (
    <Button variant="contained" color="primary" disabled={!reportStr} onClick={onDownloadClick}>
      Download report pdf
    </Button>
  );
}
