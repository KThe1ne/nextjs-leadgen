const { NextRequest, NextResponse } = require("next/server");
import { generateLeadMagnetIdeas } from "../../../utils.js";

export const runtime = 'edge'; // 'nodejs' is the default
export const dynamic = 'force-dynamic'; // static by default, unless reading the request

export async function POST(req) {
	const businessDetails = await req?.json();
	const leadMagnetIdeas = await generateLeadMagnetIdeas(businessDetails)
	return NextResponse.json({ leadMagnetIdeas });
}
