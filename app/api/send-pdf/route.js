/* 
    1. Pass dcoument data to server
    2. Run createDoc.js and create PDF
    3. Upload PDF to GHL
    4. Add custom value to user with the filename
    5. Add user to workflow
    6. Send email with link to pdf

*/
const { NextRequest, NextResponse } = require("next/server");
import { leadGenPDF } from "./createDoc.js";

/* export async function POST(req) {
	const leadMagnetIdeas = await req?.json();
    const pdfPath = await leadGenPDF(leadMagnetIdeas);

    await fetch("", {

    })
    
	
	return;
} */

export async function POST(req){
    const url = 'https://services.leadconnectorhq.com/contacts/';
    const options = {
    method: 'POST',
    headers: {
        Authorization: `Bearer ${process.env.GHL_AUTH_CODE}`,
        Version: '2021-07-28',
        'Content-Type': 'application/json',
        Accept: 'application/json',
    },
    body: JSON.stringify(req?.json())
    };

    try {
        const response = await fetch(url, options);
        const data = await response.json();
        console.log(data);
    } catch (error) {
        console.error(error);
    }

    return NextResponse.json(data)
    
}


/* 
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
*/