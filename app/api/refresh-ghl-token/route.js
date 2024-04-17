const { NextRequest, NextResponse } = require("next/server");
import axios from 'axios';



const refreshToken = async (req) => {
    const requestData = await req?.json()


    const encodedParams = new URLSearchParams();
    encodedParams.set('client_id', process.env.GHL_CLIENT_ID);
    encodedParams.set('client_secret', process.env.GHL_CLIENT_SECRET);
    encodedParams.set('grant_type', 'authorization_code');
    encodedParams.set('refresh_token', process.env.GHL_REFRESH_TOKEN);
    encodedParams.set('user_type', 'Location');
    // encodedParams.set('redirect_uri', '');

    const options = {
        method: 'POST',
        url: 'https://services.leadconnectorhq.com/oauth/token',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            Accept: 'application/json'
        },
        data: encodedParams,
    };

    try {
    const { data } = await axios.request(options);
        console.log(data);
    } catch (error) {
        console.error(error);
    }
}