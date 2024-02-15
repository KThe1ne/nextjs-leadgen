const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');


export const leadGenPDF = async ({ username, magnetIdeas }) => {
    return new Promise ((resolve, reject) => {
        const doc = new PDFDocument({ size: 'A4', font: "/fonts/Montserrat-Regular.otf" });
        const outputPath = `./public/temp/${username}.pdf`
        const writeStream = fs.createWriteStream(outputPath);

        // Error handling for writeStream
        writeStream.on('error', reject);
            // Handle file writing errors

        writeStream.on('finish', () => {
            console.log('PDF successfully created and saved.');
            return resolve(outputPath);
            // Perform actions after successfully saving the file, if necessary
        });

        // Register fonts
        try {
            doc.registerFont('Bold', './public/fonts/Montserrat-Bold.otf');
            doc.registerFont('Regular', './public/fonts/Montserrat-Regular.otf');
            doc.registerFont('Medium', './public/fonts/Montserrat-Medium.otf');
        } catch (error) {
            console.error('Error registering fonts:', error);
            // Handle font registration errors or fallback to default
        }

        doc.pipe(writeStream);
        doc.fontSize(16).fillColor('#102F54');
        
        // Cover Page
        try {
            doc.image("./public/cover-page.png", 0, 0, { cover: [doc.page.width, doc.page.height] });
        } catch (error) {
            console.error('Error loading cover page image:', error);
            // Handle image loading errors or provide an alternative
        }

        // First Page
        doc.addPage();

        Object.keys(magnetIdeas).forEach((magnetType, idx) => {
            doc.font('Bold')
                .fillColor('#102F54')
                .text(`${magnetType} Lead Magnets`.toUpperCase())
                .moveDown(1);

            doc.font('Medium')
                .fontSize(12)
                .list(magnetIdeas[magnetType], {
                    listType: 'numbered',
                    width: 450,
                    paragraphGap: 12,
                    textIndent: 32,
                    bulletIndent: 32, 
                });

            if (idx !== Object.keys(magnetIdeas).length - 1) {
                doc.addPage();
            }
        });

        

        doc.end();
    })
};