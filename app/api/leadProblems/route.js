const { NextRequest, NextResponse } = require("next/server");
import { findProblems }  from "../utils.js";


// export const runtime = 'edge';

export async function POST(req) {
    const businessDetails = await req?.json()
    console.log(businessDetails)
    const leadProblems = await findProblems(businessDetails) 
    // const leadProblems = "Test"
    console.log(`Lead Problems: ${leadProblems}`)
    return NextResponse.json(leadProblems)
}