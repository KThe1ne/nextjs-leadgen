const { NextRequest, NextResponse } = require("next/server");
import leadGenIdeas  from "@/utils.mjs";

export async function POST(req) {
    const businessDetails = await req?.text()
    console.log(businessDetails)
    // const res = await leadGenIdeas(businessDetails) 
    const res = `Software Lead Magnets:
    1. A spreadsheet that compares features of the home to similar homes in the local area.
    2. A comparison tool that shows what other homes in the local area have sold for.
    3. A virtual home staging app that allows users to view their home with different furniture and decorations.
    4. An app that provides detailed legal requirements for a real estate listing.
    5. A calculator that estimates the cost of repairs that may be necessary prior to listing.
    6. A tool that provides estimated quotes and reviews of local moving companies.
    7. A software platform that helps users negotiate the best deal for their home sale.
    
    Information Lead Magnets:
    1. A presentation on home staging techniques that maximize a home’s value.
    2. A guide on how to hire a reliable handyman for small renovations.
    3. A webinar on how to select the right photographer for attractive home photos.
    4. An infographic outlining the most common questions asked by potential buyers.
    5. A course on how to write a compelling description for a real estate listing.
    6. A cheat sheet of warm colors and decor for creating a cozy atmosphere.
    7. A PDF of legal requirements for real estate listings.
    8. An e-book with hacks for negotiating the best deal for a home sale.
    
    Services Lead Magnets:
    1. A free home appraisal.
    2. A free deep cleaning service for the home.
    3. A free consultation with a professional photographer.
    4. A free consultation with an experienced home stager.
    5. A free consultation with a local handyman.
    6. A free consultation with a local real estate agent on negotiation strategies.
    7. A free consultation with a local moving company.
    
    Physical Products Lead Magnets:
    1. A brochure outlining all of the services the real estate agency offers.
    2. A poster with a checklist of features to consider when listing a home.
    3. A sample portfolio of photographs from a professional photographer.
    4. A home staging kit with various decorations and furniture.
    5. A sample of paint colors to create a warm atmosphere in a home.
    6. A posture assessment chart for homeowners to use when assessing their own home.` 
    return NextResponse.json({res})
}