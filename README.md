# d12 report to pdf generator

Small webapp for converting d12 reports to pdf's with a header attached.

[https://pavement-conformance-report.netlify.app/](https://pavement-conformance-report.netlify.app/)

## Adding new default headers

Add the name of the new template to `src/headers.ts`.

Add the header as a pdf file to `public/headers/` named the same as the name added to the headers file with spaces replaced with underscores (i.e `Asbuilt_Pavement_Conformance_Report`).
