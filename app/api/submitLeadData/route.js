const { NextRequest, NextResponse } = require("next/server");

export async function POST(req) {
	const leadData = await req?.json();
	let data = {}
    console.log(leadData)

    /* await fetch("https://rest.gohighlevel.com/v1/contacts/", {
        method: "POST",
        body: JSON.stringify(leadData),
        headers: {
            Authorization: `Bearer ${process.env.GHL_API_KEY}`,
            'content-type': 'application/json'
            },
    })
    .then((res) => {
        console.log(res)
        if (res.ok){
            console.log("Trigger Facebook Lead")
            // fbq('track', 'Lead');
        }
        return res.json()
    })
    .then((response) => {
        res = response
    }) */
    console.log(`Bearer ${process.env.GHL_AUTH_CODE}`)
    const url = 'https://services.leadconnectorhq.com/contacts/upsert';
    const options = {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${process.env.GHL_AUTH_CODE}`,
            Version: '2021-07-28',
            'Content-Type': 'application/json',
            Accept: 'application/json'
        },
        body: JSON.stringify(leadData),
    };

    try {
        const response = await fetch(url, options);
        data = await response.json();
        // Trigger Facebook Lead
        console.log(data);
    } catch (error) {
        console.error(error);
    }

    return NextResponse.json(data);
}
