const { NextRequest, NextResponse } = require("next/server");
import { generateLeadMagnetIdeas }  from "../utils.js";

import dotenv from 'dotenv';


dotenv.config();

// export const runtime = 'edge';



export async function POST(req) {
    const businessDetails = await req?.json()
    console.log(`Details: ${businessDetails}`)
    // const leadMagnetIdeas = "TEST!"    
    const leadMagnetIdeas = await generateLeadMagnetIdeas(businessDetails)    
    console.log(`Ideas: ${leadMagnetIdeas}`)
    return NextResponse.json({leadMagnetIdeas})
}