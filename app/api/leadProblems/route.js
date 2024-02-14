const { NextRequest, NextResponse } = require("next/server");
import { findProblems } from "../../../utils.js";


export const runtime = 'edge'; // 'nodejs' is the default
export const dynamic = 'force-dynamic'; // static by default, unless reading the request

export async function POST(req) {

	console.log("Audience Problems Generating")

	const businessDetails = await req?.json();
	const leadProblems = await findProblems(businessDetails)

	console.log("Audience Problems Generated")

	return NextResponse.json(leadProblems);
}
