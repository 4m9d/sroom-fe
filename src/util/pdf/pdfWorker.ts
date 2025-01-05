import { pdf } from '@react-pdf/renderer';
import { expose } from 'comlink';
import { createElement } from 'react';
import MaterialPDFDocument from '../../components/classroom/pdf/MaterialPDFDocument';

const generatePDF = async (materials: CourseMaterialWorkbook) => {
  const blob = await pdf(
    createElement(MaterialPDFDocument as any, { materials }) as any
  ).toBlob();
  return URL.createObjectURL(blob);
};

expose(generatePDF);

export type GeneratePDF = (material: CourseMaterialWorkbook) => Promise<string>;
