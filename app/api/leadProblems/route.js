const { NextRequest, NextResponse } = require("next/server");
import { findProblems } from "../../../utils.js";

export async function POST(req) {
	const businessDetails = await req?.json();
	const leadProblems = await findProblems(businessDetails)
	return NextResponse.json(leadProblems);
}
