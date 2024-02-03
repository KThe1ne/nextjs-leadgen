const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

const details = 
{
    "software": [
        "Bathroom renovation cost calculator tool to estimate expenses based on design and materials",
        "Interactive bathroom design planner to visualize different layout and fixture options",
        "Project timeline and budget tracking spreadsheet to keep track of expenses and progress",
        "Virtual reality tour of different bathroom designs and layouts for inspiration",
        "Online directory of reputable suppliers for materials and fixtures",
        "Interactive checklist for evaluating contractor qualifications and services offered",
        "3D bathroom layout visualization tool to help homeowners plan their ideal renovation",
        "Budget-friendly fixture and material comparison tool to find the best deals",
        "Interactive quiz to help homeowners identify their design style preferences",
        "Customizable renovation planning dashboard to organize ideas, quotes, and schedules"
    ],
    "information": [
        "Comprehensive guide to hiring a trustworthy and skilled contractor",
        "Live webinar on navigating the renovation process and avoiding common pitfalls",
        "Ebook on designing a functional and stylish bathroom within budget",
        "DIY renovation hacks and tips for homeowners on a tight budget",
        "Presentation on understanding different types of bathroom fixtures and their pros and cons",
        "Step-by-step video course on planning and executing a successful bathroom renovation",
        "Infographic on the top design trends and materials for modern bathrooms",
        "Free consultation with a professional designer to discuss renovation ideas and options",
        "Expert panel discussion on overcoming renovation challenges and setbacks",
        "Interactive workshop on creating a realistic budget for a bathroom renovation"
    ],
    "services": [
        "Free in-home consultation to assess the current bathroom and discuss renovation options",
        "Sample renovation plan and design proposal customized to the homeowner's preferences",
        "Virtual reality tour of completed bathroom renovation projects for inspiration",
        "Complimentary material and fixture sourcing service to find the best deals",
        "Trial project management service to oversee a small renovation project from start to finish",
        "Free contractor matchmaking service to connect homeowners with reputable professionals",
        "Limited-time discount offer on renovation services for early inquiries",
        "Free virtual consultation with a renovation expert to address specific concerns and questions",
        "Trial access to a project tracking and communication platform for seamless renovation coordination",
        "Complimentary project timeline and budget assessment to identify potential cost savings"
    ],
    "physical products": [
        "Customized bathroom renovation planning guide and checklist",
        "Free sample box of tile and fixture options for the renovation",
        "Post-renovation care package with maintenance tips and recommended products",
        "Informative brochure on the most durable and stylish materials for bathroom renovations",
        "Limited edition design inspiration booklet featuring completed renovation projects",
        "Complimentary renovation planning workbook for homeowners to organize their ideas",
        "Exclusive discount voucher for materials and fixtures from partner suppliers",
        "Free blueprint of a functional bathroom layout for reference",
        "Trial pack of eco-friendly and cost-effective renovation materials",
        "Informative poster on common renovation challenges and how to address them"
    ]
}


const leadGenPDF = (details) => {
    return new Promise ((resolve, reject) => {
        const doc = new PDFDocument({ size: 'A4' });
        const outputPath = path.join(__dirname, 'public', 'temp', 'output.pdf');
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

        Object.keys(details).forEach((magnetType, idx) => {
            doc.font('Bold')
                .fillColor('#102F54')
                .text(`${magnetType} Lead Magnets`.toUpperCase())
                .moveDown(1);

            doc.font('Medium')
                .fontSize(12)
                .list(details[magnetType], {
                    listType: 'numbered',
                    width: 450,
                    paragraphGap: 12,
                    textIndent: 32,
                    bulletIndent: 32, 
                });

            if (idx !== Object.keys(details).length - 1) {
                doc.addPage();
            }
        });

        

        doc.end();
    })
};


leadGenPDF(details)