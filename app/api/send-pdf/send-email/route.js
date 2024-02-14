const { NextRequest, NextResponse } = require("next/server");
import axios from 'axios';


export async function POST(req) {
    console.log("Sending Email")
    try {
        console.log("Send Email");
        const requestData = await req?.json();

        const userId = requestData["userId"];
        const username = requestData["username"];
        const userEmail = requestData["userEmail"];

        const getFile_options = {
            method: 'GET',
            url: 'https://services.leadconnectorhq.com/medias/files',
            params: { sortBy: 'createdAt', sortOrder: 'dsc', type: 'pdf', query: `${username}` },
            headers: {
                Authorization: `Bearer ${process.env.GHL_AUTH_CODE}`,
                Accept: 'application/json',
                Version: '2021-07-28',
            }
        };
        const sendEmail_options = {
            method: 'POST',
            url: 'https://services.leadconnectorhq.com/conversations/messages',
            headers: {
                Authorization: `Bearer ${process.env.GHL_AUTH_CODE}`,
                Version: '2021-04-15',
                'Content-Type': 'application/json',
                Accept: 'application/json'
            },
            data: {
                type: 'Email',
                contactId: userId,
                attachments: [],
                emailFrom: "kamoi@mg.diemmo.com",
                html: "",
                subject: `Here's your file`,
                emailTo: userEmail,
                emailReplyMode: 'reply'
            }
        };

        const { data: getFileData } = await axios.request(getFile_options);
        const fileUrl = getFileData?.files?.[0]?.url;
        if (!fileUrl) {
            throw new Error("File URL not found");
        }
        const message = `<a href="${fileUrl}">PDF with 40 Lead Magnet Ideas</a>`;
        sendEmail_options.data.html = message;

        const { data: sendEmailData } = await axios.request(sendEmail_options);
        console.log(sendEmailData);

        return NextResponse.json(sendEmailData);
    } catch (error) {
        console.error("Error in POST endpoint:", error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}