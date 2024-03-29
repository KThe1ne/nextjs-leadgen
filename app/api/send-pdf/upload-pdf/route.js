/* 
    1. Pass dcoument data to server
    2. Run createDoc.js and create PDF
    3. Upload PDF to GHL
    4. Add custom value to user with the filename
    5. Add user to workflow
    6. Send email with link to pdf

*/
const { NextRequest, NextResponse } = require("next/server");
import fs from 'fs';
import FormData from "form-data";
import axios from 'axios';
import { constants } from 'buffer';

let reqText

export async function POST(req) {
    console.log("Uploading PDF");
    /* try {
        requestData = await req?.json();
        console.log("requestData ",requestData)
    } catch (error) {
        console.log("requestData ", error)
    } */
    try {
        reqText = await req.text()
        console.log("reqText ", reqText)
        reqText = JSON.parse(reqText)
        console.log("reqText ", reqText)
    } catch (error) {
        console.log("reqText ", error)
    }
    

    const pdfBlob = reqText["pdfBlob"]
    console.log(pdfBlob)
    const fileName = reqText["fileName"]
    console.log(fileName)

    const url = 'https://services.leadconnectorhq.com/medias/upload-file';
    const form = new FormData();

    form.append('file', Buffer.from(pdfBlob), {
        filename: 'myfile.pdf', // Provide a filename
        contentType: 'application/pdf', // Set the appropriate content type
    });
    form.append('hosted', 'false');
    form.append('name', `${fileName}.pdf`);
    // form.append('name', `test.pdf`);


    const options = {
        headers: {
            Authorization: `Bearer ${process.env.GHL_AUTH_CODE}`,
            Accept: 'application/json',
            'Content-Type': 'multipart/form-data',
            Version: '2021-07-28',
        }
    };

    try {
        console.log("Making Request")
        const response = await axios.post(url, form, options);
        console.log("Upload successful:", response.data);
        // fs.unlink(pdfPath, (err) => {
        //     if (err) {
        //         console.error("Error deleting file:", err);
        //     } else {
        //         console.log("File deleted successfully");
        //     }
        // });
        return NextResponse.json(response.data);
    } catch (error) {
        console.error("Error uploading PDF:", error);
        if (error.response) {
            console.error("Response data:", error.response.data);
        }
        return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
    }

    
    

    
    
}


