// const { NextRequest, NextResponse } = require("next/server");
// import { findProblems } from "../../../utils.js";
// import { generateLeadMagnetIdeas } from "../../../utils.js";
// import { leadGenPDF } from "./../send-pdf/create-pdf/createPDF.js";
// // import { processBusinessDetails } from "./processBusinessDetails";



// /* export async function POST(req) {

// 	console.log("Business Details Processing")

// 	const leadDetails = await req?.json();
// 	const result = await processBusinessDetails(leadDetails)

// 	console.log("Business Details Processed")

// 	return NextResponse.json(result);
// } */

// export const runtime = 'edge'; // or 'nodejs' which uses Serverless Functions
// export const dynamic = 'force-dynamic'; // always run dynamically
 
// export async function POST(req) {
//     // This encoder will stream your text
//     console.log("Business Details Processing")

//     const details = await req?.json();
//     // console.log(details)
//     const businessDetails = details["userInput"]
//     const formattedLeadName = details["leadDetails"]["name"].replace(/\s/g, "_").toLowerCase();
//     console.log(businessDetails)
//     console.log(formattedLeadName)

//     /* const leadProblemsResponse = await fetch("/api/leadProblems", {
//         method: "POST",
//         body: JSON.stringify(businessDetails),
//     }) */
//     const leadProblems = await findProblems(businessDetails)
//     console.log("Audience Problems Generated ", leadProblems)

//     const leadMagnetIdeas = await generateLeadMagnetIdeas(leadProblems)
//     console.log("Magnet Ideas Generated ", leadMagnetIdeas)

//     /* const pdfPath = await leadGenPDF({
//         username: formattedLeadName,
//         magnetIdeas: leadMagnetIdeas,
//     });
//     console.log(pdfPath) */
//     const createPdfResponse = await fetch(`${process.env.ROOT_URL}/api/send-pdf/create-pdf`, {
//         method: "POST",
//         body: JSON.stringify({
//             username: formattedLeadName,
//             magnetIdeas: leadMagnetIdeas,
//         }),
//     });
//     const pdfPath = await createPdfResponse.json()
//     console.log(pdfPath)


//     /* if (!leadProblemsResponse.ok) {
//         throw new Error("Failed to generate lead problems");
//     } */

//    /*  const leadProblems = await leadProblemsResponse.json()
//     console.log(leadProblems) */

//     const customReadable = new ReadableStream({
//         start(controller) {
//             controller.enqueue(JSON.stringify(leadProblems));
//             controller.enqueue(JSON.stringify(leadMagnetIdeas));
//             // Prevent anything else being added to the stream
//             controller.close();
//         },
//     });
    
//     return new Response(customReadable);
// }