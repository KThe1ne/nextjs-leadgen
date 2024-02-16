const { NextRequest, NextResponse } = require("next/server");

export async function POST(req) {

    const requestData = await req?.json();
    console.log(requestData)
    let pdfPath;

    try {

        pdfPath = await leadGenPDF(requestData);
        return NextResponse.json({ pdfPath });

    } catch (error) {

        console.error("Error creating PDF:", error);
        return NextResponse.json({ error: 'PDF creation failed' }, { status: 400 });

    }
}