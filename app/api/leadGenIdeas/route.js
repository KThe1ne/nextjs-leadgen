const { NextRequest, NextResponse } = require("next/server");
import { generateLeadMagnetIdeas } from "../../../utils.js";

export async function POST(req) {
	const businessDetails = await req?.json();
	const leadMagnetIdeas = await generateLeadMagnetIdeas(businessDetails)
	return NextResponse.json({ leadMagnetIdeas });
}
