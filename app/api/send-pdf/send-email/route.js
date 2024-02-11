const { NextRequest, NextResponse } = require("next/server");
import axios from 'axios';

export async function POST(req) {
    
    console.log("Send Email")
    const requestData = await req?.json();
    let fileUrl;
    let data;
    
    const userId = requestData["userId"]
    const username = requestData["username"]
    const userEmail = requestData["userEmail"]
    
    let message = ""
    const subject = `Here's your file`
    const emailFrom = "kamoi@mg.diemmo.com"

    const getFile_options = {
        method: 'GET',
        url: 'https://services.leadconnectorhq.com/medias/files',
        params: {sortBy: 'createdAt', sortOrder: 'asc', type: 'pdf', query: `${username}`},
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
            // contactId: userId,
            attachments: [],
            emailFrom: emailFrom,
            html: message,
            subject: subject,
            emailTo: userEmail,
            emailReplyMode: 'reply'
        }
    };

    try {
        axios.request(getFile_options)
            .then(({ data }) => {
                fileUrl = data["files"][0]["url"]
                message = `<a href="${fileUrl}">PDF with 40 Lead Magnet Ideas</a>`
                sendEmail_options["data"]["html"] = message
            })
            .then(() => {
                axios.request(sendEmail_options)
                    .then(({ data }) => {
                        console.log(data);
                    })
            })
            .catch((err) => {
                return NextResponse.json(err)
            })
        
    } catch (error) {
        // console.error(error);
    }

    return NextResponse.json(data);
}