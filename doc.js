const fs = require('fs');
const { PDFDocument } = require('pdf-lib');

function base64ToPdf(base64Code, outputPath) {
    // Decodificar el código Base64 en un búfer
    const pdfBuffer = Buffer.from(base64Code, 'base64');

    // Crear un nuevo documento PDF
    const pdfDoc = await PDFDocument.load(pdfBuffer);

    // Escribir el documento en un archivo en el sistema de archivos
    const pdfBytes = await pdfDoc.save();

    fs.writeFileSync(outputPath, pdfBytes);

    // Abrir el archivo PDF en el navegador
    const open = require('open');
    open(outputPath);
}

// Ejemplo de uso
const base64Code = 'TU_CÓDIGO_BASE64_AQUÍ';
const outputPath = 'output.pdf';

base64ToPdf(base64Code, outputPath);
