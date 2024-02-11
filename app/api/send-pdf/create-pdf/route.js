const { NextRequest, NextResponse } = require("next/server");
import { leadGenPDF } from "./createPDF.js";

export async function POST(req) {

    console.log("Create PDF")
    // console.log(req.json())
    const requestData = await req?.json();
    let pdfPath
    try {
        pdfPath = await leadGenPDF(requestData);
        // console.log(pdfPath)
    } catch (err) {
        // console.log(err)
        // console.error(err)
        return NextResponse.json({status: 400})
    }



    return NextResponse.json({"pdfPath": pdfPath}); 
}