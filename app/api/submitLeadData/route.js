const { NextRequest, NextResponse } = require("next/server");

export async function POST(req) {
	const leadData = await req?.json();
	let res = {}
    console.log(leadData)

    await fetch("https://rest.gohighlevel.com/v1/contacts/", {
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
    })

    return NextResponse.json(res);
}
