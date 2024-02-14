const { NextRequest, NextResponse } = require("next/server");
import { leadGenPDF } from "./createPDF.js";

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
