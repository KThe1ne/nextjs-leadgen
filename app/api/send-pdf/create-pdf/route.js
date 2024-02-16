const { NextRequest, NextResponse } = require("next/server");
// import { leadGenPDF } from "./createPDF.js";
import { jsPDF } from "jspdf";

const leadGenPDF = async ({ username, magnetIdeas }) => {
    return new Promise (async (resolve, reject) => {
        const doc = new jsPDF("p", "px", "a4");
        doc.addFont()
        const width = doc.internal.pageSize.getWidth()
        const height = doc.internal.pageSize.getHeight()
        const imgData = fs.readFileSync("./public/cover-page.png");
        const imgAsBase64 = Buffer.from(imgData).toString('base64');
        
        // const doc = new PDFDocument({ size: 'A4', font: "https://leadgen.diemmo.com/fonts/Montserrat-Regular.otf" });

        doc.addImage(imgAsBase64, 0, 0, width, height)
        doc.addPage()


        doc.save(`${username}.pdf`)
        return resolve("Success")
    })
};

export async function POST(req) {

    console.log("Create PDF");

    const requestData = await req?.json();
    let pdfPath;

    try {

        pdfPath = await leadGenPDF(requestData);
        return NextResponse.json({ pdfPath });

    } catch (error) {

        console.error("Error creating PDF:", error);
        return NextResponse.json({ error: 'PDF creation failed' }, { status: 400 });

    }
}
