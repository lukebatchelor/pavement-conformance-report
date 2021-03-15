import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core';
// import * as pdfjsLib from 'pdfjs-dist/webpack';
import * as pdfjs from 'pdfjs';
import * as courierFont from 'pdfjs/font/Courier';

const useStyles = makeStyles((theme) => ({}));

type PDFReaderProps = {
  reportStr: string;
};
export function PDFReader(props: PDFReaderProps) {
  const classes = useStyles();
  const { reportStr } = props;

  useEffect(() => {
    fetch('./debug.pdf')
      .then((res) => res.arrayBuffer())
      .then((buffer) => {
        const headerPdf = new pdfjs.ExternalDocument(buffer);
        const reportPdf = new pdfjs.Document({ font: courierFont, padding: 25 * pdfjs.mm, fontSize: 8 });
        reportPdf.setTemplate(headerPdf);
        reportPdf.header().cell('', { minHeight: 80 });
        const content = reportPdf.cell();
        reportStr.split('\n').forEach((line) => {
          content.text().add(line + '\r\n');
        });
        reportPdf.asBuffer().then((outBuffer) => {
          var file = new Blob([outBuffer], { type: 'application/pdf' });
          var fileURL = URL.createObjectURL(file);
          window.open(fileURL);
        });
      });
  }, []);

  return <div>PDFReader</div>;
}
