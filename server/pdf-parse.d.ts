// types/pdf-parse.d.ts
declare module 'pdf-parse' {
  interface PDFInfo {
    numpages: number;
    numrender: number;
    info: any;
    metadata: any;
    text: string;
    version: string;
  }

  function pdfParse(dataBuffer: Buffer): Promise<PDFInfo>;

  export = pdfParse;
}
