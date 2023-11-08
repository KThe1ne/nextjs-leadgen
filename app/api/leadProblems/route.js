const { NextRequest, NextResponse } = require("next/server");
import { findProblems }  from "../utils.js";


// export const runtime = 'edge';

export async function POST(req) {
    const businessDetails = await req?.text()
    console.log(businessDetails)
    const leadProblems = await findProblems(businessDetails) 
    console.log(`Lead Problems: ${leadProblems}`)
    return NextResponse.json(leadProblems)
}